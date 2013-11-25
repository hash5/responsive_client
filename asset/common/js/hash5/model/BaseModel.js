goog.provide('hash5.model.BaseModel');

goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.model.BaseModel = function()
{
    goog.base(this);


    /**
     * @type {*}
     * @private
     */
    this.sync_ = null;


}
goog.inherits(hash5.model.BaseModel, goog.events.EventTarget);

/**
 * @return {!Object}
 */
hash5.model.BaseModel.prototype.serialize = function()
{
    return {};
}