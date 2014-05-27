goog.provide('hash5.module.intro.TooltipAction');

goog.require('goog.ui.Component');

/**
 * Tooltip Action Component
 *
 * @param {string} text
 * @param {string} name
 * @param {string=} optCssClass
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.module.intro.TooltipAction = function(text, name, optCssClass)
{
    goog.base(this);

    /**
     * Action text
     *
     * @type {string}
     * @private
     */
    this.text_ = text;

    /**
     * Action name
     *
     * @type {string}
     */
    this.name = name;

    /**
     * optional css class
     *
     * @type {string}
     * @private
     */
    this.optClass_ = optCssClass || '';
};
goog.inherits(hash5.module.intro.TooltipAction, goog.ui.Component);

/** @inheritDoc */
hash5.module.intro.TooltipAction.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    var el = domHelper.createDom('span', 'tooltip-action ' + this.optClass_, this.text_);
    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.module.intro.TooltipAction.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
        this.handleClick_);
};

/**
 * Handles click event
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.module.intro.TooltipAction.prototype.handleClick_ = function(e)
{
    this.dispatchEvent(goog.ui.Component.EventType.ACTION);
};