goog.provide('hash5.module.files.EditorComponent');

goog.require('hash5.module.files.HelperTile');
goog.require('hash5.module.files.FileParser');

/**
 * @param {hash5.model.Entry} model
 * @param {hash5.ui.editor.EntryEditor} editor
 *
 * @constructor
 * @extends {hash5.ui.editor.EditorComponent}
 */
hash5.module.files.EditorComponent = function(model, editor)
{
    goog.base(this, model, editor);


    this.icon_ = '/client/asset/common/img/sprite/calender.png';
    /** @desc name for the files plugin */
    var MSG_FILES_PLUGIN = goog.getMsg('Files');
    this.title_ = MSG_FILES_PLUGIN;

    /**
     * @type {Array.<hash5.module.files.File>}
     * @private
     */
    this.curParsedfiles_ = [];
};
goog.inherits(hash5.module.files.EditorComponent, hash5.ui.editor.EditorComponent);


/** @inheritDoc */
hash5.module.files.EditorComponent.prototype.init = function()
{
    this.getHandler()
        .listen(this.getEditor(), hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE, this.handleTextChanged_);

    this.checkForFiles();
};


/** @inheritDoc */
hash5.module.files.EditorComponent.prototype.getNewHelperTile = function()
{
    var tile = new hash5.module.files.HelperTile();
    //this.curParsedfiles_.push(tile.getEvent());
    return tile;
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.files.EditorComponent.prototype.handleTextChanged_ = function(e)
{
    this.checkForFiles();
};


/**
 * checks if there is a files mention without helper tile
 */
hash5.module.files.EditorComponent.prototype.checkForFiles = function()
{
    var editor = this.getEditor();

    var parsedfiles = /** @type {Array.<hash5.module.files.File>} */ (editor.getParser().getSubparsed(hash5.module.files.FileParser));

    var filesChanged = !goog.array.equals(this.curParsedfiles_, parsedfiles, function(file1, file2){
        return file1 === file2; //file1.equals(file2); TODO
    });

    // only update ui if files changed
    if(filesChanged)
    {
        // TODO remove unused files.. ? or maybe ask user
        this.curParsedfiles_ = parsedfiles;
        this.removeAllHelperTiles();

        for(var i = 0; i < parsedfiles.length; i++)
        {
            var file = parsedfiles[i];

            var tile = new hash5.module.files.HelperTile(file);
            this.addHelperTile(tile);

            this.getHandler().listen(tile, goog.ui.Component.EventType.CLOSE, this.handleTileRemoved_);
        }
    }
    else
    {
        for(var i = 0; i < this.curParsedfiles_.length; i++)
        {
            this.curParsedfiles_[i].updateIndices(parsedfiles[i]);
        }
    }
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.files.EditorComponent.prototype.handleTileRemoved_ = function(e)
{
    var tile = /** @type {hash5.module.files.HelperTile} */ (e.target);
    console.warn("unimplemented");
    //tile.getEvent().removeAllTags();
};