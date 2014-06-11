goog.provide('hash5.module.CoreModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');
goog.require('hash5.Router');

goog.require('hash5.controller.MainPanelController');
goog.require('hash5.controller.EditorController');
goog.require('hash5.controller.UndoController');
goog.require('hash5.controller.SearchController');


// include ui controls for auto-decation here
goog.require('hash5.ui.UiDecorator');
goog.require('hash5.layout.Header');
goog.require('hash5.ui.PageSidebar');

goog.require('hash5.ui.editor.EntryEditor');

goog.require('goog.module.ModuleManager');
goog.require('hash5.module.RecommondationModule');
goog.require('hash5.module.LinksModule');


/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.CoreModule = function()
{
  goog.base(this);


};
goog.inherits(hash5.module.CoreModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.CoreModule.prototype.initialize = function(context)
{
    var config = context.config;

    hash5.ui.UiDecorator.getInstance().decorateElements();

    hash5.controller.MainPanelController.getInstance().initialize(config);
    hash5.controller.EditorController.getInstance().initialize(config);
    hash5.controller.UndoController.getInstance().initialize(config);
    hash5.controller.SearchController.getInstance().initialize(config);

    // init router
    var router = hash5.Router.getInstance();
    router.initialize(config);
    router.addRoute('search/:searchStr', function(fragment, searchStr){
        var entries = hash5.api.searchEntries('#' + searchStr);
        hash5.api.showEntryCollection(entries, '#' + searchStr);
    }, this);
    router.addRoute('edit/:entryId', function(fragment, entryId){
        var entry = new hash5.model.Entry(entryId);
        hash5.api.editEntry(entry);
    }, this);
    router.addRoute('delete/:entryId', function(fragment, entryId){
        var entry = new hash5.model.Entry(entryId);
        entry.destroy();
    }, this, false);


    // test for first usage
    var userController = hash5.controller.UserController.getInstance();
    if(!userController.getUserSettings('respWebclientInit', false)) {
        var moduleManager = goog.module.ModuleManager.getInstance();
        moduleManager.load(hash5.module.Modules.INTRO);
    }

    hash5.module.setStaticLoaded(hash5.module.Modules.RECOMMEND, hash5.module.RecommondationModule);
    hash5.module.setStaticLoaded(hash5.module.Modules.LINKS, hash5.module.LinksModule);
};

/** @inheritDoc */
hash5.module.CoreModule.prototype.modulesLoaded = function()
{
    //console.log('modules loaded');
};


hash5.module.setLoaded(hash5.module.Modules.CORE, hash5.module.CoreModule);