goog.provide('hash5.ui.EntryListContainer');

goog.require('goog.ui.Component');

goog.require('hash5.ui.EntryList');
goog.require('hash5.ui.QuickCreateEntry');

/**
 * @param {hash5.model.EntryCollection} entryCollection
 * @param {string=} title
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.EntryListContainer = function(entryCollection, title)
{
    goog.base(this);

    /**
     * @type {hash5.ui.EntryList}
     * @private
     */
    this.entryList_ = new hash5.ui.EntryList(entryCollection);


    /**
     * @type {hash5.ui.QuickCreateEntry}
     * @private
     */
    this.quickCreateEntry_ = new hash5.ui.QuickCreateEntry(entryCollection.getSearchPattern());

    /**
     * @type {string}
     * @private
     */
    this.title_ = title || entryCollection.getSearchPattern();
};
goog.inherits(hash5.ui.EntryListContainer, goog.ui.Component);

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.createDom = function()
{
    var dom = this.getDomHelper(),
        el = dom.createDom('div', 'entry-list-container', [
            dom.createDom('div', 'entry-list-actions', [
                dom.createDom('div', 'action-close')
            ]),
            dom.createDom('h3', undefined, this.title_)
        ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.addChild(this.quickCreateEntry_, true);
    this.addChild(this.entryList_, true);
};

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler().listen(this.getElementByClass('action-close'), goog.events.EventType.CLICK, this.handleCloseClick_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.EntryListContainer.prototype.handleCloseClick_ = function(e)
{
    this.getParent().removeChild(this);
    this.dispose();
};
