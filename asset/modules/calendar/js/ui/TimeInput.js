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

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'timepicker',
    function() {
      return new hash5.module.calendar.ui.TimeInput('');
    }
);
