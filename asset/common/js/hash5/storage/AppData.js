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