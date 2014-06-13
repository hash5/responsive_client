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
     * handler to call callback in
     * @type {*}
     * @private
     */
    this.successCallbackHandler_ = null;

    /**
     * @type {goog.net.XhrManager.Request}
     * @private
     */
    this.xhrRequest_ = null;

    /**
     * if set to true, request will be cached on connection
     * failure
     * @type {boolean}
     * @private
     */
    this.retry_ = true;
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
    this.successCallback_ = callback;
    this.successCallbackHandler_ = handler;
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
        var handler = this.successCallbackHandler_;
        // only execute callback if handler is not disposed
        if(!(handler && handler instanceof goog.Disposable && handler.isDisposed()))
        {
            this.successCallback_.call(this.successCallbackHandler_, e.xhrIo);
        }
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
    var handled = this.dispatchEvent(goog.net.EventType.ERROR);

    if(!handled) {
        // TODO custom message
        alert("uncached network exception");
    }
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

/**
 * set retry behaviour on connection error
 *
 * @param {boolean} shouldRetry
 */
hash5.ds.Request.prototype.setRetry = function(shouldRetry)
{
    this.retry_ = shouldRetry;
};


/**
 * returns whether the request should be cached on connection error
 *
 * @return {boolean}
 */
hash5.ds.Request.prototype.shouldRetry = function()
{
    return this.retry_;
};