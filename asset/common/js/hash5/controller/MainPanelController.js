goog.provide('hash5.controller.MainPanelController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.view.ListView');
goog.require('hash5.ui.SearchField');
goog.require('hash5.ui.editor.EntryEditor');
goog.require('hash5.ui.Settings');

goog.require('hash5.ui.SearchTree');

/**
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.MainPanelController = function()
{
    goog.base(this);

    /**
     * @type {Array.<hash5.view.BaseView>}
     * @private
     */
    this.views_ = [];

    /**
     * @type {hash5.view.ListView}
     * @private
     */
    this.listView_ = new hash5.view.ListView();

    /**
     * @type {Element}
     * @private
     */
    this.panelEl_ = null;

    /**
     * @type {hash5.ui.editor.EntryEditor}
     * @private
     */
    this.entryEditor_ = null;
};
goog.inherits(hash5.controller.MainPanelController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.MainPanelController);

/**
 * @param  {Object} config
 */
hash5.controller.MainPanelController.prototype.initialize = function(config)
{
    var pageEl = document.getElementById('page');
    goog.dom.classes.remove(pageEl, 'hidden');

    this.panelEl_ = goog.dom.getElementByClass('main-panel');
    this.renderView(this.listView_);

    // TODO maybe in different routine?
    // ------ main layout initialization -------

    // add default listViews
    var newestEntries = hash5.ds.DataSource.getInstance().newestEntries(); // TODO replace with api call
    var actualEntries = hash5.api.searchEntries('#start=today');
    /** @desc newest entry list heading */
    var MSG_NEWEST_HEADING = goog.getMsg('Neueste Einträge');
    this.showEntryCollection(newestEntries, MSG_NEWEST_HEADING);
    /** @desc day planing entry list heading */
    var MSG_DAY_HEADING = goog.getMsg('Tagesplanung');
    this.showEntryCollection(actualEntries, MSG_DAY_HEADING);

    // create settingsmenu
    /** @desc search title */
    var MSG_SEARCH_TITLE = goog.getMsg('Suchen');
    hash5.api.layout.addActionBarBtn({
        cssClass: 'icon-search mobile-only',
        title: MSG_SEARCH_TITLE,
        clickCallback: function(){
            hash5.ui.SearchField.getInstance().toggle();
        }
    });
    /** @desc settings btn title */
    var MSG_SETTINGS = goog.getMsg('Einstellungen');
    /** @desc logout btn title */
    var MSG_LOGOUT = goog.getMsg('Logout');
    hash5.api.layout.addActionBarBtn({
        cssClass: 'icon-gears',
        title: MSG_SETTINGS
    }, [
        {
            cssClass: 'icon-gears',
            title: MSG_SETTINGS,
            clickCallback: function(){
                var settingsUi = new hash5.ui.Settings();
                settingsUi.render(document.body);
            }
        },
        {
            cssClass: 'icon-user',
            title: MSG_LOGOUT,
            clickCallback: function(){
                var userController = hash5.controller.UserController.getInstance();

                this.getHandler().listen(userController, hash5.controller.UserController.EventType.UNAUTHORIZED, function(){
                    document.location.reload();
                });

                userController.logout();
            }
        }
    ]);


    // render searchtree
    var searchTree = new hash5.ui.SearchTree();
    searchTree.render(document.getElementById('searchtree'));
};


/**
 * @param  {hash5.view.BaseView} view
 */
hash5.controller.MainPanelController.prototype.renderView = function(view)
{
    view.render(this.panelEl_);
    this.views_.push(view);
};


/**
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 */
hash5.controller.MainPanelController.prototype.showEntryCollection = function(collection, title)
{
    this.listView_.addEntryCollection(collection, title);
};


/**
 * @param  {hash5.model.Entry} entry
 * @return {hash5.ui.editor.EntryEditor}
 */
hash5.controller.MainPanelController.prototype.createEntryEditor = function(entry)
{
    if(this.entryEditor_)
    {
        // TODO test if there are unsaved actions
        // or provide tab-view
        this.entryEditor_.dispose();
    }

    this.entryEditor_ = new hash5.ui.editor.EntryEditor(entry);
    this.entryEditor_.render(this.panelEl_);

    return this.entryEditor_;
};