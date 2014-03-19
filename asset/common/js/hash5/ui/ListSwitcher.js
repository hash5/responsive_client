goog.provide('hash5.ui.ListSwitcher');

goog.require('goog.ui.Component');

goog.require('hash5.templates.ListView');

/**
 * @param {hash5.view.ListView} listView
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.ListSwitcher = function(listView)
{
    goog.base(this);

    /**
     * @type {hash5.view.ListView}
     * @private
     */
    this.listView_ = listView;

    /**
     * @type {number}
     * @private
     */
    this.lastScrollPos_ = 0;

    /**
     * @type {number}
     * @private
     */
    this.curIndex_ = 0;
};
goog.inherits(hash5.ui.ListSwitcher, goog.ui.Component);

/**
 * @override
 * @return {hash5.model.Entry}
 */
hash5.ui.ListSwitcher.prototype.getModel;

/** @inheritDoc */
hash5.ui.ListSwitcher.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.ListView.switcher);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.ListSwitcher.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_)
        .listen(this.listView_, goog.events.EventType.SCROLL, this.handleScroll_)
        .listen(this.listView_, hash5.view.ListView.EventType.LIST_ADDED, this.handleListChanged_)
        .listen(this.listView_, hash5.view.ListView.EventType.LIST_REMOVED, this.handleListChanged_);

    this.toggleBtns_();
};

/**
 * @param {boolean} visible
 */
hash5.ui.ListSwitcher.prototype.setVisible = function(visible)
{
    goog.dom.classes.enable(this.getElement(), 'hidden', !visible);
};


/**
 * @param  {goog.events.Event} e
 */
hash5.ui.ListSwitcher.prototype.handleScroll_ = function(e)
{
    var newScrollPos = e.target.scrollTop;

    this.setVisible(newScrollPos < this.lastScrollPos_);

    this.lastScrollPos_ = newScrollPos;
};


/**
 * @param  {goog.events.Event} e
 */
hash5.ui.ListSwitcher.prototype.handleListChanged_ = function(e)
{
    var maxIndex = this.listView_.getChildCount() - 1;

    if(maxIndex < this.curIndex_)
    {
        this.curIndex_ = maxIndex;
    }

    this.toggleBtns_();
};

/**
 * @param  {goog.events.Event} e
 */
hash5.ui.ListSwitcher.prototype.handleClick_ = function(e)
{
    var target = /** @type {Element} */ (e.target);

    if(goog.dom.classes.has(target, 'hidden'))
    {
        return;
    }

    if(goog.dom.classes.has(target, 'left-btn'))
    {
        this.curIndex_--;
    } else if(goog.dom.classes.has(target, 'right-btn'))
    {
        this.curIndex_++;
    }

    this.listView_.mobileShowList(this.curIndex_);

    this.toggleBtns_();
};

/**
 * @private
 */
hash5.ui.ListSwitcher.prototype.toggleBtns_ = function()
{
    goog.dom.classes.enable(this.getElementByClass('left-btn'), 'hidden', this.curIndex_ <= 0);

    var maxIndex = this.listView_.getChildCount() - 1;
    goog.dom.classes.enable(this.getElementByClass('right-btn'), 'hidden', this.curIndex_ >= maxIndex);
};