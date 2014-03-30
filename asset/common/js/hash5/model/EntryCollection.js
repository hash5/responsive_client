goog.provide('hash5.model.EntryCollection');

goog.require('goog.net.EventType');
goog.require('goog.events.EventHandler');

goog.require('hash5.model.Collection');

/**
 * @param {Array.<hash5.model.Entry>=} entries
 * @param {string=} searchPattern
 *
 * @constructor
 * @extends {hash5.model.Collection.<hash5.model.Entry>}
 */
hash5.model.EntryCollection = function(entries, searchPattern)
{
    goog.base(this);

    /**
     * searchPattern used to create EntryCollection
     *
     * @type {string}
     * @private
     */
    this.searchPattern_ = searchPattern || '';

    /**
     * specifies if currentliy request are made to load more entries
     *
     * @type {boolean}
     * @private
     */
    this.isLoadingEntries_ = false;

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = new goog.events.EventHandler(this);

    if(entries)
    {
        goog.array.forEach(entries, function(entry){
            this.insert(entry);
        }, this);
    }


    var entryStore = hash5.ds.EntryStore.getInstance();
    this.setParentEventTarget(entryStore);
    this.handler_.listen(entryStore,
        [hash5.model.Entry.EventType.TEXT_CHANGED, hash5.model.Entry.EventType.CREATED],
        this.handleEntryStoreChanged_);
};
goog.inherits(hash5.model.EntryCollection, hash5.model.Collection);


/** @inheritDoc */
hash5.model.EntryCollection.prototype.insert = function(item)
{
    goog.base(this, 'insert', item);
    this.handler_.listen(item, hash5.model.EventType.DESTROY, this.handleEntryDestroyed_);
};

/** @inheritDoc */
hash5.model.EntryCollection.prototype.insertAt = function(item, index)
{
    goog.base(this, 'insertAt', item, index);
    this.handler_.listen(item, hash5.model.EventType.DESTROY, this.handleEntryDestroyed_);
};

/**
 * @param  {goog.events.Event} e
 */
hash5.model.EntryCollection.prototype.handleEntryDestroyed_ = function(e)
{
    this.remove(/** @type {hash5.model.Entry} */ (e.target));
};

/**
 * returns searchPattern used to create EntryCollection
 *
 * @return {string}
 */
hash5.model.EntryCollection.prototype.getSearchPattern = function()
{
    return this.searchPattern_;
};

/**
 * returns string used to create new entries satisfying the collection
 * searchPattern
 *
 * @return {string}
 */
hash5.model.EntryCollection.prototype.getSearchPatternText = function()
{
    // TODO bad fix...
    var textPattern = this.searchPattern_.replace('/entries', '');
    textPattern = textPattern.replace('?query=', '');

    return decodeURIComponent(textPattern);
};


/**
 * returns whether currently new entries are requested
 *
 * @return {boolean}
 */
hash5.model.EntryCollection.prototype.isLoadingEntries = function()
{
    return this.isLoadingEntries_;
};

/**
 * should be called when request was started to load more entries for this collection
 */
hash5.model.EntryCollection.prototype.startLoadingEntries = function()
{
    this.isLoadingEntries_ = true;
};

/**
 * should be called when request and adding of new entries is finished
 */
hash5.model.EntryCollection.prototype.finishedLoadingEntries = function()
{
    this.isLoadingEntries_ = false;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
};

/**
 * @param  {goog.events.Event} e
 */
hash5.model.EntryCollection.prototype.handleEntryStoreChanged_ = function(e)
{
    this.refresh();
};

/**
 * refreshes current entries
 * only possible if searchPattern is set
 *
 * @param {Function=} callback called when request is finished
 * @param {*=} handler
 * @return {boolean} true if refresh was possible
 */
hash5.model.EntryCollection.prototype.refresh = function(callback, handler)
{
    if(this.searchPattern_)
    {
        this.startLoadingEntries();

        hash5.api.getEntries(this.searchPattern_, this, function(){
            this.finishedLoadingEntries();

            if(callback)
            {
                callback.call(handler);
            }
        }, this);

        return true;
    }
    else
    {
        return false;
    }
};

/** @inheritDoc */
hash5.model.EntryCollection.prototype.disposeInternal = function()
{
    this.handler_.dispose();

    goog.base(this, 'disposeInternal');
};