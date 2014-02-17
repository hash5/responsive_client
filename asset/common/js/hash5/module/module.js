goog.provide('hash5.module');

/**
 * sets the module loaded and registers constructor to create module
 * The constructor should derive from {@see hash5.module.BaseModule}.
 *
 * @param {hash5.module.Modules} moduleId
 * @param {Function} constructor The constructor function.
 */
hash5.module.setLoaded = function(moduleId, constructor)
{
    var moduleManager = goog.module.ModuleManager.getInstance();
    moduleManager.beforeLoadModuleCode(moduleId);
    moduleManager.setModuleConstructor(constructor);
    moduleManager.setLoaded(moduleId);
    moduleManager.afterLoadModuleCode(moduleId);
};


/**
 * module id's
 *
 * @enum {string}
 */
hash5.module.Modules = {
    APP: 'app',
    CORE: 'core'
};