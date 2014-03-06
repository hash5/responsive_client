goog.provide('hash5.module.links.ImagePreview');

goog.require('goog.ui.Component');

/**
 * @param {string} url
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.module.links.ImagePreview = function(url)
{
    goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.imageUrl_ = url;
};
goog.inherits(hash5.module.links.ImagePreview, goog.ui.Component);
goog.addSingletonGetter(hash5.module.links.ImagePreview);

/** @inheritDoc */
hash5.module.links.ImagePreview.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    var el = domHelper.createDom('div', 'image-preview',
        domHelper.createDom('img', {
            'src': this.imageUrl_
        })
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
 * Handles hover event
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.module.links.ImagePreview.prototype.handleMouseEnter_ = function(e)
{
    var hoverEl = /** @type {Element} */ (e.target);

    goog.style.setPosition(this.getElement(), e.clientX + 10, e.clientY + 10);
    goog.dom.classes.add(this.getElement(), 'visible');
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