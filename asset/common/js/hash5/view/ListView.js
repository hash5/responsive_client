goog.provide('hash5.view.ListView');

goog.require('hash5.view.BaseView');
goog.require('hash5.ui.EntryListContainer');
goog.require('hash5.storage.AppData');

/**
 * @constructor
 * @extends {hash5.view.BaseView}
 */
hash5.view.ListView = function()
{
    goog.base(this);


    this.restoreLists();
};
goog.inherits(hash5.view.ListView, hash5.view.BaseView);

/** @inheritDoc */
hash5.view.ListView.prototype.createDom = function()
{
    var el = this.getDomHelper().createDom('div', 'view list-view');

    this.decorateInternal(el);
};

/**
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 * @return {hash5.ui.EntryListContainer} returns rendered EntryListContainer
 */
hash5.view.ListView.prototype.addEntryCollection = function(collection, title)
{
    var listUi = new hash5.ui.EntryListContainer(collection, title);
    this.addChild(listUi, true);

    this.storeLists();
    this.setWidth_();

    return listUi;
};

/** @inheritDoc */
hash5.view.ListView.prototype.removeChild = function(child, opt_unrender)
{
    var removedChild = goog.base(this, 'removeChild', child, opt_unrender);

    this.storeLists();
    this.setWidth_();

    return removedChild;
};


hash5.view.ListView.prototype.setWidth_ = function()
{
    // TODO get dynamic width
    var childCount = this.getChildCount();
    goog.style.setWidth(this.getElement(), childCount * 300);
};


/**
 * @type {string}
 * @private
 */
hash5.view.ListView.prototype.storageKey_ = 'hash5-listview-opend';


/**
 * stores current opend lists to appStorage
 */
hash5.view.ListView.prototype.storeLists = function()
{
    var serializedLists = [];

    this.forEachChild(function(child){
        var childList = /** @type {hash5.ui.EntryListContainer} */ (child);
        var list = {
            'searchPattern': childList.getSearchPattern(),
            'title': childList.getTitle()
        };
        serializedLists.push(list);
    });


    var storage = hash5.storage.AppData.getInstance();
    storage.set(this.storageKey_, serializedLists);
};

/**
 * restores opend lists from appStorage
 */
hash5.view.ListView.prototype.restoreLists = function()
{
    var storage = hash5.storage.AppData.getInstance();
    var lastLists = storage.get(this.storageKey_);

    if(lastLists)
    {
        for(var i = 0; i < lastLists.length; i++)
        {
            var list = lastLists[i];
            var collection = hash5.api.getEntries(list['searchPattern']);
            this.addEntryCollection(collection, list['title']);
        }
    }
    else
    {
        var newestEntries = hash5.ds.DataSource.getInstance().newestEntries(); // TODO replace with api call
        var actualEntries = hash5.api.searchEntries('#start=today');
        /** @desc newest entry list heading */
        var MSG_NEWEST_HEADING = goog.getMsg('Neueste Einträge');
        this.addEntryCollection(newestEntries, MSG_NEWEST_HEADING);
        /** @desc day planing entry list heading */
        var MSG_DAY_HEADING = goog.getMsg('Tagesplanung');
        this.addEntryCollection(actualEntries, MSG_DAY_HEADING);
    }
};

