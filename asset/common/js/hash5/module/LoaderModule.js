goog.provide('hash5.module.LoaderModule');

goog.require('hash5.module.BaseModule');



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
    // init userController
    var userController = hash5.controller.UserController.getInstance();
    this.handler_.listen(userController, hash5.controller.UserController.EventType.LOGIN, this.handleLogin_);
    userController.initialize(context.config, function(isLoggedIn){
        if(!isLoggedIn)
        {
            var loginForm = new hash5.ui.LoginForm();
            loginForm.render(document.body);

            this.showLoader(false);
        }
    }, this);
};


hash5.module.LoaderModule.prototype.handleLogin_ = function()
{
    this.showLoader(true);

    var userController = hash5.controller.UserController.getInstance();
    var lang = userController.getUserLocale();
    hash5.App.getInstance().setLanguage(lang);

    var moduleManager = goog.module.ModuleManager.getInstance();
    moduleManager.execOnLoad(hash5.module.Modules.CORE, goog.bind(function(){
        this.showLoader(false);
    }, this));

    // TODO get from app-file
    moduleManager.load(hash5.module.Modules.CALENDAR);
    moduleManager.load(hash5.module.Modules.GEO5);
};


hash5.module.LoaderModule.prototype.showLoader = function(visilbe)
{
    var loader = goog.dom.getElement('page-loader');
    goog.dom.classes.enable(loader, 'hidden', !visilbe);
};