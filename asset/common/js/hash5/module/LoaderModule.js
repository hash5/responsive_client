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


};
goog.inherits(hash5.module.LoaderModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.LoaderModule.prototype.initialize = function(context)
{
    // init userController
    var userController = hash5.controller.UserController.getInstance();
    goog.events.listenOnce(userController, hash5.controller.UserController.EventType.LOGIN, function(){
        var lang = userController.getUserLocale();
        hash5.App.getInstance().setLanguage(lang);

        var moduleManager = goog.module.ModuleManager.getInstance();
        moduleManager.load('core');
    });
    goog.events.listenOnce(userController, hash5.controller.UserController.EventType.UNAUTHORIZED, function(){
        var loginForm = new hash5.ui.LoginForm();
        loginForm.render(document.body);
    });
    userController.initialize(context.config);
};
