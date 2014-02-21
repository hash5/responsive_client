goog.provide('hash5.ui.editor.EditorComponent');


/**
 * @param {hash5.model.Entry} model
 * @param {hash5.ui.editor.EntryEditor} editor
 *
 * @constructor
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
 * @return {boolean}
 */
hash5.ui.editor.EditorComponent.prototype.hasHelperTile = function()
{
    return this.hasHelperTile_;
};


/**
 * @return {hash5.ui.editor.HelperTile}
 */
hash5.ui.editor.EditorComponent.prototype.getNewHelperTile = goog.abstractMethod;