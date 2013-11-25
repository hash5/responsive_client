goog.provide('hash5.model.ApiManager');

goog.require('goog.events.EventTarget');
goog.require('goog.net.XhrManager');
goog.require('goog.Uri.QueryData');

/**
 * connection wrapper to connect to REST-API
 * handles errors and xhr pool
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.model.ApiManager = function()
{
    goog.base(this);


    /**
     * @type {[type]}
     * @private
     */
    this.xhrManager_ = new goog.net.XhrManager();
}
goog.inherits(hash5.model.ApiManager, goog.events.EventTarget);
goog.addSingletonGetter(hash5.model.ApiManager);


hash5.model.ApiManager.prototype.send = function(url, opt_method, opt_content, opt_callback, opt_handler)
{

    if(opt_content && !goog.isString(opt_content))
    {
        opt_content = goog.Uri.QueryData.createFromMap(opt_content).toString();
    }
    //this.xhrManager_.send();
    //
}


hash5.model.ApiManager.prototype.sendCall = function(apiCall)
{
}