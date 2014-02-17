goog.provide('hash5.App');

goog.require('goog.dom.ViewportSizeMonitor');


goog.require('hash5.controller.UserController');
goog.require('hash5.ui.LoginForm');


goog.require('goog.module.ModuleLoader');
goog.require('goog.module.ModuleManager');
goog.require('hash5.module');
goog.require('hash5.module.LoaderModule');

goog.require('goog.debug.FancyWindow');


/**
 * @constructor
 */
hash5.App = function(){

    /**
     * the app config set in the bootstrap function
     *
     * @type {Object}
     */
    this.config = {};


    /**
     * @type {string}
     */
    this.language_ = 'en';

    this.initModuleManager_();
};
goog.addSingletonGetter(hash5.App);

/**
 * @param  {Object} config
 */
hash5.App.prototype.setConfig = function(config)
{
  this.config = config;
};

/**
 * initialize the module manager
 * this should be called only once!
 */
hash5.App.prototype.initModuleManager_ = function()
{
    var moduleLoader = new goog.module.ModuleLoader();
    moduleLoader.setDebugMode(goog.DEBUG);
    goog.module.ModuleLoader.supportsSourceUrlStackTraces = function(){return false;};

    var moduleManager = goog.module.ModuleManager.getInstance();
    moduleManager.setLoader(moduleLoader);
    moduleManager.setAllModuleInfo(PLOVR_MODULE_INFO);
    moduleManager.setModuleUris(PLOVR_MODULE_URIS);
    moduleManager.setModuleContext(this);
};


/**
 * @param {string} lang
 */
hash5.App.prototype.setLanguage = function(lang)
{
  this.language_ = lang;

  // TODO currently no lang-change in debug mode is possible!
  if(goog.DEBUG)
    return;

  var moduleUris = PLOVR_MODULE_URIS;
  for(var moduleId in moduleUris)
  {
    moduleUris[moduleId] = moduleUris[moduleId].replace('LANG', lang);
  }

  var moduleManager = goog.module.ModuleManager.getInstance();
  moduleManager.setModuleUris(moduleUris);
};

/**
 * global viewportSizeMonitor to observe resizing
 *
 * @type {goog.dom.ViewportSizeMonitor}
 */
hash5.App.viewportSizeMonitor = new goog.dom.ViewportSizeMonitor();

/**
 * @param  {Object} config
 */
hash5.bootstrap = function(config){

    // print js errors in popup if ?debug is in url
    if(goog.DEBUG && /debug/gi.test(document.location.search))
    {
        window.onerror = function(message, url, lineNumber) {
          alert(message);
          alert(url + lineNumber);
          return true;
        };
    }

    if(goog.DEBUG)
    {
        var debugWindow = new goog.debug.FancyWindow('main');
        debugWindow.setEnabled(true);
        debugWindow.init();
    }

    var app = window.app = hash5.App.getInstance();
    app.setConfig(config);


    hash5.module.setLoaded(hash5.module.Modules.APP, hash5.module.LoaderModule);
};

goog.exportSymbol('hash5.bootstrap', hash5.bootstrap);
