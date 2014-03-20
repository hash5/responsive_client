goog.provide('hash5.ui.editor.EditorComponent');


/**
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
    if(this.handler_)
    {
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