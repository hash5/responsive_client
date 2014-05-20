goog.provide('hash5.ui.editor.History');

goog.require('hash5.templates.ui.EntryEditor');

/**
 * control provides undo/redo operations
 *
 * @param {hash5.ui.editor.EntryEditor} editor
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.editor.History = function(editor)
{
    goog.base(this);

    /**
     * @type {hash5.ui.editor.EntryEditor}
     * @private
     */
    this.editor_ = editor;

    /**
     * @type {Array.<string>}
     * @private
     */
    this.history_ = [];

    /**
     * @type {Array.<string>}
     * @private
     */
    this.redoHistory_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ignoreChangeEvent_ = false;
};
goog.inherits(hash5.ui.editor.History, goog.ui.Component);


/** @inheritDoc */
hash5.ui.editor.History.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.ui.EntryEditor.history);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.editor.History.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var eh = this.getHandler();

    var undoBtn = this.getElementByClass('undo-btn');
    eh.listen(undoBtn, goog.events.EventType.CLICK, this.handleUndoBtnClick_);

    var redoBtn = this.getElementByClass('redo-btn');
    eh.listen(redoBtn, goog.events.EventType.CLICK, this.handleRedoBtnClick_);

    eh.listen(this.editor_, hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE, this.handleTextChange_);

    this.history_.push(this.editor_.getEntryText());
};

hash5.ui.editor.History.prototype.enableBtns = function()
{
    goog.dom.classes.enable(this.getElementByClass('undo-btn'), 'hidden', this.history_.length < 2);
    goog.dom.classes.enable(this.getElementByClass('redo-btn'), 'hidden', this.redoHistory_.length < 1);
};


/**
 * handles text change
 *
 * @param  {goog.events.Event} e
 */
hash5.ui.editor.History.prototype.handleTextChange_ = function(e)
{
    if(this.ignoreChangeEvent_) {
        this.ignoreChangeEvent_ = false;
    } else {
        this.redoHistory_ = [];
    }

    this.history_.push(this.editor_.getEntryText());
    this.enableBtns();
};


/**
 * handles undo button click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.History.prototype.handleUndoBtnClick_ = function(e)
{
    var curEntryText = this.editor_.getEntryText();
    var prevText = this.history_.pop();

    this.redoHistory_.push(curEntryText);

    this.ignoreChangeEvent_ = true;
    this.editor_.setEntryText(this.history_.pop());
};


/**
 * handles redo button click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.History.prototype.handleRedoBtnClick_ = function(e)
{
    this.history_.push(this.editor_.getEntryText());

    this.ignoreChangeEvent_ = true;
    this.editor_.setEntryText(this.redoHistory_.pop());
};