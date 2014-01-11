goog.provide('hash5.ui.PageHeader');
goog.provide('hash5.ui.PageHeader.ActionBarButton');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.ui.PageSidebar');


/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.PageHeader = function()
{
    goog.base(this);

    /**
     * @type {Element}
     * @private
     */
    this.actionBar_ = null;
};
goog.inherits(hash5.ui.PageHeader, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.PageHeader);


/** @inheritDoc */
hash5.ui.PageHeader.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.actionBar_ = this.getElementByClass('header-right-bar');
};

/** @inheritDoc */
hash5.ui.PageHeader.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var sideBarToggleBtn = this.getElementByClass('sidebar-toggle-btn');
    this.getHandler()
        .listen(sideBarToggleBtn, goog.events.EventType.CLICK, this.handleToggleSidebar_);
};

/**
 * adds a new action button to the header bar
 *
 * @param  {hash5.ui.PageHeader.ActionBarButton} button
 * @param  {Array.<hash5.ui.PageHeader.ActionBarButton>=} subButtons
 */
hash5.ui.PageHeader.prototype.addActionBarBtn = function(button, subButtons)
{
    var dom = this.getDomHelper();

    var subButtonEls = [];
    if(subButtons)
    {
        goog.array.forEach(subButtons, function(subButton){
            var subButtonEl = dom.createDom('li', subButton.cssClass, subButton.title);
            this.getHandler().listen(subButtonEl, goog.events.EventType.CLICK, subButton.clickCallback);
            subButtonEls.push(subButtonEl);
        }, this);
    }

    var actionEl = dom.createDom('div', 'action-item', [
        dom.createDom('div', 'toggle-icon ' +  button.cssClass),
        dom.createDom('ul', undefined, subButtonEls)
    ]);

    if(subButtons)
    {
        this.getHandler().listen(actionEl, goog.events.EventType.CLICK, this.handleActionElClick_);
    }
    else
    {
        this.getHandler().listen(actionEl, goog.events.EventType.CLICK, button.clickCallback);
    }

    goog.dom.appendChild(this.actionBar_, actionEl);
};

/** @typedef {{title: string, cssClass: string, clickCallback: (Function|undefined)}} */
hash5.ui.PageHeader.ActionBarButton;

/**
 * handles click on an action item
 * this should emulate hover expansion on touch devices
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.PageHeader.prototype.handleActionElClick_ = function(e)
{
    var clickedEl = /** @type {Element} */ (e.target);
    var actionWrapper = goog.dom.getAncestorByClass(clickedEl, 'action-item');

    if(goog.dom.classes.has(clickedEl, 'toggle-icon'))
    {
        goog.dom.classes.toggle(actionWrapper, 'visible');
    }
    else
    {
        goog.dom.classes.remove(actionWrapper, 'visible');
    }
};

/**
 * handle sidbar toggle btn click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.PageHeader.prototype.handleToggleSidebar_ = function(e)
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
      return hash5.ui.PageHeader.getInstance();
    }
);