goog.provide('hash5.controller.MainPanelController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.view.ListView');
goog.require('hash5.ui.SearchField');
goog.require('hash5.ui.editor.EntryEditor');

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
    this.getHandler().listen(hash5.controller.UserController.getInstance(), hash5.controller.UserController.EventType.LOGIN, this.handleLogin_);
};

/**
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.controller.MainPanelController.prototype.handleLogin_ = function(e)
{
    var pageEl = document.getElementById('page');
    goog.dom.classes.remove(pageEl, 'hidden');

    this.panelEl_ = goog.dom.getElementByClass('main-panel');
    this.renderView(this.listView_);

    // TODO maybe in different routine?
    // ------ main layout initialization -------

    // add default listViews
    var newestEntries = hash5.ds.DataSource.getInstance().newestEntries(); // TODO replace with api call
    var actualEntries = hash5.api.searchEntries('#start=today'); // TODO replace with api call
    this.showEntryCollection(newestEntries, 'Neueste Einträge');
    this.showEntryCollection(actualEntries, 'Tagesplanung');

    // create settingsmenu
    var MSG_SEARCH_TITLE = goog.getMsg('Suchen');
    hash5.api.layout.addActionBarBtn({
        cssClass: 'flaticon-search mobile-only',
        title: MSG_SEARCH_TITLE,
        clickCallback: function(){
            hash5.ui.SearchField.getInstance().toggle();
        }
    });
    var MSG_SETTINGS = goog.getMsg('Einstellungen');
    var MSG_LOGOUT = goog.getMsg('Logout');
    hash5.api.layout.addActionBarBtn({
        cssClass: 'flaticon-gears',
        title: MSG_SETTINGS
    }, [
        {
            cssClass: 'flaticon-task',
            title: MSG_SETTINGS,
            clickCallback: function(){
                alert("not implemented");
            }
        },
        {
            cssClass: 'flaticon-user',
            title: MSG_LOGOUT,
            clickCallback: function(){
                var userController = hash5.controller.UserController.getInstance();

                this.getHandler().listen(userController, hash5.controller.UserController.EventType.UNAUTHORIZED, function(){
                    document.location.reload();
                });

                hash5.controller.UserController.getInstance().logout();
            }
        }
    ]);
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