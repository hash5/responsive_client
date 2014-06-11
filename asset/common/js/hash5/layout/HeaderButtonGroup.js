goog.provide('hash5.layout.HeaderButtonGroup');

goog.require('goog.ui.Component');


/**
 *
 * @param {string} title title for the button
 * @param {string=} cssClass css class for toggle icon. should be used to
 * style button
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.layout.HeaderButtonGroup = function(title, cssClass)
{
    goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.title_ = title;

    /**
     * @type {string}
     * @private
     */
    this.cssClass_ = cssClass || '';

    /**
     * @type {Element}
     * @private
     */
    this.subButtonWrapper_ = null;

    /**
     * @type {boolean}
     * @private
     */
    this.isVisible_ = false;

};
goog.inherits(hash5.layout.HeaderButtonGroup, goog.ui.Component);


/** @inheritDoc */
hash5.layout.HeaderButtonGroup.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    this.subButtonWrapper_ = domHelper.createDom('ul');
    var el = domHelper.createDom('div', 'action-item', [
        domHelper.createDom('div', {'class': 'toggle-icon ' +  this.cssClass_, 'title': this.title_}),
        this.subButtonWrapper_
    ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.layout.HeaderButtonGroup.prototype.getContentElement = function()
{
    return this.subButtonWrapper_;
};

/** @inheritDoc */
hash5.layout.HeaderButtonGroup.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_);
};

/**
 * adds a new button to group
 *
 * @param  {hash5.layout.HeaderButton} button
 */
hash5.layout.HeaderButtonGroup.prototype.addButton = function(button)
{
    this.addChild(button, true);
};

/**
 * handles click on an action item
 * this should emulate hover expansion on touch devices
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.layout.HeaderButtonGroup.prototype.handleClick_ = function(e)
{
    var clickedEl = /** @type {Element} */ (e.target);

    if(this.hasChildren()) {
        this.isVisible_ = !this.isVisible_ && goog.dom.classes.has(clickedEl, 'toggle-icon');
        goog.dom.classes.enable(this.getElement(), 'visible', this.isVisible_);

        if(this.isVisible_) {
            this.getHandler().listenOnce(document.body, goog.events.EventType.CLICK, this.handleDocumentClick_, true);
        } else {
            this.getHandler().unlisten(document.body, goog.events.EventType.CLICK, this.handleDocumentClick_, true);
        }
    } else {
        this.dispatchEvent(goog.ui.Component.EventType.ACTION);
    }
};

/**
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.layout.HeaderButtonGroup.prototype.handleDocumentClick_ = function(e)
{
    goog.dom.classes.remove(this.getElement(), 'visible');
};