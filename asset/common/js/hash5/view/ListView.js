goog.provide('hash5.view.ListView');

goog.require('hash5.view.BaseView');
goog.require('hash5.ui.EntryListContainer');

/**
 * @constructor
 * @extends {hash5.view.BaseView}
 */
hash5.view.ListView = function()
{
    goog.base(this);

};
goog.inherits(hash5.view.ListView, hash5.view.BaseView);

/** @inheritDoc */
hash5.view.ListView.prototype.createDom = function()
{
    var el = this.getDomHelper().createDom('div', 'view list-view');

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.view.ListView.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

};

/**
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 */
hash5.view.ListView.prototype.addEntryCollection = function(collection, title)
{
    var listUi = new hash5.ui.EntryListContainer(collection, title);
    this.addChild(listUi, true);
};
