goog.provide('hash5.module.calendar.ui.TimeInput');

goog.require('hash5.forms.Textbox');


/**
 * A time input control
 *
 * @param {string=} content Text to set as the textbox's value.
 * @constructor
 * @extends {hash5.forms.Textbox}
 */
hash5.module.calendar.ui.TimeInput = function(content)
{
    goog.base(this, content);

};
goog.inherits(hash5.module.calendar.ui.TimeInput, hash5.forms.Textbox);

/** @inheritDoc */
hash5.module.calendar.ui.TimeInput.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElement(), goog.events.EventType.BLUR, this.handleBlur_);
};

/** @override */
hash5.module.calendar.ui.TimeInput.prototype.fireChangeEvent_ = function()
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
hash5.module.calendar.ui.TimeInput.prototype.handleBlur_ = function(e)
{
    if(!this.isValid() && this.tryCorrection()) {
        this.fireChangeEvent_();
    }
};

/**
 * tries to correct invalid time
 * @return {bollean}
 */
hash5.module.calendar.ui.TimeInput.prototype.tryCorrection = function()
{
    var curValue = this.getValue(),
        newValue = curValue.replace('.', ':');

    // remove letters
    var numbers = curValue.match(/(\d+|:|\.)/gi);
    if(numbers != null) {
        newValue =  numbers.join('');
    }

    // insert colon when missing (1000 --> 10:00 , 10 --> 10:00; 102 --> 10:20)
    if(newValue.indexOf(':') < 0 &&
        goog.string.isNumeric(newValue.trim())) {
        var end  = newValue.substr(2);

        if(end.length == 0)  {
            end += '00';
        } else if (end.length == 1) {
            end += '0';
        }

        newValue = newValue.substr(0, 2) + ':' + end;
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
hash5.module.calendar.ui.TimeInput.prototype.isValid = function()
{
    var curValue = this.getValue();

    return this.validateTime(curValue);
};

/**
 * @param {string} dateStr
 * @return {boolean}
 */
hash5.module.calendar.ui.TimeInput.prototype.validateTime = function(dateStr)
{
    var dateRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/gm;

    return dateRegex.test(dateStr);
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'timepicker',
    function() {
      return new hash5.module.calendar.ui.TimeInput('');
    }
);
