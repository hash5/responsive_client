goog.provide('hash5.ui.EntryEditor');

goog.require('goog.ui.Component');
goog.require('goog.events.KeyCodes');


/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.EntryEditor = function()
{
    goog.base(this);

    /**
     * @type {Element}
     * @private
     */
    this.textEl_ = null;
};
goog.inherits(hash5.ui.EntryEditor, goog.ui.Component);

/** @inheritDoc */
hash5.ui.EntryEditor.prototype.createDom = function()
{
    var dom = this.getDomHelper(),
        actions = dom.createDom('div', 'entry-actions', [
            dom.createDom('button', 'btn save-btn', 'Speichern')
        ]),
        info = dom.createDom('div', 'entry-info', [
            dom.createDom('span', 'entry-date')
        ]),
        body = dom.createDom('div', 'entry-editor-body'),
        el = dom.createDom('div', 'entry-editor', [
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

};

/** @inheritDoc */
hash5.ui.EntryEditor.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.textEl_ = this.getElementByClass('entry-text');

    var saveBtn = this.getElementByClass('save-entry-btn');
    this.getHandler().listen(saveBtn, goog.events.EventType.CLICK, this.handleSaveBtnClicked_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.EntryEditor.prototype.handleSaveBtnClicked_ = function(e)
{
    var entryText = this.textEl_.value;

    if(entryText.length > 0)
    {
      var entry = new hash5.model.Entry();
      entry.setText(entryText);

      var ds = hash5.ds.DataSource.getInstance();
      ds.save(entry);

      this.textEl_.value = '';
    }
};