goog.provide('hash5.ds.ConnectionManager');

goog.require('goog.Uri.QueryData');
goog.require('goog.net.XhrManager');
goog.require('goog.structs.Map');
goog.require('goog.events.EventTarget');

goog.require('hash5.ds.Request');

/**
 * ConnectionManager to observe requests to server.
 * Errors on requests are cached and handled.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ds.ConnectionManager = function()
{
    goog.base(this);

    /**
     * @type {goog.net.XhrManager}
     * @private
     */
    this.xhr_ = new goog.net.XhrManager();
    goog.events.listen(this.xhr_, goog.net.EventType.ERROR, this.handleError_, false, this);
    goog.events.listen(this.xhr_, goog.net.EventType.SUCCESS, this.handleCompleted_, false, this);

    /**
     * indexCounter to identyfy requests
     *
     * @type {number}
     * @private
     */
    this.index_ = 0;

    /**
    * Map of ID's to requests.
    * @type {goog.structs.Map.<string, !hash5.ds.Request>}
    * @private
    */
    this.requests_ = new goog.structs.Map();

    /**
     * requests which could not be sendet.
     *
     * @type {Array.<hash5.ds.Request>}
     */
    this.cachedRequests_ = [];

    /**
     * false if currently there is no connection to server
     *
     * @type {boolean}
     * @private
     */
    this.online_ = true;
    // TODO maybe use onlinehandler from closure library?

    var userController = hash5.controller.UserController.getInstance();
    goog.events.listen(userController, hash5.controller.UserController.EventType.LOGIN, this.handleServerAvailable_, false, this);
};
goog.inherits(hash5.ds.ConnectionManager, goog.events.EventTarget);
goog.addSingletonGetter(hash5.ds.ConnectionManager);

/**
 * handles xhr error
 * @param  {goog.net.XhrManager.Event} e
 */
hash5.ds.ConnectionManager.prototype.handleError_ = function(e)
{
    var xhr = e.xhrIo;
    var request = this.requests_.get(e.id);
    var retryRequest = false;

    //console.log(xhr.getStatus());

    switch(xhr.getStatus())
    {
        case goog.net.HttpStatus.UNAUTHORIZED:
            this.dispatchEvent(hash5.ds.ConnectionManager.EventType.UNAUTHORIZED);
            retryRequest = true;
            break;

        case 0:
            console.log("server unavailable");
            this.online_ = false;
            this.dispatchEvent(hash5.ds.ConnectionManager.EventType.OFFLINE);
            retryRequest = true;
            break;

        default:
            request.setCompletedWithError(e);
    }

    // save request to retry it later
    if(retryRequest)
    {
        this.cachedRequests_.push(request);
        this.requests_.remove(e.id);
    }
};

/**
 * returns current online state (true for online)
 * @return {boolean}
 */
hash5.ds.ConnectionManager.prototype.isOnline = function()
{
    return this.online_;
};

/**
 * handles completed xhr request
 * @param  {goog.net.XhrManager.Event} e
 */
hash5.ds.ConnectionManager.prototype.handleCompleted_ = function(e)
{
    var request = this.requests_.get(e.id);
    request.setCompleted(e);
    this.requests_.remove(e.id);

    // if request could be handled, also the cached should be possible
    if(!this.online_)
    {
        this.handleServerAvailable_();
    }
};

/**
 * handles Server reavailable and retries cached requests.
 * @param  {goog.events.Event} e
 */
hash5.ds.ConnectionManager.prototype.handleServerAvailable_ = function(e)
{
    if(!this.online_)
    {
        this.online_ = true;
        this.dispatchEvent(hash5.ds.ConnectionManager.EventType.ONLINE);
    }

    goog.array.forEach(this.cachedRequests_, function(request){
        this.retryRequest_(request);
    }, this);

    this.cachedRequests_ = [];
};


/**
 * Registers the given request to be sent. Throws an error if a request
 * already exists with the given ID.
 * NOTE: It is not sent immediately. It is queued and will be sent when an
 * XhrIo object becomes available, taking into account the request's
 * priority.
 * @param {string} id The id of the request.
 * @param {string} url Uri to make the request too.
 * @param {string=} method Send method, default: GET.
 * @param {*=} content Post data.
 * @param {Function=} callback Callback function for when request is
 *     complete. The only param is the event object from the COMPLETE event.
 * @return {goog.net.XhrManager.Request} The queued request object.
 */
hash5.ds.ConnectionManager.prototype.send_ = function(id, url, method, content, callback)
{
    /** @type {string|undefined} */
    var data = undefined;

    if(goog.isString(content))
    {
        data = /** @type {string} */ (content);
    }
    else if(goog.isObject(content))
    {
        data = goog.Uri.QueryData.createFromMap(content).toString();
    }

    return this.xhr_.send(id, url, method, data, undefined, undefined, callback, 0);
};


/**
 * Registers the given request to be sent.
 *
 * @param {string} url Uri to make the request too.
 * @param {string=} method Send method, default: GET.
 * @param {*=} content Post data.
 * @param {Function=} callback Callback function for when request is
 *     successfuly sendet
 * @param {*=} handler scope to call callback in
 * @return {hash5.ds.Request} The queued request object.
 */
hash5.ds.ConnectionManager.prototype.request = function(url, method, content, callback, handler)
{
    var id = this.index_++ + '';
    var request = new hash5.ds.Request();

    var xhrRequest = this.send_(id, url, method || 'GET', content);
    request.setXhrRequest(xhrRequest);
    if(callback)
    {
        request.setSuccessCallback(callback, handler);
    }

    this.requests_.set(id, request);

    return request;
};

/**
 * tries to send request again
 *
 * @param  {hash5.ds.Request} request
 */
hash5.ds.ConnectionManager.prototype.retryRequest_ = function(request)
{
    var id = this.index_++ + '';

    var req = request.getXhrManagerRequest();
    var xhrRequest = this.send_(id, req.getUrl(), req.getMethod(), req.getContent());
    request.setXhrRequest(xhrRequest);

    this.requests_.set(id, request);
};


/**
 * Registers the given request to be sent.
 *
 * @param {string} url Uri to make the request too.
 * @param {string=} method Send method, default: GET.
 * @param {*=} content Post data.
 * @param {Function=} callback Callback function for when request is
 *     successfuly sendet
 * @param {*=} handler scope to call callback in
 * @return {hash5.ds.Request} The queued request object.
 */
hash5.ds.ConnectionManager.request  = function(url, method, content, callback, handler)
{
    var connectionManager = hash5.ds.ConnectionManager.getInstance();
    return connectionManager.request(url, method, content, callback, handler);
};

/**
 * Events to observe current connection.
 * @enum {string}
 */
hash5.ds.ConnectionManager.EventType = {
    OFFLINE: 'conn_offline',
    ONLINE: 'conn_online',
    UNAUTHORIZED: 'conn_unauthorized'
};