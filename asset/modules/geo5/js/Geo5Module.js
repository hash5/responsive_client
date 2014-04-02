goog.provide('hash5.module.Geo5Module');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.Geo5Module = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.Geo5Module, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.Geo5Module.prototype.initialize = function(context)
{
    console.log("geo5 loaded");
};

hash5.module.setLoaded(hash5.module.Modules.GEO5, hash5.module.Geo5Module);