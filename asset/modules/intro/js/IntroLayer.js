goog.provide('hash5.module.intro.IntroLayer');

goog.require('goog.ui.Component');

goog.require('hash5.module.intro.Template');
goog.require('hash5.module.intro.IntroTour');
goog.require('hash5.ui.Overlay');

/**
 * IntroLayer
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.module.intro.IntroLayer = function()
{
    goog.base(this);

};
goog.inherits(hash5.module.intro.IntroLayer, goog.ui.Component);

/** @inheritDoc */
hash5.module.intro.IntroLayer.prototype.createDom = function()
{
  var el = soy.renderAsFragment(hash5.module.intro.Template.introLayer);
  this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.module.intro.IntroLayer.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(true, hash5.ui.Overlay.Level.FOREGROUND);

    this.getHandler()
        .listen(this.getElementByClass('btn-start'), goog.events.EventType.CLICK, this.handleStartTour_)
        .listen(this.getElementByClass('close'), goog.events.EventType.CLICK, this.close)
        .listen(this.getElementByClass('btn-cancel'), goog.events.EventType.CLICK, this.close)
        .listen(overlay, goog.ui.Component.EventType.CLOSE, this.close)
};

/**
 * starts intro tour
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.module.intro.IntroLayer.prototype.handleStartTour_ = function(e)
{
    var introTour = new hash5.module.intro.IntroTour();
    introTour.start();

    this.close();
};

hash5.module.intro.IntroLayer.prototype.close = function()
{
    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(false);

    this.dispose();
};