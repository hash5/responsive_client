goog.provide('hash5.model.Usersettings');

goog.require('hash5.model.BaseModel');

/**
 * @constructor
 * @extends {hash5.model.BaseModel}
 */
hash5.model.Usersettings = function()
{
    goog.base(this);

    /**
     * @type {*}
     * @private
     */
    this.settings_ = '';
}
goog.inherits(hash5.model.Usersettings, hash5.model.BaseModel);

/**
 * @param  {string} key
 * @return {*}
 */
hash5.model.Usersettings.prototype.get = function(key)
{
    return this.settings_[key];
}