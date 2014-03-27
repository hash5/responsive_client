goog.provide('hash5.ui.Overlay');

goog.require('goog.ui.Component');

/**
 * Overlay component
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.Overlay = function()
{
    goog.base(this);
};
goog.inherits(hash5.ui.Overlay, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.Overlay);

/** @inheritDoc */
hash5.ui.Overlay.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    var el = domHelper.createDom('div', 'overlay');

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.Overlay.prototype.enterDocument = function()
{
    this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_);
};

/**
 * Handles click events
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.ui.Overlay.prototype.handleClick_ = function(e)
{
    this.dispatchEvent(goog.ui.Component.EventType.CLOSE);
    this.setVisible(false);
};

/**
 * Controls overlay visibility
 *
 * @param {boolean} isVisible
 * @param {hash5.ui.Overlay.Level=} level
 */
hash5.ui.Overlay.prototype.setVisible = function(isVisible, level)
{
    if (!this.isInDocument())
    {
        this.render(document.body);
    }

    var foregroundClass = hash5.ui.Overlay.Level.FOREGROUND,
        isForeground = (level === foregroundClass);

    goog.dom.classes.enable(this.getElement(), foregroundClass, isForeground);
    goog.dom.classes.enable(this.getElement(), 'visible', isVisible);
    goog.dom.classes.enable(document.body, 'body-overlay', isVisible);
};

/**
 * different z-index leves
 *
 * @enum {string}
 */
hash5.ui.Overlay.Level = {
    BASE: 'base-level', // sidebar and header are still visilbe
    FOREGROUND: 'foreground-level' // everything is hidden
};