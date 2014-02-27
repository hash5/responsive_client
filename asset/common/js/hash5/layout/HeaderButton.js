goog.provide('hash5.layout.HeaderButton');

goog.require('goog.ui.Component');


/**
 *
 * @param {string} title title for the button
 * @param {string=} cssClass css class for toggle icon. should be used to
 * style button
 * @param {Function=} clickHandler quick add for clickHandler
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.layout.HeaderButton = function(title, cssClass, clickHandler)
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

    if(goog.isFunction(clickHandler))
    {
        this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, clickHandler);
    }
};
goog.inherits(hash5.layout.HeaderButton, goog.ui.Component);

/** @inheritDoc */
hash5.layout.HeaderButton.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    var el = domHelper.createDom('li', this.cssClass_, this.title_);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.layout.HeaderButton.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.layout.HeaderButton.prototype.handleClick_ = function(e)
{
    this.dispatchEvent(goog.ui.Component.EventType.ACTION);
};