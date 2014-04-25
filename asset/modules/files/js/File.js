goog.provide('hash5.module.files.File');

/**
 *
 * @constructor
 */
hash5.module.files.File = function()
{
    //goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.id_ = '';
};

/**
 * returns file id
 * @return {string}
 */
hash5.module.files.File.prototype.getId = function()
{
    return this.id_;
};

hash5.module.files.File.prototype.destroy = function(callback, handler)
{
    hash5.ds.ConnectionManager.request('/files/' + this.getId(), 'DELETE', undefined, callback, handler);
};