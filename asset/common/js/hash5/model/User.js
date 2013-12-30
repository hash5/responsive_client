goog.provide('hash5.model.User');

goog.require('hash5.model.BaseModel');

/**
 * @param {string} username
 *
 * @constructor
 * @extends {hash5.model.BaseModel}
 */
hash5.model.User = function(username)
{
    goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.userName_ = username;
}
goog.inherits(hash5.model.User, hash5.model.BaseModel);

hash5.model.User.prototype.getUserName = function()
{
    return this.userName_;
}