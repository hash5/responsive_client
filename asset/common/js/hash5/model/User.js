goog.provide('hash5.model.User');

goog.require('hash5.model.BaseModel');

/**
 * @constructor
 * @extends {hash5.model.BaseModel}
 */
hash5.model.User = function()
{
    goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.userName_ = '';
}
goog.inherits(hash5.model.User, hash5.model.BaseModel);

hash5.model.User.prototype.getUserName = function()
{
    return this.userName_;
}