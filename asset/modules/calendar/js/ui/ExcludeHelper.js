goog.provide('hash5.module.calendar.ui.ExcludeHelper');


/**
 * @param {hash5.module.calendar.Event} event
 * @param {number=} excludeIndex
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.module.calendar.ui.ExcludeHelper = function(event, excludeIndex)
{
    goog.base(this);

    /**
     * @type {hash5.module.calendar.Event}
     * @private
     */
    this.event_ = event;

    /**
     * @type {hash5.module.calendar.DateTime}
     * @private
     */
    this.excludedDate_;
    if(excludeIndex) {
        this.excludedDate_ = event.getExcluded()[excludeIndex];
    } else {
        this.excludeDate_ = new hash5.module.calendar.DateTime();
    }

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();
};
goog.inherits(hash5.module.calendar.ui.ExcludeHelper, goog.ui.Component);

/** @inheritDoc */
hash5.module.calendar.ui.ExcludeHelper.prototype.createDom = function()
{
    var domHelper = this.getDomHelper(),
        el = domHelper.createDom('div', 'exclude-date', [
                domHelper.createDom('div', {'class': 'remove-btn', 'data-tooltip': 'remove'})
            ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.module.calendar.ui.ExcludeHelper.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.datePicker_ = this.form_.addFormItem('Exclude Date', 'datepicker', {fieldName: 'excl-date'}).getControl();

    this.addChild(this.form_, true);

    this.getHandler().listen(this.getElementByClass('remove-btn'), goog.events.EventType.CLICK, this.handleRemoveBtnClick_)
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.module.calendar.ui.ExcludeHelper.prototype.handleRemoveBtnClick_ = function(e)
{
};