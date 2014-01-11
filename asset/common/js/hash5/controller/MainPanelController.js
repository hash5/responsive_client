goog.provide('hash5.controller.MainPanelController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.view.ListView');
goog.require('hash5.ui.SearchField');

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
    hash5.api.layout.addActionBarBtn({
        cssClass: 'flaticon-search mobile-only',
        title: goog.getMsg('Suchen'),
        clickCallback: function(){
            hash5.ui.SearchField.getInstance().toggle();
        }
    });
    hash5.api.layout.addActionBarBtn({
        cssClass: 'flaticon-gears',
        title: goog.getMsg('Einstellungen')
    }, [
        {
            cssClass: 'flaticon-task',
            title: goog.getMsg('Einstellungen'),
            clickCallback: function(){
                alert("not implemented");
            }
        },
        {
            cssClass: 'flaticon-user',
            title: goog.getMsg('Logout'),
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