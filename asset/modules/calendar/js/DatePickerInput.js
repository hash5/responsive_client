goog.provide('hash5.module.calendar.DatePickerInput');

goog.require('goog.ui.InputDatePicker');

goog.require('hash5.forms.Textbox');
goog.require('hash5.module.calendar.DatePicker');


/**
 * A datepicker control
 *
 * @param {string=} content Text to set as the textbox's value.
 * @constructor
 * @extends {hash5.forms.Textbox}
 */
hash5.module.calendar.DatePickerInput = function(content)
{
    goog.base(this, content);

    var PATTERN = 'd.M.y'; //"MM'/'dd'/'yyyy";
    var formatter = new goog.i18n.DateTimeFormat(PATTERN);
    var parser = new goog.i18n.DateTimeParse(PATTERN);


    /**
     * @type {goog.ui.InputDatePicker}
     * @private
     */
    this.datePicker_ = new goog.ui.InputDatePicker(formatter, parser);
    this.registerDisposable(this.datePicker_);
};
goog.inherits(hash5.module.calendar.DatePickerInput, hash5.forms.Textbox);


/** @inheritDoc */
hash5.module.calendar.DatePickerInput.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.datePicker_.decorate(this.getElement());

    this.getHandler()
        .listen(this.datePicker_, goog.ui.DatePicker.Events.CHANGE, this.handleDateSelect);
};


/**
 * @param {goog.ui.DatePickerEvent} e
 */
hash5.module.calendar.DatePickerInput.prototype.handleDateSelect = function(e)
{
    this.fireChangeEvent_();
};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'datepicker',
    function() {
      return new hash5.module.calendar.DatePickerInput('');
    }
);
