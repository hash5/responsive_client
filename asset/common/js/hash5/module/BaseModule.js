goog.provide('hash5.module.BaseModule');

goog.require('goog.module.BaseModule');



/**
 * A basic module object that represents a module of Javascript code that can
 * be dynamically loaded.
 *
 * @constructor
 * @extends {goog.module.BaseModule}
 */
hash5.module.BaseModule = function()
{
  goog.base(this);


};
goog.inherits(hash5.module.BaseModule, goog.module.BaseModule);


/**
 * Performs any load-time initialization that the module requires.
 * @param {hash5.App} context The module context.
 */
hash5.module.BaseModule.prototype.initialize = function(context) {};