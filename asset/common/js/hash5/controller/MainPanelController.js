goog.provide('hash5.controller.MainPanelController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.view.ListView');


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
    var pageEl = document.getElementById('page');
    goog.dom.classes.remove(pageEl, 'hidden');

    this.panelEl_ = goog.dom.getElementByClass('main-panel');

    // render default view
    this.renderView(this.listView_);
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
 * removes all current entryLists
 */
hash5.controller.MainPanelController.prototype.clearListPanel = function()
{
    this.listView_.clearListPanel();
};