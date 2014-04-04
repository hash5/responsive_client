goog.provide('hash5.ds.Request');

goog.require('goog.events.EventTarget');

/**
 * encapsulates a request to the server rest interface
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ds.Request = function()
{
    goog.base(this);

    /**
     * @type {Function|undefined}
     * @private
     */
    this.successCallback_ = undefined;

    /**
     * @type {goog.net.XhrManager.Request}
     * @private
     */
    this.xhrRequest_ = null;
};
goog.inherits(hash5.ds.Request, goog.events.EventTarget);

/**
 * @param {goog.net.XhrManager.Request} xhrRequest
 */
hash5.ds.Request.prototype.setXhrRequest = function(xhrRequest)
{
    this.xhrRequest_ = xhrRequest;
};

/**
 * @param {Function} callback
 * @param {*=}   handler
 */
hash5.ds.Request.prototype.setSuccessCallback = function(callback, handler)
{
    this.successCallback_ = goog.bind(callback, handler);
};


/**
 * sets the requests completed
 *
 * @param  {goog.net.XhrManager.Event} e
 */
hash5.ds.Request.prototype.setCompleted = function(e)
{
    if(this.successCallback_)
    {
        this.successCallback_(e.xhrIo);
    }

    this.dispatchEvent(goog.net.EventType.SUCCESS);
};

/**
 * sets the requests completed with error
 *
 * @param  {goog.net.XhrManager.Event} e
 */
hash5.ds.Request.prototype.setCompletedWithError = function(e)
{
    this.dispatchEvent(goog.net.EventType.ERROR);
};

/**
 * returns respnse json from server if available
 * @return {*}
 */
hash5.ds.Request.prototype.getResponseJson = function()
{
    return this.xhrRequest_.xhrIo ? this.xhrRequest_.xhrIo.getResponseJson() : null;
};

/**
 * returns used xhrIo object
 *
 * @return {goog.net.XhrIo}
 */
hash5.ds.Request.prototype.getXhrIo = function()
{
    return this.xhrRequest_.xhrIo;
};


/**
 * returns xhrRequest
 *
 * @return {goog.net.XhrManager.Request}
 */
hash5.ds.Request.prototype.getXhrManagerRequest = function()
{
    return this.xhrRequest_;
};