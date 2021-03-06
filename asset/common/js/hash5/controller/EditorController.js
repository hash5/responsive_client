goog.provide('hash5.controller.EditorController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.ui.editor.EntryEditor');

/**
 * Controller for EntryEditor. Manages Components and creates
 * new editors.
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.EditorController = function()
{
    goog.base(this);

    /**
     * registered EditorComponent constructors
     *
     * @type {Array.<Function>}
     * @private
     */
    this.components_ = [];

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
};

/**
 * registers EditorComponent. A new instance will be linked to created EntryEditors.
 * The constructor should derive from {@see hash5.ui.editor.EditorComponent}.
 *
 * @param {Function} comp constructor to create component
 */
hash5.controller.EditorController.prototype.registerComponent = function(comp)
{
    this.components_.push(comp);
};


/**
 * creates new entryEditor and renders it to the mainPanel
 *
 * @param  {hash5.model.Entry} entry entry to edit. if entry is null, a new one will be created
 * @return {hash5.ui.editor.EntryEditor}
 */
hash5.controller.EditorController.prototype.createEntryEditor = function(entry)
{
    if (this.entryEditor_ && !this.entryEditor_.isDisposed()) {
        // check if entry is already in editor
        if (this.entryEditor_.getEntry() === entry) {
            return null;
        }

        var curEditorText = this.entryEditor_.getEntryText();

        this.entryEditor_.dispose();
        this.entryEditor_ = null;

        if (!entry && !curEditorText) {
            // if currently no entrytext is insered and a new entry
            // should be added, the editor will be closed
            return null;
        }
    }

    if (!entry) {
        entry = new hash5.model.Entry();
    }

    var editor = new hash5.ui.editor.EntryEditor(entry);
    editor.render(document.body);

    // add components
    goog.array.forEach(this.components_, function(comp){
        editor.addComponent(new comp(entry, editor));
    }, this);

    this.entryEditor_ = editor;

    return editor;
};