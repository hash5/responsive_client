goog.provide('hash5.module.calendar.ui.DatePickerInput');

goog.require('goog.ui.InputDatePicker');

goog.require('hash5.forms.Textbox');


/**
 * A datepicker control
 *
 * @param {string=} content Text to set as the textbox's value.
 * @constructor
 * @extends {hash5.forms.Textbox}
 */
hash5.module.calendar.ui.DatePickerInput = function(content)
{
    goog.base(this, content);

    var PATTERN = 'd.M.y'; //"MM'/'dd'/'yyyy";
    var formatter = new goog.i18n.DateTimeFormat(PATTERN);
    /**
     * @type {goog.i18n.DateTimeParse}
     * @private
     */
    this.parser_ = new goog.i18n.DateTimeParse(PATTERN);


    /**
     * @type {goog.ui.InputDatePicker}
     * @private
     */
    this.datePicker_ = new goog.ui.InputDatePicker(formatter, this.parser_);
    this.registerDisposable(this.datePicker_);
};
goog.inherits(hash5.module.calendar.ui.DatePickerInput, hash5.forms.Textbox);


/** @inheritDoc */
hash5.module.calendar.ui.DatePickerInput.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.datePicker_.decorate(this.getElement());

    this.getHandler()
        .listen(this.datePicker_, goog.ui.DatePicker.Events.CHANGE, this.handleDateSelect)
        .listen(this.getElement(), goog.events.EventType.BLUR, this.handleBlur_);
};


/**
 * @param {goog.ui.DatePickerEvent} e
 */
hash5.module.calendar.ui.DatePickerInput.prototype.handleDateSelect = function(e)
{
    this.fireChangeEvent_();
};


/** @override */
hash5.module.calendar.ui.DatePickerInput.prototype.fireChangeEvent_ = function()
{
    if(this.isValid()) {
        goog.dom.classes.remove(this.getElement(), 'invalid');
        goog.base(this, 'fireChangeEvent_');
    } else {
        goog.dom.classes.add(this.getElement(), 'invalid');
    }
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.calendar.ui.DatePickerInput.prototype.handleBlur_ = function(e)
{
    if(!this.isValid() && this.tryCorrection()) {
        this.fireChangeEvent_();
    }
};

/**
 * tries to correct invalid date
 * @return {bollean}
 */
hash5.module.calendar.ui.DatePickerInput.prototype.tryCorrection = function()
{
    var curValue = this.getValue(),
        newValue = this.getValue();

    // remove letters
    var numbers = curValue.match(/(\d+|:|\.)/gi);
    if(numbers != null) {
        newValue = numbers.join('');
    }

    // fixed?
    if(this.validateTime(newValue)) {
        this.getElement().value = newValue;
        return true;
    }

    return false;
};

/**
 * @return {boolean}
 */
hash5.module.calendar.ui.DatePickerInput.prototype.isValid = function()
{
    var curValue = this.getValue();

    return this.validateTime(curValue);
};

/**
 * @param {string} dateStr
 * @return {boolean}
 */
hash5.module.calendar.ui.DatePickerInput.prototype.validateTime = function(dateStr)
{
    return this.parser_.parse(dateStr, new Date()) > 0;
};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'datepicker',
    function() {
      return new hash5.module.calendar.ui.DatePickerInput('');
    }
);
