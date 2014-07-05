goog.provide('hash5.module.calendar.ui.HelperTile');

goog.require('goog.date.Interval');

goog.require('hash5.ui.editor.HelperTile');
goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.forms.Checkbox');
goog.require('hash5.forms.Select');
goog.require('hash5.module.calendar.ui.DatePickerInput');
goog.require('hash5.module.calendar.ui.TimeInput');
goog.require('hash5.module.calendar.DateUtils');
goog.require('hash5.module.calendar.ui.ExcludeHelper');
goog.require('hash5.module.calendar.Templates');

/**
 * @param {hash5.module.calendar.Event=} event
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.calendar.ui.HelperTile = function(event)
{
    goog.base(this);

    /**
     * @type {hash5.module.calendar.Event}
     * @private
     */
    this.event_ = event || new hash5.module.calendar.Event();
    this.event_.setParentEventTarget(this);

    /**
     * true indicates that this helperTile
     * should create a new event
     * @type {boolean}
     * @private
     */
    this.newEvent_ = !event;

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();
};
goog.inherits(hash5.module.calendar.ui.HelperTile, hash5.ui.editor.HelperTile);

/** @inheritDoc */
hash5.module.calendar.ui.HelperTile.prototype.createDom = function()
{
    goog.base(this, 'createDom');

    var el = goog.soy.renderAsFragment(hash5.module.calendar.Templates.wrapper);
    this.getContentElement().appendChild(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.module.calendar.ui.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');
    goog.dom.classes.add(this.getElement(), 'calendar-tile');

    this.decorateFormItems_();
    this.decorateFromEvent();

    this.getHandler()
        .listen(this.form_, goog.events.EventType.CHANGE, this.handleFormChanges_)
        .listen(this.getElementByClass('add-exclude-btn'), goog.events.EventType.CLICK, this.handleAddExcludeClick_);
};

/**
 * decorates form from html and adds selection values
 * @private
 */
hash5.module.calendar.ui.HelperTile.prototype.decorateFormItems_ = function()
{
    this.form_.decorate(this.getElementByClass('calendar-form'));

    this.startDate_ = this.form_.getControlByName('start');
    this.startTime_ = this.form_.getControlByName('start-time');
    this.endTime_ = this.form_.getControlByName('end-time');
    this.endDate_ = this.form_.getControlByName('end');
    this.allDay_ = this.form_.getControlByName('all-day');
    this.rec_ = this.form_.getControlByName('recurrent-cb');
    this.recUnit_ = /** @type {hash5.forms.Select} */ (this.form_.getControlByName('recurrent-type'));
    this.recVal_ = /** @type {hash5.forms.Select} */ (this.form_.getControlByName('recurrent'));
    this.recend_ = this.form_.getControlByName('recend');

    // set values for recUnits (not possible with decoration):
    var recUnitMenu = this.recUnit_.getMenu(),
        recUnits = ['d', 'w', 'm', 'y'];
    for(var i = 0; i < recUnitMenu.getChildCount(); i++) {
        recUnitMenu.getChildAt(i).setValue(recUnits[i]);
    }

    var recurrentOptions = [];
    for(var i = 1; i < 30; i++) {
        recurrentOptions.push({text: i + ' ', model: i});
    }
    this.recVal_.addOptions(recurrentOptions);
    this.recVal_.setSelectedIndex(0);

};

/**
 * sets input-values from event
 */
hash5.module.calendar.ui.HelperTile.prototype.decorateFromEvent = function()
{
    var event = this.event_;

    if(this.newEvent_) {
        // generate new event with current times
        var startDate = new hash5.module.calendar.DateTime(new Date());
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);

        // round to next half hour
        if(startDate.getMinutes() > 30) {
            startDate.setHours(startDate.getHours() + 1);
            startDate.setMinutes(0);
        } else {
            startDate.setMinutes(30);
        }
        startDate.setHasTime(true);
        event.setStartDate(startDate, undefined, true);

        var endDate = startDate.clone();
        endDate.setHasTime(true);
        endDate.add(new goog.date.Interval(goog.date.Interval.HOURS, 1));
        event.setEndDate(endDate, undefined, true);

        event.dispatchUpdateEvent();

        this.newEvent_ = false;
    }

    this.setDate_(this.startDate_, event.getStartDate());
    this.setTime_(this.startTime_, event.getStartDate());
    this.setDate_(this.endDate_, event.getEndDate());
    this.setTime_(this.endTime_, event.getEndDate());
    this.setDate_(this.recend_, event.getRecend());

    var hasTime = event.hasTime();
    this.allDay_.setValue(!hasTime);

    if(event.getRecurrent()) {
        var rec = event.getRecurrent();
        this.recUnit_.setValue(rec.unit);
        this.recVal_.setValue(rec.number);
        this.rec_.setValue(true);
    }


    // render exclude dates
    if(event.getRecurrent()) {
        for(var i = 0; i < event.getExcluded().length; i++) {
            var excludeDateHelper = new hash5.module.calendar.ui.ExcludeHelper(this.event_, i);
            this.addChild(excludeDateHelper, true);
        }
    }

    this.enableRecHelpers_(!!event.getRecurrent());
    this.enableTimesHelpers_(hasTime);
};

