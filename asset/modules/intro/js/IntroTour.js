goog.provide('hash5.module.intro.IntroTour');

goog.require('goog.events.EventHandler');

goog.require('hash5.module.intro.Tooltip');
goog.require('hash5.module.intro.TooltipAction');
goog.require('hash5.module.intro.initData');
goog.require('goog.Timer');

/**
 * IntroTour
 *
 * @constructor
 * @extends {goog.Disposable}
 */
hash5.module.intro.IntroTour = function()
{
    goog.base(this);

    /**
     * @type {hash5.module.intro.Tooltip}
     * @private
     */
    this.tooltip_ = hash5.module.intro.Tooltip.getInstance();
    if(!this.tooltip_.isInDocument()) {
        this.tooltip_.render(document.body);
    }

    /**
     * @type {Array.<Object>}
     * @private
     */
    this.introTour_ = hash5.module.intro.initData['intro-tour'];

    /**
     * @type {number}
     * @private
     */
    this.index_ = 0;

    /**
     * @type {Array.<hash5.module.intro.TooltipAction>}
     * @private
     */
    this.actions_ = [
        new hash5.module.intro.TooltipAction('next', 'next-tip'),
        new hash5.module.intro.TooltipAction('cancel', 'cancel-tour', 'close')
    ];

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = new goog.events.EventHandler(this);
    this.registerDisposable(this.handler_);
};
goog.inherits(hash5.module.intro.IntroTour, goog.Disposable);

/**
 * starts intro tour
 */
hash5.module.intro.IntroTour.prototype.start = function()
{
    this.handler_.listen(this.tooltip_, goog.ui.Component.EventType.ACTION, this.handleTooltipAction_);

    this.showNextTip();
    this.tooltip_.setVisible(true);
};

/**
 * handles tooltip action
 * @param {goog.events.Event} e
 */
hash5.module.intro.IntroTour.prototype.handleTooltipAction_ = function(e)
{
    var targetAction = /** @type {hash5.module.intro.TooltipAction} */ (e.target);

    switch(targetAction.name) {
        case 'next-tip':
            this.showNextTip();
            break;
        case 'cancel-tour':
            this.cancelTour();
            break;
    }
};


/**
 * shows next tooltip
 */
hash5.module.intro.IntroTour.prototype.showNextTip = function()
{
    var config = this.introTour_[this.index_++];

    if(!config) {
        this.cancelTour();
        return;
    }

    this.tooltip_.setDirection(config.direction);
    this.tooltip_.positionateToElement(config.selector);
    this.tooltip_.setBody(config.body);

    if(config.waitForClick) {
        var targetEl = document.body.querySelector(config.selector);
        this.handler_.listen(targetEl, goog.events.EventType.CLICK, this.showNextTipDelayed);

        this.tooltip_.setActions([this.actions_[1]]);
    } else {
        this.tooltip_.setActions(this.actions_);
    }
};

/**
 * shows next tooltip with little delay to let other code prepare ui
 */
hash5.module.intro.IntroTour.prototype.showNextTipDelayed = function()
{
    goog.Timer.callOnce(this.showNextTip, 100, this);
};

/**
 * cancels tour
 */
hash5.module.intro.IntroTour.prototype.cancelTour = function()
{
    this.tooltip_.setVisible(false);
    this.dispose();
};