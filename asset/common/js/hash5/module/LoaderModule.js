goog.provide('hash5.module.LoaderModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.controller.ErrorController');



/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.LoaderModule = function()
{
  goog.base(this);

  this.handler_ = new goog.events.EventHandler(this);

};
goog.inherits(hash5.module.LoaderModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.LoaderModule.prototype.initialize = function(context)
{
    hash5.controller.ErrorController.getInstance().initialize({});

    // init userController
    var userController = hash5.controller.UserController.getInstance();
    this.handler_.listen(userController, hash5.controller.UserController.EventType.LOGIN, this.handleLogin_);
    userController.initialize(context.config, function(isLoggedIn){
        if(!isLoggedIn) {
            var loginForm = new hash5.ui.LoginForm();
            loginForm.render(document.body);

            this.showLoader(false);
        }
    }, this);
};


hash5.module.LoaderModule.prototype.handleLogin_ = function()
{
    this.showLoader(true);

    var app = hash5.App.getInstance();

    // set user language
    var userController = hash5.controller.UserController.getInstance(),
        lang = userController.getUserLocale();
    app.setLanguage(lang);

    // load modules
    var moduleManager = goog.module.ModuleManager.getInstance();
    moduleManager.execOnLoad(hash5.module.Modules.CORE, goog.bind(function(){
        this.showLoader(false);
    }, this));

    var waitForCounter = 0,
        modules2Load = app.getAutoLoadModules();

    goog.array.forEach(modules2Load, function(module){
        waitForCounter++;
        moduleManager.execOnLoad(module, function() {
            waitForCounter--;

            if(waitForCounter <= 0) {
                // all modules are loaded
                hash5.module.setModulesLoaded();
            }
        });
    });

};

/**
 * shows or hides the page loader animation
 * @param  {boolean} visilbe
 */
hash5.module.LoaderModule.prototype.showLoader = function(visilbe)
{
    var loader = goog.dom.getElement('page-loader');
    goog.dom.classes.enable(loader, 'hidden', !visilbe);
};