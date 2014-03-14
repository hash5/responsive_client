goog.provide('hash5.storage.AppData');

goog.require('goog.storage.ExpiringStorage');
goog.require('goog.storage.mechanism.mechanismfactory');

/**
 * @constructor
 * @extends {goog.storage.ExpiringStorage}
 */
hash5.storage.AppData = function()
{
    var mechanism = /** @type {!goog.storage.mechanism.Mechanism} */ (goog.storage.mechanism.mechanismfactory.create('appdata'));
    goog.base(this, mechanism);

};
goog.inherits(hash5.storage.AppData, goog.storage.ExpiringStorage);
goog.addSingletonGetter(hash5.storage.AppData);

/**
 * returns key prefixed with user id to unsure user specific storage
 *
 * @param  {string} key
 * @return {string}
 */
hash5.storage.AppData.prototype.getUserSpecKey = function(key)
{
    var userController = hash5.controller.UserController.getInstance(),
        curUser = userController.getCurrentUser(),
        userName = 'blaUser'; //curUser.getUserName(); // TODO unsure user is realy set

    return userName + key;
}


/** @override */
hash5.storage.AppData.prototype.set = function(key, value, opt_expiration)
{
    var userKey = this.getUserSpecKey(key);

    return goog.base(this, 'set', userKey, value, opt_expiration);
};


/** @override */
hash5.storage.AppData.prototype.get = function(key)
{
    var userKey = this.getUserSpecKey(key);

    return goog.base(this, 'get', userKey);
};