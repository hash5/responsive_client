goog.provide('hash5.module.calendar.HelperTile');

goog.require('goog.date.DateTime');
goog.require('goog.date.Interval');

goog.require('hash5.ui.editor.HelperTile');
goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.forms.Checkbox');
goog.require('hash5.forms.Select');
goog.require('hash5.module.calendar.DatePickerInput');
goog.require('hash5.modules.calendar.templates');

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
        event.setStartDate(new goog.date.DateTime());

        var endDate = new goog.date.DateTime();
        endDate.add(new goog.date.Interval(goog.date.Interval.HOURS, 1));
        event.setEndDate(endDate);
    }

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    // TODO annotations
    this.dateFormatter_ = new goog.i18n.DateTimeFormat('d.M.y'); // TODO localize..., use global..
    this.timeFormatter_ = new goog.i18n.DateTimeFormat('H:m');
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

    this.enableHelpers_(false, false);
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
    allDay.getControl().setValue(true);
    allDay.addCssClass('all-day-row');

    var repeatOptions = [];
    for(var i = 1; i < 30; i++)
    {
        repeatOptions.push({text: i + ' ', model: i});
    }
    this.form_.addFormItem('Repeat', 'checkbox', {fieldName: 'repeat-cb'});
    this.form_.addFormItem('', 'select', {
        fieldName: 'repeat',
        options: repeatOptions
    }).getControl().setSelectedIndex(0);
    this.form_.addFormItem('', 'select', {
        fieldName: 'repeat-type',
        options: [
            {text: 'daily', model: 'd'},
            {text: 'weekly', model: 'w'},
            {text: 'monthly', model: 'm'},
            {text: 'yearly', model: 'y'}
        ]
    }).getControl().setSelectedIndex(0);
};

/**
 * @param {hash5.module.calendar.Event} event
 */
hash5.module.calendar.HelperTile.prototype.decorateFromEvent = function(event)
{
    this.event_ = event;

    // TODO check if times are set
    this.setDate_(this.startDate_, event.getStartDate());
    this.setTime_(this.startTime_, event.getStartDate());
    this.setDate_(this.endDate_, event.getEndDate());
    this.setTime_(this.endTime_, event.getEndDate());

    // TODO recurrent
};

/**
 * @param {hash5.forms.IControl} control
 * @param {goog.date.DateTime} date
 * @private
 */
hash5.module.calendar.HelperTile.prototype.setDate_ = function(control, date)
{
    var formattedDate = this.dateFormatter_.format(date);
    control.setValue(formattedDate);
};

/**
 * @param {hash5.forms.IControl} control
 * @param {goog.date.DateTime} date
 * @private
 */
hash5.module.calendar.HelperTile.prototype.setTime_ = function(control, date)
{
    var formattedDate = this.timeFormatter_.format(date);
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
    var data = this.form_.getData();
    console.log(data);

    // all-day
    var allDay = data['all-day'] === '1';
    if(allDay)
    {
        console.log("todo");
    }


    // repeat
    var repeat = data['repeat-cb'] === '1';
    if(repeat)
    {
        console.log("todo");
    }

    this.enableHelpers_(!allDay, repeat);
};

/**
 * handles changes of dates
 *
 * @param  {boolean} times
 * @param  {boolean} repeat
 * @private
 */
hash5.module.calendar.HelperTile.prototype.enableHelpers_ = function(times, repeat)
{
    goog.dom.classes.enable(this.form_.getFormItemByName('start-time').getElement(), 'hidden', !times);
    goog.dom.classes.enable(this.form_.getFormItemByName('end-time').getElement(), 'hidden', !times);

    goog.dom.classes.enable(this.form_.getControlByName('repeat').getElement(), 'hidden', !repeat);
    goog.dom.classes.enable(this.form_.getControlByName('repeat-type').getElement(), 'hidden', !repeat);
};