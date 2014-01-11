goog.provide('hash5.ds.Store');

/**
 *
 *
 * @template T
 * @constructor
 */
hash5.ds.Store = function()
{
    /**
     * @type {*}
     * @private
     */
    this.entries_ = {};
};

/**
 * @param  {string} key
 * @return {T}
 */
hash5.ds.Store.prototype.get = function(key)
{
    return this.entries_[key] || null;
};

/**
 * @param  {string} key
 * @param  {T} item
 */
hash5.ds.Store.prototype.set = function(key, item)
{
    this.entries_[key] = item;
};