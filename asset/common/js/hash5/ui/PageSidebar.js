goog.provide('hash5.ui.PageSidebar');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.ui.Overlay');
goog.require('hash5.ui.st.SearchTree');


/**
 * represents the page sidebar on the left side
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.PageSidebar = function()
{
    goog.base(this);

    /**
     * @type {boolean}
     * @private
     */
    this.isVisible_ = false;

    /**
     * @type {hash5.ui.st.SearchTree}
     * @private
     */
    this.searchTree_ = null;

    /**
     * @type {boolean}
     * @private
     */
    this.isHover_ = false;
};
goog.inherits(hash5.ui.PageSidebar, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.PageSidebar);

/** @inheritDoc */
hash5.ui.PageSidebar.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    /** @desc hint message to drop lists on sidebar */
    var MSG_LIST_DROP_HINT = goog.getMsg('Drop list here to save it to your saved-searches');

    var dom = this.getDomHelper(),
        dropHint = dom.createDom('div', 'drop-hint', [
            dom.createDom('span', undefined, MSG_LIST_DROP_HINT)
            ]);
    goog.dom.appendChild(el, dropHint);
};

/** @inheritDoc */
hash5.ui.PageSidebar.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    // render searchtree
    this.searchTree_ = new hash5.ui.st.SearchTree();
    this.searchTree_.render(document.getElementById('searchtree'));

    this.getHandler().listen(this.searchTree_, goog.ui.Component.EventType.SELECT, this.handleSidebarAction_);
};

/**
 * toggles the sidebar visibility
 */
hash5.ui.PageSidebar.prototype.toggle = function()
{
    this.isVisible_ = !this.isVisible_;

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(this.isVisible_);

    if(this.isVisible_)
    {
        this.getHandler()
            //.listenOnce(this.getElement(), goog.events.EventType.CLICK, this.toggle)
            .listenOnce(overlay, goog.ui.Component.EventType.CLOSE, this.toggle);
    }else{
        this.getHandler()
            //.unlisten(this.getElement(), goog.events.EventType.CLICK, this.toggle)
            .unlisten(overlay, goog.ui.Component.EventType.CLOSE, this.toggle);
    }

    goog.dom.classes.enable(this.getElement(), 'visible', this.isVisible_);
};

/**
 * adds new item to the searchtree
 *
 * @param  {string} search searchPattern
 * @param  {string=} title title for the column
 */
hash5.ui.PageSidebar.prototype.addSearchTreeItem = function(search, title)
{
    this.searchTree_.addSearch(search, title);
};

/**
 * returns searchTree instance
 * @return {hash5.ui.st.SearchTree}
 */
hash5.ui.PageSidebar.prototype.getSearchTree = function()
{
    return this.searchTree_;
};

/**
 * sets hover state for list drag&drop
 * @param {boolean} isHover
 */
hash5.ui.PageSidebar.prototype.setListHover = function(isHover)
{
    if (this.isHover_ != isHover) {
        goog.dom.classes.enable(this.getElement(), 'list-hover', isHover);
        this.isHover_ = isHover;
    }
};


/**
 * handles sidebaractions and hides list on mobile view as result
 * @param {goog.events.Event} e
 */
hash5.ui.PageSidebar.prototype.handleSidebarAction_ = function(e)
{
    if(hash5.App.isMobile) {
        this.toggle();
    }

};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'page-sidebar',
    function() {
      return hash5.ui.PageSidebar.getInstance();
    }
);
