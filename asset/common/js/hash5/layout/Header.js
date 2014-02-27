goog.provide('hash5.layout.Header');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.ui.PageSidebar');
goog.require('hash5.layout.HeaderButtonGroup');
goog.require('hash5.layout.HeaderButton');


/**
 * this class represents the page header
 * custom buttons can be added on the right hand side
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.layout.Header = function()
{
    goog.base(this);
};
goog.inherits(hash5.layout.Header, goog.ui.Component);
goog.addSingletonGetter(hash5.layout.Header);

/** @inheritDoc */
hash5.layout.Header.prototype.getContentElement = function()
{
    return this.getElementByClass('header-right-bar');
};

/** @inheritDoc */
hash5.layout.Header.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var sideBarToggleBtn = this.getElementByClass('sidebar-toggle-btn');
    this.getHandler()
        .listen(sideBarToggleBtn, goog.events.EventType.CLICK, this.handleToggleSidebar_);

    this.initDefaultButtons();
};
/**
 * initializes default buttons
 */
hash5.layout.Header.prototype.initDefaultButtons = function()
{

    // ------- search -------
    /** @desc search title */
    var MSG_SEARCH_TITLE = goog.getMsg('Search');
    var searchGroup = new hash5.layout.HeaderButtonGroup(MSG_SEARCH_TITLE, 'icon-search mobile-only');
    this.getHandler().listen(searchGroup, goog.ui.Component.EventType.ACTION, function(){
        hash5.ui.SearchField.getInstance().toggle();
    });
    this.addButtonGroup(searchGroup);

    // ------- settings -------
    /** @desc settings btn title */
    var MSG_SETTINGS = goog.getMsg('Settings');
    var settingsGroup = new hash5.layout.HeaderButtonGroup(MSG_SETTINGS, 'icon-gears');
    settingsGroup.addButton(new hash5.layout.HeaderButton(MSG_SETTINGS, 'icon-gears', function(){
        var settingsUi = new hash5.ui.Settings();
        settingsUi.render(document.body);
    }));
    /** @desc logout btn title */
    var MSG_LOGOUT = goog.getMsg('Logout');
    settingsGroup.addButton(new hash5.layout.HeaderButton(MSG_LOGOUT, 'icon-user', function(){
        var userController = hash5.controller.UserController.getInstance();
        userController.logout();
    }));
    this.addButtonGroup(settingsGroup);
};

/**
 * adds new buttonGroup to header
 *
 * @param  {hash5.layout.HeaderButtonGroup} buttonGroup
 */
hash5.layout.Header.prototype.addButtonGroup = function(buttonGroup)
{
    this.addChild(buttonGroup, true);
};

/**
 * handle sidbar toggle btn click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.layout.Header.prototype.handleToggleSidebar_ = function(e)
{
    var sidebar = hash5.ui.PageSidebar.getInstance();
    sidebar.toggle();
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'page-header',
    function() {
      return hash5.layout.Header.getInstance();
    }
);