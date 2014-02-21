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
        }
    }, this);
};


hash5.module.LoaderModule.prototype.handleLogin_ = function()
{
    var userController = hash5.controller.UserController.getInstance();
    var lang = userController.getUserLocale();
    hash5.App.getInstance().setLanguage(lang);

    var moduleManager = goog.module.ModuleManager.getInstance();
    moduleManager.load(hash5.module.Modules.CORE);

    // TODO get from app-file
    moduleManager.load(hash5.module.Modules.CALENDAR);
};