goog.provide('hash5.App');

goog.require('goog.dom.ViewportSizeMonitor');


goog.require('hash5.controller.UserController');
goog.require('hash5.ui.LoginForm');


goog.require('goog.module.ModuleLoader');
goog.require('goog.module.ModuleManager');

/**
 * @param  {Object} config
 * @constructor
 */
hash5.App = function(config){

    this.config = config;

    // init ModuleManager
    var moduleManager = goog.module.ModuleManager.getInstance();
    var moduleLoader = new goog.module.ModuleLoader();
    moduleManager.setLoader(moduleLoader);
    moduleManager.setAllModuleInfo(PLOVR_MODULE_INFO);
    moduleManager.setModuleUris(PLOVR_MODULE_URIS);
    moduleLoader.setDebugMode(true);
    moduleLoader.usingSourceUrlInjection_ = function(){return false;};

    moduleManager.setLoaded('app');
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

    window.app = new hash5.App(config);


    // init userController
    var userController = hash5.controller.UserController.getInstance();
    goog.events.listenOnce(userController, hash5.controller.UserController.EventType.LOGIN, function(){
        var moduleManager = goog.module.ModuleManager.getInstance();
        var lang = userController.getUserLocale();
        moduleManager.execOnLoad('main-panel', function(){
            console.log("main panel-loaded");
        });
    });
    goog.events.listenOnce(userController, hash5.controller.UserController.EventType.UNAUTHORIZED, function(){
        var loginForm = new hash5.ui.LoginForm();
        loginForm.render(document.body);
    });
    userController.initialize(config);
};

goog.exportSymbol('hash5.bootstrap', hash5.bootstrap);
