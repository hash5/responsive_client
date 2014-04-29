goog.provide('hash5.ui.editor.EditorComponent');

goog.require('hash5.ui.editor.EventType');

/**
 * Abstract Component to extend EntryEditor
 *
 * @param {hash5.model.Entry} model
 * @param {hash5.ui.editor.EntryEditor} editor
 *
 * @constructor
 * @extends {goog.Disposable}
 */
hash5.ui.editor.EditorComponent = function(model, editor)
{
    /**
     * @type {hash5.model.Entry}
     * @protected
     */
    this.model_ = model;

    /**
     * @type {hash5.ui.editor.EntryEditor}
     * @protected
     */
    this.entryEditor_ = editor;

    /**
     * @type {string}
     * @protected
     */
    this.icon_ = '';

    /**
     * @type {string}
     * @protected
     */
    this.title_ = '';

    /**
     * @type {boolean}
     * @protected
     */
    this.hasHelperTile_ = true;

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = null;

    /**
     * @type {Array.<hash5.ui.editor.HelperTile>}
     * @protected
     */
    this.tiles_ = [];

    /**
     * cached entry text to provide updates of multiple
     * tags during one circle
     * @type {string|undefined}
     * @private
     */
    this.cachedEntryText_ = undefined;
};
goog.inherits(hash5.ui.editor.EditorComponent, goog.Disposable);


/**
 * @return {goog.events.EventHandler}
 */
hash5.ui.editor.EditorComponent.prototype.getHandler = function()
{
    return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
};

/** @inheritDoc */
hash5.ui.editor.EditorComponent.prototype.disposeInternal = function()
{
    if(this.handler_) {
        this.handler_.dispose();
    }

    goog.base(this, 'disposeInternal');
};


hash5.ui.editor.EditorComponent.prototype.init = function(){};

/**
 * @return {hash5.ui.editor.EntryEditor}
 */
hash5.ui.editor.EditorComponent.prototype.getEditor = function()
{
    return this.entryEditor_;
};

/**
 * @return {string}
 */
hash5.ui.editor.EditorComponent.prototype.getIcon = function()
{
    return this.icon_;
};


/**
 * @return {string}
 */
hash5.ui.editor.EditorComponent.prototype.getTitle = function()
{
    return this.title_;
};


/**
 * returns true if component has helper tiles
 * this.hasHelperTile_ should be overritten with false from subclasses if they do not provide
 * helper tiles
 *
 * @return {boolean}
 */
hash5.ui.editor.EditorComponent.prototype.hasHelperTile = function()
{
    return this.hasHelperTile_;
};

/**
 * adds and renders helper tile
 *
 * @param {hash5.ui.editor.HelperTile} tile
 */
hash5.ui.editor.EditorComponent.prototype.addHelperTile = function(tile)
{
    this.entryEditor_.addHelperTile(this, tile);
};

/**
 * registers new helper tile in component structure
 * (will be called by helper tile)
 *
 * @param {hash5.ui.editor.HelperTile} tile
 */
hash5.ui.editor.EditorComponent.prototype.registerHelperTile = function(tile)
{
    this.tiles_.push(tile);

    this.getHandler()
        .listen(tile, hash5.ui.editor.EventType.CHANGED_TAG, this.handleChangedTag_)
        .listen(tile, hash5.ui.editor.EventType.CHANGED_TAG_UPDATE, this.handleChangedTagUpdate_);
};

/**
 * removes and unrenders helper tile
 *
 * @param {hash5.ui.editor.HelperTile} tile
 */
hash5.ui.editor.EditorComponent.prototype.removeHelperTile = function(tile)
{
    this.entryEditor_.removeChild(tile, true);
    goog.array.remove(this.tiles_, tile);
};


/**
 * removes and unrenders all helper tiles
 */
hash5.ui.editor.EditorComponent.prototype.removeAllHelperTiles = function()
{
    goog.array.forEach(this.tiles_, function(tile){
        this.entryEditor_.removeChild(tile, true);
        tile.dispose();
    }, this);

    this.tiles_ = [];
};


/**
 * @return {hash5.ui.editor.HelperTile}
 */
hash5.ui.editor.EditorComponent.prototype.getNewHelperTile = goog.abstractMethod;



/**
 * handles changed tag event (mostly dispatched by helper tile)
 *
 * @param  {hash5.ui.editor.ChangedTagEvent} e
 */
hash5.ui.editor.EditorComponent.prototype.handleChangedTag_ = function(e)
{
    var entryText = '',
        offset = 0; // offset of indices when e.queued (because no reparsing happen)

    if(goog.DEBUG) {
        goog.asserts.assert(this.cachedEntryText_ ? e.queued : true,
            'CHANGED_TAG_UPDATE was not called for previous changes');
    }

    if(e.queued) {
        var orgText = this.getEditor().getEntryText();
        this.cachedEntryText_ = this.cachedEntryText_ || orgText;
        entryText = this.cachedEntryText_;

        offset = entryText.length - orgText.length;
    } else {
        entryText = this.getEditor().getEntryText();
    }

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
        startPos = Math.max(startPos + offset, 0);
        endPos = endPos + offset;
        return str.substring(0, startPos) + replace + str.substring(endPos);
    };

    if(e.removeTag) { // remove tag
        var startIndex = e.indices[0];
        if(e.tagName) {
            startIndex -= e.tagName.length + 2;
        }
        entryText = posReplace(entryText, '', startIndex, e.indices[1]);

    } else { // insert or update tag
        var newString = goog.isString(e.value) ? e.value : e.value.toString();
        var parsedIndices = e.indices,
            indices = parsedIndices || [entryText.length, entryText.length];

        // insert quotes if needed
        if(newString.indexOf(" ") > -1) {
            newString = '"' + newString  + '"';
        }

        // insert key on new tags
        if(!parsedIndices && newString.length > 0) {
            if(!!e.tagName) {
                newString = ' #' + e.tagName + ':' + newString;
            } else {
                newString = ' ' + newString;
            }
        }

        entryText = posReplace(entryText, newString, indices[0], indices[1]);
    }

    if(e.queued) {
        // no update before CHANGED_TAG_UPDATE is dispatched
        this.cachedEntryText_ = entryText;
    } else {
        // update text in entryEditor if changed
        if(entryText != this.getEditor().getEntryText()) {
            this.getEditor().setEntryText(entryText);
        }
    }
};

/**
 * handles changed tag update - sets cached entry text to editor
 * @param  {goog.events.Event} e
 */
hash5.ui.editor.EditorComponent.prototype.handleChangedTagUpdate_ = function(e)
{
    var orgText = this.getEditor().getEntryText();

    if(this.cachedEntryText_ != orgText) {
        this.getEditor().setEntryText(this.cachedEntryText_ || orgText);
    }

    this.cachedEntryText_ = undefined;
};