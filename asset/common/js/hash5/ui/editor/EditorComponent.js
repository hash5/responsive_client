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


/**
 * @return {goog.events.EventHandler}
 */
hash5.ui.editor.EditorComponent.prototype.getHandler = function()
{
    return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
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
 * @return {boolean}
 */
hash5.ui.editor.EditorComponent.prototype.hasHelperTile = function()
{
    return this.hasHelperTile_;
};