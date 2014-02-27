goog.provide('hash5.ds.EntryStore');

goog.require('goog.events.EventTarget');


/**
 * simple ItemStore to cache Entries
 * for added entries the parentEventTarget will be set to
 * this singleton
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ds.EntryStore = function()
{
    goog.base(this);

    /**
     * containing items
     *
     * @type {Object}
     * @private
     */
    this.entries_ = {};
};
goog.inherits(hash5.ds.EntryStore, goog.events.EventTarget);
goog.addSingletonGetter(hash5.ds.EntryStore);

/**
 * returns item for given id or null if no item is found
 *
 * @param  {string} id
 * @return {hash5.model.Entry}
 */
hash5.ds.EntryStore.prototype.get = function(id)
{
    return this.entries_[id] || null;
};

/**
 * adds or updates item for specific id
 *
 * @param  {string} id
 * @param  {hash5.model.Entry} model
 */
hash5.ds.EntryStore.prototype.set = function(id, model)
{
    this.entries_[id] = model;

    model.setParentEventTarget(this);
};

/**
 * removes item for id
 *
 * @param {string} id The id to remove.
 * @return {boolean} Whether an element was removed.
 */
hash5.ds.EntryStore.prototype.remove = function(id)
{
    return goog.object.remove(this.entries_, id);
};