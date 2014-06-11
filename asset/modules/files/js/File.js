goog.provide('hash5.module.files.File');

/**
 * @param {string} id
 * @param {string} url
 * @param {Object} info
 *
 * @constructor
 */
hash5.module.files.File = function(id, url, info)
{
    //goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.url_ = url;

    /**
     * @type {string}
     * @private
     */
    this.id_ = id;

    /**
     * @type {Object}
     * @private
     */
    this.info_ = info;
};

/**
 * returns file id
 * @return {string}
 */
hash5.module.files.File.prototype.getUrl = function()
{
    return this.url_;
};

/**
 * returns file id
 * @return {string}
 */
hash5.module.files.File.prototype.getId = function()
{
    return this.id_ ;
};

/**
 * returns file infos
 * @return {Object}
 */
hash5.module.files.File.prototype.getFileInfo = function()
{
    return this.info_ ;
};

/**
 * destroyes file at server
 * @param  {Function=} callback
 * @param  {*=} handler
 */
hash5.module.files.File.prototype.destroy = function(callback, handler)
{
    hash5.ds.ConnectionManager.request('/files/' + this.getId(), 'DELETE', undefined, callback, handler);
};


/**
 * @param {hash5.module.files.File} file
 * @return {boolean}
 */
hash5.module.files.File.prototype.equals = function(file)
{
    return !!file && (file.url_ === this.url_);
};