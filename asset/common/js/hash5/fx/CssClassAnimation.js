goog.provide('hash5.fx.CssClassAnimation');
goog.provide('hash5.fx.CssClassAnimation.Animations');

/**
 * simple cssClass Animation helper
 * after calling start, the given cssClass will be added and after
 * transition end is fired, class will be removed
 *
 * @param {Element} element
 * @param {string} cssClass
 * @constructor
 */
hash5.fx.CssClassAnimation = function(element, cssClass)
{
    /**
     * @type {Element}
     * @private
     */
    this.element_ = element;

    /**
     * @type {string}
     * @private
     */
    this.cssClass_ = cssClass;
};

/**
 * starts the animation
 */
hash5.fx.CssClassAnimation.prototype.play = function()
{
    goog.events.listenOnce(
        this.element_,
        [goog.events.EventType.TRANSITIONEND, goog.events.EventType.ANIMATIONEND],
        this.handleTransitionEnd, false, this
    );

    goog.dom.classes.add(this.element_, this.cssClass_);
};

/**
 * @private
 * @param {goog.events.BrowserEvent} e
 */
hash5.fx.CssClassAnimation.prototype.handleTransitionEnd = function(e)
{
    goog.dom.classes.remove(this.element_, this.cssClass_);
};


/**
 * predefined animation classes
 *
 * @enum {string}
 */
hash5.fx.CssClassAnimation.Animations = {
    FOCUS: 'focus-anim',
    INSERT: 'insert-anim'
};