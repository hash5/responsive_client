goog.provide('hash5.model.EntryCollection');

goog.require('goog.net.EventType');

goog.require('hash5.model.Collection');

/**
 * @param {Array.<hash5.model.Entry>=} entries
 * @param {string=} searchPattern
 *
 * @constructor
 * @extends {hash5.model.Collection<hash5.model.Entry>}
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


    if(entries){
        goog.array.forEach(entries, function(entry){
            this.insert(entry);
        }, this);
    }
};
goog.inherits(hash5.model.EntryCollection, hash5.model.Collection);

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