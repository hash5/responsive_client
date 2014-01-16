goog.provide('hash5.ui.EntryEditor');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Textarea');


/**
 * @param {hash5.model.Entry} entry
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.EntryEditor = function(entry)
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
};
goog.inherits(hash5.ui.EntryEditor, goog.ui.Component);

/** @inheritDoc */
hash5.ui.EntryEditor.prototype.createDom = function()
{
    var dom = this.getDomHelper(),
        actions = dom.createDom('div', 'entry-actions', [
            dom.createDom('button', 'btn primary save-btn', goog.getMsg('Speichern')),
            dom.createDom('button', 'btn cancle-btn', goog.getMsg('Abbrechen'))
        ]),
        info = dom.createDom('div', 'entry-info', [
            dom.createDom('span', 'entry-date', goog.date.relative.getDateString(this.entry_.getCreatedDate()))
        ]),
        body = dom.createDom('div', 'entry-editor-body'),
        el = dom.createDom('div', 'entry-editor', [
            dom.createDom('h2', undefined, goog.getMsg('Eintrag bearbeiten')),
            info,
            body,
            actions
        ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.EntryEditor.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.textEditor_.render(this.getElementByClass('entry-editor-body'));
    this.textEditor_.setValue(this.entry_.getText());
};

/** @inheritDoc */
hash5.ui.EntryEditor.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var saveBtn = this.getElementByClass('save-btn');
    this.getHandler().listen(saveBtn, goog.events.EventType.CLICK, this.handleSaveBtnClicked_);

    var cancleBtn = this.getElementByClass('cancle-btn');
    this.getHandler().listen(cancleBtn, goog.events.EventType.CLICK, this.close);
};

hash5.ui.EntryEditor.prototype.close = function()
{
    this.dispose();
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.EntryEditor.prototype.handleSaveBtnClicked_ = function(e)
{
    var entryText = this.textEditor_.getValue();

    if(entryText.length > 0)
    {
      this.entry_.setText(entryText);
      this.entry_.save();
    }
};