goog.provide('hash5.forms.ControlFactory');

goog.require('hash5.forms.Checkbox');
goog.require('hash5.forms.Textarea');
goog.require('hash5.forms.Textbox');

/**
 * Control factory
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
hash5.forms.ControlFactory = function()
{

};

/**
 * Returns instance of user control
 *
 * @param {string} type control type
 * @param {Object} config control's configuration
 * @return {goog.ui.Component}
 */
hash5.forms.ControlFactory.prototype.getInstance = function(type, config)
{
    var control = null;
    switch (type)
    {
        case 'textbox':
            control = new hash5.forms.Textbox('');
            break;

        case 'checkbox':
            control = new hash5.forms.Checkbox();
            break;

        case 'textarea':
            control = new hash5.forms.Textarea('');
            break;

        default:
            throw new Error('FormItem type not found: ' + type);
    }

    if (control)
    {
        control.setConfig(config);
    }

    return control;
};
