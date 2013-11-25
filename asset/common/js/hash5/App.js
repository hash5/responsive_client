goog.provide('hash5.App');


goog.require('hash5.controller.UserController');
goog.require('hash5.controller.MainPanelController');
goog.require('hash5.ds.DataSource');

// include ui controls for auto-decation here
goog.require('hash5.ui.UiDecorator');
goog.require('hash5.ui.LoginForm');
goog.require('hash5.ui.SearchField');
goog.require('hash5.ui.CreateEntry');


/**
 * @constructor
 */
hash5.App = function(){
    hash5.ui.UiDecorator.getInstance().decorateElements();

    hash5.controller.UserController.getInstance().initialize({});
    hash5.controller.MainPanelController.getInstance().initialize({});

};

/**
 * @param  {*} config
 */
hash5.bootstrap = function(config){
    window.app = new hash5.App();
};

goog.exportSymbol('hash5.bootstrap', hash5.bootstrap);
