goog.provide('hash5.ui.CreateEntry');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('goog.events.KeyCodes');


/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.CreateEntry = function()
{
    goog.base(this);

    /**
     * @type {Element}
     * @private
     */
    this.textEl_ = null;
};
goog.inherits(hash5.ui.CreateEntry, goog.ui.Component);


/** @inheritDoc */
hash5.ui.CreateEntry.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.textEl_ = this.getElementByClass('entry-text');
};

/** @inheritDoc */
hash5.ui.CreateEntry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler().listen(this.getElementByClass('save-entry-btn'), goog.events.EventType.CLICK, this.handleSaveBtnClicked_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.CreateEntry.prototype.handleSaveBtnClicked_ = function(e)
{
    var entry = new hash5.model.Entry();
    entry.setText(this.textEl_.value);

    var ds = new hash5.ds.DataSource();
    ds.save(entry);
};

/**
 * @param  {Array.<hash5.model.Entry>} entries
 */
hash5.ui.CreateEntry.prototype.handleSuggestsLoaded_ = function(entries)
{
    console.log(entries);
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'create-entry',
    function() {
      return new hash5.ui.CreateEntry();
    }
);
