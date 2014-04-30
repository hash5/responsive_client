goog.provide('hash5.ui.editor.AutoSaver');

goog.require('hash5.templates.ui.EntryEditor');

// TODO problem: when entry is saved all lists are updated...

/**
 * control saves automatically entry on text changes
 *
 * @param {hash5.ui.editor.EntryEditor} editor
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.editor.AutoSaver = function(editor)
{
    goog.base(this);

    /**
     * @type {hash5.ui.editor.EntryEditor}
     * @private
     */
    this.editor_ = editor;

    /**
     * @type {boolean}
     * @private
     */
    this.unsavedChanges_ = false;

    /**
     * @type {Array.<string>}
     * @private
     */
    this.history_ = [];
};
goog.inherits(hash5.ui.editor.AutoSaver, goog.ui.Component);


/** @inheritDoc */
hash5.ui.editor.AutoSaver.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.ui.EntryEditor.saveBtns);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.editor.AutoSaver.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var eh = this.getHandler();

    var saveBtn = this.getElementByClass('save-btn');
    eh.listen(saveBtn, goog.events.EventType.CLICK, this.handleSaveBtnClick_);

    var cancelBtn = this.getElementByClass('cancel-btn');
    eh.listen(cancelBtn, goog.events.EventType.CLICK, this.handleRevertBtnClick_);

    eh.listen(this.editor_, hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE, this.saveChanges);

    this.history_.push(this.editor_.getEntryText());
};

/**
 * saves current text in editor
 */
hash5.ui.editor.AutoSaver.prototype.saveChanges = function()
{
    var entry = this.editor_.getEntry(),
        entryText = this.editor_.getEntryText();

    this.unsavedChanges_ = true;

    entry.setText(this.editor_.getEntryText());
    entry.save(this.handleSaved_, this);

    this.history_.push(entryText);

    goog.dom.classes.add(this.getElementByClass('saved-info'), 'saving');
};


/**
 */
hash5.ui.editor.AutoSaver.prototype.handleSaved_ = function()
{
    this.unsavedChanges_ = false; // TODO could be wrong...

    if(!this.isDisposed()) {
        goog.dom.classes.remove(this.getElementByClass('saved-info'), 'saving');
    }
};

/**
 * handles save button click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.AutoSaver.prototype.handleSaveBtnClick_ = function(e)
{
    var entryText = this.editor_.getEntryText(),
        entry = this.editor_.getEntry();

    if(entryText.length > 0) {
      if(this.unsavedChanges_) {
        this.saveChanges();
      }

      this.editor_.close();
    } else {
        entry.destroy();
    }
};


/**
 * handles rever button click
 * sets old
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.AutoSaver.prototype.handleRevertBtnClick_ = function(e)
{
    var firstVersion = this.history_[0],
        entry = this.editor_.getEntry();

    // check if changes there saved
    if(this.history_.length > 1) {
        if(firstVersion.length > 0) {
            entry.setText(firstVersion);
            entry.save();
        } else {
            // remove entry if entry had no text
            entry.destroy();
        }
    }

    this.editor_.close();
};