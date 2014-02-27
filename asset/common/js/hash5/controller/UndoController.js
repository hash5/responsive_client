goog.provide('hash5.controller.UndoController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.layout.HeaderButtonGroup');
goog.require('hash5.ds.EntryStore');

/**
 * this controller tracks delete operations and provides undo
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.UndoController = function()
{
    goog.base(this);

    /**
     * @type {Array.<hash5.model.Entry>}
     * @private
     */
    this.deletedModels_ = [];


    /** @desc header btn for undo menu */
    var MSG_UNDO = goog.getMsg('Undo');

    /**
     * @type {hash5.layout.HeaderButtonGroup}
     * @private
     */
    this.headerBtnGroup_ = new hash5.layout.HeaderButtonGroup(MSG_UNDO, 'icon-undo');
    hash5.api.layout.addHeaderButtonGroup(this.headerBtnGroup_);
};
goog.inherits(hash5.controller.UndoController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.UndoController);

/**
 * @param  {Object} config
 */
hash5.controller.UndoController.prototype.initialize = function(config)
{
    var entryStore = hash5.ds.EntryStore.getInstance();

    this.getHandler().listen(entryStore, hash5.model.EventType.DESTROY, this.handleDeleteOperation_);

    this.checkVisibility_();
};


/**
 * handles DESTROY event of a model
 *
 * @param  {goog.events.Event} e
 */
hash5.controller.UndoController.prototype.handleDeleteOperation_ = function(e)
{
    var model = /** @type {hash5.model.Entry} */ (e.target);
    var prevText = model.getText().substr(0, 15);
    var undoButton = new hash5.layout.HeaderButton(prevText, 'icon-undo1');
    undoButton.setModel(model);
    this.headerBtnGroup_.addButton(undoButton);

    this.getHandler().listen(undoButton, goog.ui.Component.EventType.ACTION, this.handleUndoAction_);

    // check if there are to much buttons
    if(this.headerBtnGroup_.getChildCount() > 10)
    {
        this.headerBtnGroup_.removeChildAt(0);
    }

    this.checkVisibility_();
};

/**
 * checks if there are buttons in the button group
 * if not, the undo button is hidden
 */
hash5.controller.UndoController.prototype.checkVisibility_ = function()
{
    var hasUndo = this.headerBtnGroup_.getChildCount();
    goog.dom.classes.enable(this.headerBtnGroup_.getElement(), 'hidden', !hasUndo);
};


/**
 * handles undo click on headerButton element
 *
 * @param  {goog.events.Event} e
 */
hash5.controller.UndoController.prototype.handleUndoAction_ = function(e)
{
    var button = /** @type {hash5.layout.HeaderButton} */ (e.target);
    var model = /** @type {hash5.model.Entry} */ (button.getModel());

    model.save();

    this.headerBtnGroup_.removeChild(button, true);
    button.dispose();

    this.checkVisibility_();
};