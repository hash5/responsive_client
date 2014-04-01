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

    /**
     * specifies current sort & pagination options
     *
     * @type {hash5.ds.Options}
     * @private
     */
    this.options_ = hash5.ds.DefaultOptions;

    /**
     * indicates whether all pages has been loaded
     * once a request to a page returns 0 rows, flag is set to true
     *
     * @type {boolean}
     */
    this.loadedAll_ = false;

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


/**
 * set current pagination manually
 * @param {hash5.ds.Options} options
 */
hash5.model.EntryCollection.prototype.setOptions = function(options)
{
    this.options_ = options;
};


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
    this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE);
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
 * @param {boolean=} append if set true all retrieving entries will be added to collection. Otherwise
 * the new entries will be merged
 * @return {boolean} true if refresh was possible
 */
hash5.model.EntryCollection.prototype.refresh = function(callback, handler, append)
{
    if(this.searchPattern_)
    {
        this.startLoadingEntries();

        var options = /** @type{hash5.ds.Options} */ (goog.object.clone(this.options_));
        if(!append)
        {
            // reset skip if the whole entryList need to be refreshed
            options.limit = (options.skip || 0) + options.limit;
            options.skip = 0;
        }

        hash5.api.getEntries(this.searchPattern_, this, options, function(){
            this.finishedLoadingEntries();

            if(callback)
            {
                callback.call(handler);
            }
        }, this, append);

        return true;
    }
    else
    {
        return false;
    }
};

/**
 * tries to load next page (pagination)
 * does nothing if this.loadedAll_ is true
 */
hash5.model.EntryCollection.prototype.tryLoadMoreEntries = function()
{
    if(!this.loadedAll_ && !this.isLoadingEntries())
    {
        var curSkip = (this.options_.skip || 0),
            limit = (this.options_.limit || hash5.ds.DefaultOptions.limit);

        this.options_.skip = curSkip + limit;

        this.refresh(undefined, undefined, true);
    }
};

/**
 * inserts loaded entries.
 * if modelArr.lenght is smaller than pageSize no more entries will be loaded!
 *
 * @param  {Array.<hash5.model.Entry>} modelArr
 */
hash5.model.EntryCollection.prototype.insertLoadedEntries = function(modelArr)
{
    goog.array.forEach(modelArr, function(entry){
        this.insert(entry);
    }, this);

    // no more entries to load on next page
    var pageSize = this.options_.limit || 1;
    if(modelArr.length < pageSize)
    {
        this.loadedAll_ = true;
    }
};

/** @inheritDoc */
hash5.model.EntryCollection.prototype.disposeInternal = function()
{
    this.handler_.dispose();

    goog.base(this, 'disposeInternal');
};