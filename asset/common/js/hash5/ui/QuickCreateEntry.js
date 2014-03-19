goog.provide('hash5.ui.QuickCreateEntry');

goog.require('goog.ui.Component');
goog.require('goog.events.KeyCodes');

goog.require('hash5.forms.Textarea');


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
     * @type {hash5.forms.Textarea}
     * @private
     */
    this.textarea_ = new hash5.forms.Textarea('');
    /** @desc qucick edit placeholder */
    var MSG_ADD_ENTRY = goog.getMsg('Add Entry...');
    this.textarea_.setPlaceholder(MSG_ADD_ENTRY);

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
hash5.ui.QuickCreateEntry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.textarea_, goog.events.EventType.KEYDOWN, this.handleKeyDown_)
        .listen(this.textarea_, goog.events.EventType.FOCUS, this.handleFocus_);

    this.addChild(this.textarea_, true);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.QuickCreateEntry.prototype.handleFocus_ = function(e)
{
    var entryText = this.textarea_.getValue();
    if(!entryText && this.textTemplate_)
    {
        this.textarea_.setValue(this.textTemplate_ + ' ');
    }
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.QuickCreateEntry.prototype.handleKeyDown_ = function(e)
{
    if(e.keyCode === goog.events.KeyCodes.ENTER && !e.shiftKey)
    {
      this.saveEntryText();
      e.preventDefault();
    }else if(e.keyCode === goog.events.KeyCodes.ESC){
      this.setVisible(false);
    }
};

hash5.ui.QuickCreateEntry.prototype.saveEntryText = function()
{
    var entryText = /** @type {string} */ (this.textarea_.getValue());

    if(entryText)
    {
      var entry = new hash5.model.Entry();
      entry.setText(entryText);
      entry.save();

      this.textarea_.reset();
    }
};


/**
 * @param  {boolean} visible
 */
hash5.ui.QuickCreateEntry.prototype.setVisible = function(visible)
{
    if(visible)
    {
      this.textarea_.focus();
    }
    else
    {
      this.dispatchEvent(goog.ui.Component.EventType.CLOSE);
    }
};
