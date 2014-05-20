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


    this.iconClass_ = 'icon-location';
    /** @desc name for the geo5 plugin */
    var MSG_geo5_PLUGIN = goog.getMsg('geo5');
    this.title_ = MSG_geo5_PLUGIN;

    /**
     * @type {Array.<hash5.module.geo5.LatLng>}
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
    var tile = new hash5.module.geo5.HelperTile();
    this.curParsedPositions_.push(tile.getPosition());
    return tile;
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.geo5.EditorComponent.prototype.handleTextChanged_ = function(e)
{
    this.checkForNewLocations();
};

/**
 * checks if there is a geo5 mention without helper tile
 */
hash5.module.geo5.EditorComponent.prototype.checkForNewLocations = function()
{
    var editor = this.getEditor();

    var parsedLocations = /** @type {Array.<hash5.module.geo5.LatLng>} */ (editor.getParser().getSubparsed(hash5.module.geo5.Geo5Parser));
    var positionsChanged = !goog.array.equals(this.curParsedPositions_, parsedLocations, function(ev1, ev2){
        return ev1.equals(ev2);
    });

    // only update ui if events changed
    if(positionsChanged) {
        this.curParsedPositions_ = parsedLocations;
        this.removeAllHelperTiles();

        for(var i = 0; i < parsedLocations.length; i++) {
            var tile = new hash5.module.geo5.HelperTile(parsedLocations[i]);
            this.addHelperTile(tile);;
        }
    } else {
        for(var i = 0; i < this.curParsedPositions_.length; i++) {
            this.curParsedPositions_[i].updateIndices(parsedLocations[i]);
        }
    }
};