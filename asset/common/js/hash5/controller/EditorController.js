goog.provide('hash5.controller.EditorController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.ui.editor.EntryEditor');

/**
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.EditorController = function()
{
    goog.base(this);

    /**
     * @type {Array.<Function>}
     * @private
     */
    this.components_ = [];

    /**
     * @type {Element}
     * @private
     */
    this.panelEl_ = null;

    /**
     * current active entryEditor
     *
     * @type {hash5.ui.editor.EntryEditor}
     * @private
     */
    this.entryEditor_ = null;
};
goog.inherits(hash5.controller.EditorController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.EditorController);

/**
 * @param {Object} config
 */
hash5.controller.EditorController.prototype.initialize = function(config)
{
    this.panelEl_ = goog.dom.getElementByClass('main-panel');
};

/**
 * @param {Function} comp
 */
hash5.controller.EditorController.prototype.registerComponent = function(comp)
{
    this.components_.push(comp);
};


/**
 * @param  {hash5.model.Entry} entry
 * @return {hash5.ui.editor.EntryEditor}
 */
hash5.controller.EditorController.prototype.createEntryEditor = function(entry)
{
    if(this.entryEditor_)
    {
        // TODO test if there are unsaved actions
        // or provide tab-view
        this.entryEditor_.dispose();
    }

    var editor = new hash5.ui.editor.EntryEditor(entry);
    editor.render(this.panelEl_);

    goog.array.forEach(this.components_, function(comp){
        editor.addComponent(new comp(entry, editor));
    }, this);

    this.entryEditor_ = editor;

    return editor;
};