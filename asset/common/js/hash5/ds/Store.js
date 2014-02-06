goog.provide('hash5.ds.Store');

/**
 * very simple ItemStore to cache items
 *
 * @template T
 * @constructor
 */
hash5.ds.Store = function()
{
    /**
     * containing items
     *
     * @type {Object}
     * @private
     */
    this.entries_ = {};
};

/**
 * returns item for given key or null if no item is found
 *
 * @param  {string} key
 * @return {T}
 */
hash5.ds.Store.prototype.get = function(key)
{
    return this.entries_[key] || null;
};

/**
 * adds or updates item for specific key
 *
 * @param  {string} key
 * @param  {T} item
 */
hash5.ds.Store.prototype.set = function(key, item)
{
    this.entries_[key] = item;
};

/**
 * removes item for key
 *
 * @param {string} key The key to remove.
 * @return {boolean} Whether an element was removed.
 */
hash5.ds.Store.prototype.remove = function(key)
{
    return goog.object.remove(this.entries_, key);
};