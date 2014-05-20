goog.provide('hash5.module.geo5.EditorComponent');

goog.require('hash5.module.geo5.HelperTile');
goog.require('hash5.module.geo5.Geo5Parser');

/**
 * @param {hash5.model.Entry} model
 * @param {hash5.ui.editor.EntryEditor} editor
 *
 * @constructor
 * @extends {hash5.ui.editor.EditorComponent}
 */
hash5.module.geo5.EditorComponent = function(model, editor)
{
    goog.base(this, model, editor);


    this.iconClass_ = 'icon-geo';
    /** @desc name for the geo5 plugin */
    var MSG_geo5_PLUGIN = goog.getMsg('geo5');
    this.title_ = MSG_geo5_PLUGIN;

    /**
     * @type {Array.<hash5.module.calendar.Event>}
     * @private
     */
    this.curParsedPositions_ = [];
};
goog.inherits(hash5.module.geo5.EditorComponent, hash5.ui.editor.EditorComponent);


/** @inheritDoc */
hash5.module.geo5.EditorComponent.prototype.init = function()
{
    this.getHandler()
        .listen(this.getEditor(), hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE, this.handleTextChanged_);

    this.checkForNewLocations();
};


/** @inheritDoc */
hash5.module.geo5.EditorComponent.prototype.getNewHelperTile = function()
{
    return new hash5.module.geo5.HelperTile();
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.geo5.EditorComponent.prototype.handleTextChanged_ = function(e)
{
    if(!this.curTextChanging_)
    {
        this.checkForNewLocations();
    }
};

/**
 * checks if there is a geo5 mention without helper tile
 */
hash5.module.geo5.EditorComponent.prototype.checkForNewLocations = function()
{
    var editor = this.getEditor();

    var parsedLocations = editor.getParser().getSubparsed(hash5.module.geo5.Geo5Parser);


    var positionsChanged = !goog.array.equals(this.curParsedPositions_, parsedLocations, function(ev1, ev2){
        return ev1.equals(ev2);
    });

    // only update ui if events changed
    if(positionsChanged)
    {
        this.curParsedPositions_ = parsedLocations;
        this.removeAllHelperTiles();

        for(var i = 0; i < parsedLocations.length; i++)
        {
            var tile = new hash5.module.geo5.HelperTile(parsedLocations[i]);
            this.addHelperTile(tile);

            //this.getHandler().listen(tile, goog.ui.Component.EventType.CLOSE, this.handleTileRemoved_);
        }
    }

    console.log(parsedLocations);
};

hash5.module.geo5.EditorComponent.prototype.updateTextForPosition = function(pos){

   var entryText = this.getEditor().getEntryText();

 /**
     * replaces positions from startPos to endPos with new replace string
     *
     * @param {string} str
     * @param {string} replace
     * @param {number} startPos
     * @param {number} endPos
     * @return {string} new string
     */
    var posReplace = function(str, replace, startPos, endPos)
    {
        var res = str.substring(0, startPos) + replace + str.substring(endPos);
        return res;
    };

   if(pos.indices_)
   {
        //hackish  - add getter setter
        entryText = posReplace(entryText, pos.toString(), pos.indices_[0], pos.indices_[1]);

   }
   else
   {
        entryText += ' ' + pos.toString();
   }

    if(entryText != this.getEditor().getEntryText())
    {
        this.getEditor().setEntryText(entryText);
        return true;
    }

    return false;



};