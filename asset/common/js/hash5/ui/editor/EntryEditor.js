goog.provide('hash5.ui.editor.EntryEditor');
goog.provide('hash5.ui.editor.EntryEditor.EventType');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Textarea');

// TODO check if entry is already loaded!

/**
 * @param {hash5.model.Entry} entry
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.editor.EntryEditor = function(entry)
{
    goog.base(this);

    /**
     * @type {hash5.model.Entry}
     * @private
     */
    this.entry_ = entry;

    /**
     * @type {hash5.forms.Textarea}
     * @private
     */
    this.textEditor_ = new hash5.forms.Textarea('');
    this.addChild(this.textEditor_);


    /**
     * @type {Array.<hash5.ui.editor.EditorComponent>}
     * @private
     */
    this.components_ = [];
};
goog.inherits(hash5.ui.editor.EntryEditor, goog.ui.Component);

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.createDom = function()
{
    /** @desc entry editor save btn title */
    var MSG_SAVE = goog.getMsg('Speichern');
    /** @desc entry editor cancle btn title */
    var MSG_CANCLE = goog.getMsg('Abbrechen');
    /** @desc entry editor edit title */
    var MSG_EDIT_HEADING = goog.getMsg('Eintrag bearbeiten');

    var dom = this.getDomHelper(),
        actions = dom.createDom('div', 'entry-actions', [
            dom.createDom('button', 'btn primary save-btn', MSG_SAVE),
            dom.createDom('button', 'btn cancle-btn', MSG_CANCLE)
        ]),
        info = dom.createDom('div', 'entry-info', [
            dom.createDom('span', 'entry-date', goog.date.relative.getDateString(this.entry_.getCreatedDate()))
        ]),
        body = dom.createDom('div', 'entry-editor-body'),
        recommondation = dom.createDom('div', 'recommondations'),
        el = dom.createDom('div', 'entry-editor', [
            dom.createDom('h2', undefined, MSG_EDIT_HEADING),
            info,
            body,
            recommondation,
            actions
        ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.textEditor_.render(this.getElementByClass('entry-editor-body'));
    this.textEditor_.setValue(this.entry_.getText());
};

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var saveBtn = this.getElementByClass('save-btn');
    this.getHandler().listen(saveBtn, goog.events.EventType.CLICK, this.handleSaveBtnClicked_);

    var cancleBtn = this.getElementByClass('cancle-btn');
    this.getHandler().listen(cancleBtn, goog.events.EventType.CLICK, this.close);

    goog.array.forEach(this.components_, function(comp){
        comp.init();
    }, this);

    // focus on text input
    this.textEditor_.getElement().focus();
};

/**
 * closes the editor (will dispose whole object + dom structure)
 */
hash5.ui.editor.EntryEditor.prototype.close = function()
{
    this.dispose();
};

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.disposeInternal = function()
{
    // TODO dispose module components

    goog.base(this, 'disposeInternal');
};

/**
 * handles entry text changed
 *
 * @param  {goog.events.Event} e
 */
hash5.ui.editor.EntryEditor.prototype.handleTextChanged_ = function(e)
{
    // TODO add time threshold

    this.dispatchEvent(hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE);
};


/**
 * handles save button click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.EntryEditor.prototype.handleSaveBtnClicked_ = function(e)
{
    var entryText = this.textEditor_.getValue();

    if(entryText.length > 0)
    {
      this.entry_.setText(entryText);
      this.entry_.save();

      this.close();
    }
};

/**
 * @return {hash5.forms.Textarea}
 */
hash5.ui.editor.EntryEditor.prototype.getTextarea = function()
{
    return this.textEditor_;
};


/**
 * @return {string} current entryText
 */
hash5.ui.editor.EntryEditor.prototype.getEntryText = function()
{
    return this.textEditor_.getValue();
};

/**
 * @param {string} entryText
 */
hash5.ui.editor.EntryEditor.prototype.setEntryText = function(entryText)
{
    this.textEditor_.setValue(entryText);
};


/**
 * @param {hash5.ui.editor.EditorComponent} comp
 */
hash5.ui.editor.EntryEditor.prototype.addComponent = function(comp)
{
    this.components_.push(comp);

    if(this.isInDocument())
    {
        comp.init();
    }
};


/**
 * @enum {string}
 */
hash5.ui.editor.EntryEditor.EventType ={
    TEXT_CHANGE: 'editor_text_change'
}