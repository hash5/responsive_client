goog.provide('hash5.module');


/**
 * @type {Array.<hash5.module.BaseModule>}
 * @private
 */
hash5.module.loadedModules_ = [];

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

    var instance = moduleManager.getModuleInfo(moduleId).getModule();
    hash5.module.loadedModules_.push(instance);
};


/**
 * @see hash5.module.setLoaded
 * this function is used for inline modules and does not use the
 * moduleManager
 *
 * @param {hash5.module.Modules} moduleId
 * @param {Function} constructor The constructor function.
 */
hash5.module.setStaticLoaded = function(moduleId, constructor)
{
    var instance = new constructor;
    var app = hash5.App.getInstance();
    instance.initialize(app);

    hash5.module.loadedModules_.push(instance);
};

/**
 * will call modulesLoaded on all modules
 */
hash5.module.setModulesLoaded = function()
{
    goog.array.forEach(hash5.module.loadedModules_, function(module){
        module.modulesLoaded();
    });
};


/**
 * module id's
 *
 * @enum {string}
 */
hash5.module.Modules = {
    APP: 'app',
    CORE: 'core',
    RECOMMEND: 'recommmend',
    CALENDAR: 'calendar',
    LINKS: 'calendar',
    GEO5: 'geo5',
    FILES: 'files',
    INTRO: 'intro'
};