goog.provide('hash5.ui.QuickCreateEntry');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Textbox');

/**
 * @param {string=} textTemplate optional template used to add to the entry
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.QuickCreateEntry = function(textTemplate)
{
    goog.base(this);

    /**
     * @type {hash5.forms.Textbox}
     * @private
     */
    this.textbox_ = new hash5.forms.Textbox();
    this.textbox_.setPlaceholder(goog.getMsg('Eintrag hinzufügen ...'));

    /**
     * @type {string}
     * @private
     */
    this.textTemplate_ = textTemplate || '';
};
goog.inherits(hash5.ui.QuickCreateEntry, goog.ui.Component);

/** @inheritDoc */
hash5.ui.QuickCreateEntry.prototype.createDom = function()
{
    var dom = this.getDomHelper(),
        el = dom.createDom('div', 'quick-create-entry', [
            dom.createDom('div', 'actions')
        ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.QuickCreateEntry.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.addChild(this.textbox_, true);
};

/** @inheritDoc */
hash5.ui.QuickCreateEntry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.textbox_, goog.events.EventType.SUBMIT, this.handleSaveEntry_)
        .listen(this.textbox_, goog.events.EventType.FOCUS, this.handleFocus_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.QuickCreateEntry.prototype.handleFocus_ = function(e)
{
    var entryText = this.textbox_.getValue();
    if(!entryText)
    {
        this.textbox_.setValue(this.textTemplate_ + ' ');
    }
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.QuickCreateEntry.prototype.handleSaveEntry_ = function(e)
{
    var entryText = /** @type {string} */ (this.textbox_.getValue());

    if(entryText)
    {
      var entry = new hash5.model.Entry();
      entry.setText(entryText);

      var ds = hash5.ds.DataSource.getInstance();
      ds.save(entry);

      this.textbox_.reset();
    }
};