goog.provide('hash5.module.calendar.HelperTile');

goog.require('goog.date.Interval');

goog.require('hash5.ui.editor.HelperTile');
goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.forms.Checkbox');
goog.require('hash5.forms.Select');
goog.require('hash5.module.calendar.DatePickerInput');
goog.require('hash5.module.calendar.DateUtils');

/**
 * @param {hash5.module.calendar.Event=} event
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.calendar.HelperTile = function(event)
{
    goog.base(this);

    /**
     * @type {hash5.module.calendar.Event}
     * @private
     */
    this.event_ = event || null;

    if(!event)
    {
        this.event_ = event = new hash5.module.calendar.Event();
        var startDate = new hash5.module.calendar.DateTime(new Date());
        startDate.setHasTime(false);
        event.setStartDate(startDate);

        var endDate = new hash5.module.calendar.DateTime(new Date());
        endDate.setHasTime(false);
        endDate.add(new goog.date.Interval(goog.date.Interval.HOURS, 1));
        event.setEndDate(endDate);
    }

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();
};
goog.inherits(hash5.module.calendar.HelperTile, hash5.ui.editor.HelperTile);

/** @inheritDoc */
hash5.module.calendar.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    goog.dom.classes.add(this.getElement(), 'calendar-tile');

    this.setUpControls_();
    this.decorateFromEvent(this.event_);
    this.addChild(this.form_, true);

    this.getHandler()
        .listen(this.form_, goog.events.EventType.CHANGE, this.handleDateChanges_);
};

/**
 * @private
 */
hash5.module.calendar.HelperTile.prototype.setUpControls_ = function()
{
    this.startDate_ = this.form_.addFormItem('', 'datepicker', {fieldName: 'start'}).getControl();
    this.startTime_ = this.form_.addFormItem('', 'textbox', {fieldName: 'start-time'}).getControl();
    this.endTime_ = this.form_.addFormItem("bis", 'textbox', {fieldName: 'end-time'}).getControl();
    this.endDate_ = this.form_.addFormItem('', 'datepicker', {fieldName: 'end'}).getControl();

    var allDay = this.form_.addFormItem('All day', 'checkbox', {fieldName: 'all-day'});
    this.allDay_ = allDay.getControl();
    allDay.addCssClass('all-day-row');

    var recurrentOptions = [];
    for(var i = 1; i < 30; i++)
    {
        recurrentOptions.push({text: i + ' ', model: i});
    }
    this.rec_ = this.form_.addFormItem('recurrent', 'checkbox', {fieldName: 'recurrent-cb'}).getControl();
    this.recVal_ = this.form_.addFormItem('', 'select', {
        fieldName: 'recurrent',
        options: recurrentOptions
    }).getControl();
    this.recVal_.setSelectedIndex(0);

    this.recUnit_ = this.form_.addFormItem('', 'select', {
        fieldName: 'recurrent-type',
        options: [
            {text: 'daily', model: 'd'},
            {text: 'weekly', model: 'w'},
            {text: 'monthly', model: 'm'},
            {text: 'yearly', model: 'y'}
        ]
    }).getControl();
    this.recUnit_.setSelectedIndex(0);
};

/**
 * @param {hash5.module.calendar.Event} event
 */
hash5.module.calendar.HelperTile.prototype.decorateFromEvent = function(event)
{
    this.event_ = event;

    this.setDate_(this.startDate_, event.getStartDate());
    this.setTime_(this.startTime_, event.getStartDate());
    this.setDate_(this.endDate_, event.getEndDate());
    this.setTime_(this.endTime_, event.getEndDate());

    var hasTime = event.getStartDate().hasTime() || event.getEndDate().hasTime();
    this.allDay_.setValue(!hasTime);

    if(event.getRecurrent())
    {
        var rec = event.getRecurrent();
        this.recUnit_.setValue(rec.unit);
        this.recVal_.setValue(rec.number);
        this.rec_.setValue(true);
    }

    this.enableHelpers_(hasTime, !!event.getRecurrent());
};

/**
 * @param {hash5.forms.IControl} control
 * @param {hash5.module.calendar.DateTime} date
 * @private
 */
hash5.module.calendar.HelperTile.prototype.setDate_ = function(control, date)
{
    var formattedDate = hash5.module.calendar.DateUtils.dateToString(date);
    control.setValue(formattedDate);
};

/**
 * @param {hash5.forms.IControl} control
 * @param {hash5.module.calendar.DateTime} date
 * @private
 */
hash5.module.calendar.HelperTile.prototype.setTime_ = function(control, date)
{
    var formattedDate = hash5.module.calendar.DateUtils.timeToString(date);
    control.setValue(formattedDate);
};

/**
 * handles changes of dates
 *
 * @param  {goog.events.Event} e
 * @private
 */
hash5.module.calendar.HelperTile.prototype.handleDateChanges_ = function(e)
{
    var utils = hash5.module.calendar.DateUtils;
    var startDate, endDate, recurrent;

    // all-day
    var allDay = this.allDay_.getValue() === '1';
    if(allDay)
    {
        startDate = utils.stringToDate(this.startDate_.getValue());
        startDate.setHasTime(false);
        endDate = utils.stringToDate(this.endDate_.getValue());
        endDate.setHasTime(false);
    }
    else
    {
        startDate = utils.stringToDate(this.startDate_.getValue() + ' ' + this.startTime_.getValue()),
        endDate = utils.stringToDate(this.endDate_.getValue() + ' ' + this.endTime_.getValue());
    }
    this.event_.setStartDate(startDate);
    this.event_.setEndDate(endDate);

    // recurrent
    var hasRecurrent = this.rec_.getValue() === '1';
    if(hasRecurrent)
    {
        var unit = this.recUnit_.getValue(),
            number = this.recVal_.getValue();
        recurrent = new hash5.module.calendar.Duration(number, unit);
    }
    this.event_.setRecurrent(recurrent || null);

    // TODO work maybe with events?
    if(!this.getComponent().updateTextForEvent(this.event_))
    {
        // only update helpers if entry text has not changed
        // on change whole tile will be rerendered...
        this.enableHelpers_(!allDay, hasRecurrent);
    }
};

/**
 * handles changes of dates
 *
 * @param  {boolean} times
 * @param  {boolean} recurrent
 * @private
 */
hash5.module.calendar.HelperTile.prototype.enableHelpers_ = function(times, recurrent)
{
    goog.dom.classes.enable(this.form_.getFormItemByName('start-time').getElement(), 'hidden', !times);
    goog.dom.classes.enable(this.form_.getFormItemByName('end-time').getElement(), 'hidden', !times);

    goog.dom.classes.enable(this.form_.getControlByName('recurrent').getElement(), 'hidden', !recurrent);
    goog.dom.classes.enable(this.form_.getControlByName('recurrent-type').getElement(), 'hidden', !recurrent);
};