/**
 * sets formatted date for input
 *
 * @param {hash5.forms.IControl} control
 * @param {hash5.module.calendar.DateTime} date
 * @private
 */
hash5.module.calendar.ui.HelperTile.prototype.setDate_ = function(control, date)
{
    if(date) {
        var formattedDate = hash5.module.calendar.DateUtils.dateToString(date);
        control.setValue(formattedDate);
    } else {
        control.setValue('');
    }
};

/**
 * sets formatted time for input
 *
 * @param {hash5.forms.IControl} control
 * @param {hash5.module.calendar.DateTime} date
 * @private
 */
hash5.module.calendar.ui.HelperTile.prototype.setTime_ = function(control, date)
{
    var formattedDate = hash5.module.calendar.DateUtils.timeToString(date);
    control.setValue(formattedDate);
};

/**
 * handles changes of form
 *
 * @param  {goog.events.Event} e
 * @private
 */
hash5.module.calendar.ui.HelperTile.prototype.handleFormChanges_ = function(e)
{
    var control = /** @type {hash5.forms.IControl} */ (e.target),
        fieldName = control.getFieldName(),
        event = this.event_;

    var utils = hash5.module.calendar.DateUtils;

    var allDay = this.allDay_.getValue() === '1',
        time = '';

    switch(fieldName){
        case 'start':
        case 'start-time':
            if(!allDay){
                time = ' ' + this.startTime_.getValue()
            }
            var startDate = utils.stringToDate(this.startDate_.getValue() + time);
            if(startDate != null) {
               this.event_.setStartDate(startDate);   
            }
            //this.checkValidDates(fieldName);
            break;
        case 'end':
        case 'end-time':
            if (!allDay) {
                time = ' ' + this.endTime_.getValue()
            }
            var endDate = utils.stringToDate(this.endDate_.getValue() + time);
            this.event_.setEndDate(endDate);
            //this.checkValidDates(fieldName);
            break;

        case 'all-day':
            this.enableTimesHelpers_(!allDay);
            event.setHasTime(!allDay);
            break;
        case 'recurrent-cb':
            var hasRecurrent = this.rec_.getValue() === '1';
            this.enableRecHelpers_(hasRecurrent);

            if(!hasRecurrent)
            {
                this.event_.setRecurrent(null);
                break;
            }

            // be carefull - breakthrough!!
        case 'recurrent':
        case 'recurrent-type':
            var unit = this.recUnit_.getValue(),
                number = this.recVal_.getValue(),
                recurrent = new hash5.module.calendar.Duration(number, unit);
            this.event_.setRecurrent(recurrent);
            break;
        case 'recend':
            var recend = utils.stringToDate(this.recend_.getValue());
            this.event_.setRecend(recend);
            break;
    }
};

/**
 * enables helpers for reccurent inputs
 *
 * @param  {boolean} visible
 * @private
 */
hash5.module.calendar.ui.HelperTile.prototype.enableRecHelpers_ = function(visible)
{
    goog.dom.classes.enable(this.getElement(), 'recurrent-event', visible);
};

/**
 * enables helpers for time inputs
 *
 * @param  {boolean} visible
 * @private
 */
hash5.module.calendar.ui.HelperTile.prototype.enableTimesHelpers_ = function(visible)
{
    goog.dom.classes.enable(this.getElement(), 'all-day-event', !visible);
};

/**
 * checks if start date and time is smaller than end date
 * @return {boolean} true if values there changed
 */
hash5.module.calendar.ui.HelperTile.prototype.checkValidDates = function()
{
    // TODO not used yet!
    var changed = false,
        event = this.event_;



    return changed;
};


/**
 * @return {hash5.module.calendar.Event}
 */
hash5.module.calendar.ui.HelperTile.prototype.getEvent = function()
{
    return this.event_;
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.module.calendar.ui.HelperTile.prototype.handleAddExcludeClick_ = function(e)
{
    var excludeDateHelper = new hash5.module.calendar.ui.ExcludeHelper(this.event_);
    this.addChild(excludeDateHelper, true);
};

/** @inheritDoc */
hash5.module.calendar.ui.HelperTile.prototype.beforeClose_ = function()
{
    this.getEvent().removeAllTags();
};