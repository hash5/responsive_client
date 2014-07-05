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

/** @override */
hash5.module.calendar.ui.TimeInput.prototype.fireChangeEvent_ = function()
{
    if(this.isValid() || this.tryCorrection()) {
        goog.dom.classes.remove(this.getElement(), 'invalid');
        goog.base(this, 'fireChangeEvent_');
    } else {
        goog.dom.classes.add(this.getElement(), 'invalid');
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
    newValue = curValue.match(/(\d+|:|\.)/gi).join('');

    // insert colon when missing
    if(newValue.indexOf(':') < 0 &&
        goog.string.isNumeric(newValue.trim()) &&
         newValue.length > 3) {
        newValue = newValue.substr(0, 2) + ':' + newValue.substr(2);
    }

    // fixed?
    if(this.validateTime(newValue)) {
        this.getElement().value = newValue;
        return true;
    }

    return false;
};

/** @override */
hash5.module.calendar.ui.TimeInput.prototype.handleFocus_ = function(e)
{
    goog.base(this, 'handleFocus_', e);
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
