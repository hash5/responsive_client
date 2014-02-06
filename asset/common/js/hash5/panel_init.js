

goog.require('hash5.api');
goog.require('hash5.Router');

goog.require('hash5.controller.MainPanelController');


// include ui controls for auto-decation here
goog.require('hash5.ui.UiDecorator');
goog.require('hash5.ui.PageHeader');
goog.require('hash5.ui.PageSidebar');

goog.require('hash5.ui.SearchField');
goog.require('hash5.ui.editor.EntryEditor');


goog.require('goog.module.ModuleManager');

(function(){
    var config = window.app.config;

    hash5.ui.UiDecorator.getInstance().decorateElements();

    hash5.controller.MainPanelController.getInstance().initialize(config);

    // init router
    var router = hash5.Router.getInstance();
    router.initialize(config);
    router.addRoute('search/:searchStr', function(fragment, searchStr){
        var entries = hash5.api.searchEntries('#' + searchStr);
        hash5.api.showEntryCollection(entries);
    }, this);

    var moduleManager = goog.module.ModuleManager.getInstance();
    moduleManager.setLoaded('main-panel');
})();
