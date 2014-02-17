goog.provide('hash5.module.CoreModule');

goog.require('hash5.module.BaseModule');

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
    console.log(context);

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
    router.addRoute('edit/:entryId', function(fragment, entryId){
        var entry = new hash5.model.Entry(entryId);
        hash5.api.editEntry(entry);
    }, this);
    router.addRoute('delete/:entryId', function(fragment, entryId){
        var entry = new hash5.model.Entry(entryId);
        entry.destroy();
    }, this, false);
};

hash5.module.setLoaded(hash5.module.Modules.CORE, hash5.module.CoreModule);