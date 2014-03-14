goog.provide('hash5.module.links.ImagePreview');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.module.links.ImagePreview = function()
{
    goog.base(this);

    /**
     * @type {Element}
     * @private
     */
    this.imgEl_ = null;
};
goog.inherits(hash5.module.links.ImagePreview, goog.ui.Component);
goog.addSingletonGetter(hash5.module.links.ImagePreview);

/** @inheritDoc */
hash5.module.links.ImagePreview.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    this.imgEl_ = domHelper.createDom('img');
    var el = domHelper.createDom('div', 'image-preview',
        this.imgEl_
    );

    this.decorateInternal(el);
};

/**
 * @param {Element} el
 */
hash5.module.links.ImagePreview.prototype.attachEl = function(el)
{
    this.getHandler()
        .listen(el, goog.events.EventType.MOUSEENTER, this.handleMouseEnter_)
        .listen(el, goog.events.EventType.MOUSELEAVE, this.handleMouseLeave_);
};

/**
 * @param {string} url
 */
hash5.module.links.ImagePreview.prototype.setUrl = function(url)
{
    this.imgEl_.src = url;

    return true;
};

/**
 * Handles hover event
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.module.links.ImagePreview.prototype.handleMouseEnter_ = function(e)
{
    if (!this.isInDocument())
    {
        this.render(document.body);
    }

    var hoverEl = /** @type {Element} */ (e.target);
    var el = this.getElement();

    if(this.setUrl(hoverEl.href))
    {
        goog.style.setPosition(el, e.clientX + 10, e.clientY + 10);
        goog.dom.classes.add(el, 'visible');
    }
};

/**
 * Handles hover event
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.module.links.ImagePreview.prototype.handleMouseLeave_ = function(e)
{
    goog.dom.classes.remove(this.getElement(), 'visible');
};