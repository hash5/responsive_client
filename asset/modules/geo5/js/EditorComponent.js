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


    this.icon_ = '/client/asset/common/img/sprite/calender.png';
    /** @desc name for the geo5 plugin */
    var MSG_geo5_PLUGIN = goog.getMsg('geo5');
    this.title_ = MSG_geo5_PLUGIN;


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

    console.log(hash5.module.geo5.Geo5Parser);
    var parsedLocations = editor.getParser().getSubparsed(hash5.module.geo5.Geo5Parser);

    console.log(parsedLocations);
};