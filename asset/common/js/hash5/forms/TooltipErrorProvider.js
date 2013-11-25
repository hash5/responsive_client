goog.provide('hash5.forms.TooltipErrorProvider');
goog.require('hash5.forms.IErrorProvider');

/**
 * Tooltip Error Provider
 * Shows validation as tooltips above the field
 *
 * @param {hash5.ui.Tooltip} tooltip
 * @constructor
 * @implements {hash5.forms.IErrorProvider}
 */
hash5.forms.TooltipErrorProvider = function(tooltip)
{
    /**
     * Tooltip component
     *
     * @type {hash5.ui.Tooltip}
     * @private
     */
    this.tooltip_ = tooltip;

    /**
     * Hide tooltip delay, after tooltip has been displayed
     *
     * @type {goog.async.Delay}
     * @private
     */
    this.hideDelay_ = new goog.async.Delay(this.hideTooltipDelayed_, 3000, this);
};

/**
 * Shows error message above input fields from FormValidation Result
 *
 * @param {hash5.validation.FormValidationResult} result
 * @param {hash5.forms.Form} form
 */
hash5.forms.TooltipErrorProvider.prototype.display = function(result, form)
{
    this.hideDelay_.stop();

    if (!result.isValid())
    {
        var control;

        for (var i = 0; i < result.errors.length; i++)
        {
            control = form.getControlByName(result.errors[i].fieldName);
            control.setInvalid(true);

            if (i === 0)
            {
                this.displayError(control.getElement(), result.errors[i].message);
            }
        }
    }
};

/**
 * Displays single error message
 *
 * @param {Element} element
 * @param {string} message
 */
hash5.forms.TooltipErrorProvider.prototype.displayError = function(element, message)
{
    if (!element.offsetHeight)
    {
        return;
    }
    this.tooltip_.setBody(message);
    this.tooltip_.positionateToElement(element);
    this.tooltip_.setVisible(true);

    if (element.type == 'text')
    {
        element.focus();
    }

    this.hideDelay_.start();
};

/**
 * Hides tooltip
 *
 * @private
 */
hash5.forms.TooltipErrorProvider.prototype.hideTooltipDelayed_ = function()
{
    this.setVisible(false);
};

/**
 * Sets tooltip
 *
 * @param {hash5.ui.Tooltip} tooltip
 */
hash5.forms.TooltipErrorProvider.prototype.setTooltip = function(tooltip)
{
    this.tooltip_ = tooltip;
};

/**
 * Shows / Hides error provider (tooltip)
 *
 * @param {boolean} isVisible
 */
hash5.forms.TooltipErrorProvider.prototype.setVisible = function(isVisible)
{
    this.tooltip_.setVisible(isVisible);
};
