goog.provide('hash5.ui.editor.EntryEditor');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Textarea');

goog.require('hash5.ui.editor.AutoComplete');


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
     * @type {goog.ui.ac.AutoComplete}
     * @private
     */
    this.autoComplete_ = null;
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

    var entryTextInput = this.textEditor_.getElement();
    this.autoComplete_ = hash5.ui.editor.AutoComplete.attachAutoComplete(entryTextInput);

    var recEl = this.getElementByClass('recommondations');
    this.getHandler()
        .listen(this.textEditor_, goog.events.EventType.CHANGE, this.handleTextChanged_)
        .listen(recEl, goog.events.EventType.CLICK, this.handleRecommondationClick_);


    this.refreshRecommondations();

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
    this.autoComplete_.dispose();

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
    this.refreshRecommondations();
};

/**
 * reloads and renders recommondations for additional hastags
 */
hash5.ui.editor.EntryEditor.prototype.refreshRecommondations = function()
{
    var entryText = this.textEditor_.getValue();

    var rec = hash5.ds.Recommondations.getInstance();
    rec.recommend(entryText, function(recs){
        var recEl = this.getElementByClass('recommondations');
        recEl.innerHTML = recs.reduce(function(prev, suggest){
            return prev + ' <span class="suggest">' + suggest + '</span>';
        }, '');
    }, this);
};

/**
 * handles click on recommendet hashtag
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.EntryEditor.prototype.handleRecommondationClick_ = function(e)
{
    var clickedEl = /** @type {Element} */ (e.target);

    if(goog.dom.classes.has(clickedEl, 'suggest'))
    {
        var hashTag = clickedEl.innerHTML;
        var curText = this.textEditor_.getValue();
        this.textEditor_.setValue(curText + ' ' + hashTag);
    }
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
    }
};