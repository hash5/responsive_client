goog.provide('hash5.controller.BaseController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.controller.BaseController = function()
{
    goog.base(this);


    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = null;
};
goog.inherits(hash5.controller.BaseController, goog.events.EventTarget);


/**
 * @return {goog.events.EventHandler}
 */
hash5.controller.BaseController.prototype.getHandler = function() {
    return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
};

hash5.controller.BaseController.prototype.dispose = function() {
    if (this.handler_) {
        this.handler_.dispose();
        this.handler_ = null;
    }
};