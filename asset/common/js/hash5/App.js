goog.provide('hash5.App');


goog.require('hash5.controller.UserController');
goog.require('hash5.controller.MainPanelController');
goog.require('hash5.ds.DataSource');

// include ui controls for auto-decation here
goog.require('hash5.ui.UiDecorator');
goog.require('hash5.ui.PageHeader');
goog.require('hash5.ui.LoginForm');
goog.require('hash5.ui.SearchField');
goog.require('hash5.ui.CreateEntry');


/**
 * @param {*} config
 * @constructor
 */
hash5.App = function(config){
    hash5.ui.UiDecorator.getInstance().decorateElements();

    hash5.controller.MainPanelController.getInstance().initialize(config);
    hash5.controller.UserController.getInstance().initialize(config);


};

/**
 * @param  {*} config
 */
hash5.bootstrap = function(config){
    window.app = new hash5.App(config);
};

goog.exportSymbol('hash5.bootstrap', hash5.bootstrap);
