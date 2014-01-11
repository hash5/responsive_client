goog.provide('hash5.App');

goog.require('goog.dom.ViewportSizeMonitor');

goog.require('hash5.api');

goog.require('hash5.controller.UserController');
goog.require('hash5.controller.MainPanelController');

// include ui controls for auto-decation here
goog.require('hash5.ui.UiDecorator');
goog.require('hash5.ui.PageHeader');
goog.require('hash5.ui.PageSidebar');
goog.require('hash5.ui.LoginForm');
goog.require('hash5.ui.SearchField');
goog.require('hash5.ui.EntryEditor');


/**
 * @param  {Object} config
 * @constructor
 */
hash5.App = function(config){
    hash5.ui.UiDecorator.getInstance().decorateElements();

    hash5.controller.MainPanelController.getInstance().initialize(config);
    hash5.controller.UserController.getInstance().initialize(config);
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
};

goog.exportSymbol('hash5.bootstrap', hash5.bootstrap);
