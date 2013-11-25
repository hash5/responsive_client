goog.provide('hash5.forms.DefaultErrorProvider');

goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.ui.Component');
goog.require('hash5.forms.Textbox');
goog.require('hash5.forms.IErrorProvider');

/**
 * displays error messages under input field
 *
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {hash5.forms.IErrorProvider}
 */
hash5.forms.DefaultErrorProvider = function()
{
    goog.base(this);
};
goog.inherits(hash5.forms.DefaultErrorProvider, goog.ui.Component);

/** @inheritDoc */
hash5.forms.DefaultErrorProvider.prototype.createDom = function()
{
    this.decorateInternal(this.getDomHelper().createDom('div', 'form-error'));
};


/**
 * shows error message from a FormValidationResult
 *
 * @param {hash5.validation.FormValidationResult} result
 * @param {hash5.forms.Form} form
 */
hash5.forms.DefaultErrorProvider.prototype.display = function(result, form)
{
    if (!result.isValid())
    {
        var error = result.errors[0];

        var control = form.getControlByName(error.fieldName);
        control.setInvalid(true);
        if (control instanceof hash5.forms.Textbox)
        {
            control.focus();
        }

        this.displayError_(control.getElement(), error.message);
        goog.Timer.callOnce(function() {
            this.setVisible(!result.isValid());
        }, 100, this);
    }


};

/**
 * renders error message
 *
 * @param {Element} element
 * @param {string} message
 * @private
 */
hash5.forms.DefaultErrorProvider.prototype.displayError_ = function(element, message)
{
    this.getElement().innerHTML = message;
    goog.dom.insertSiblingAfter(this.getElement(), element);
};

/**
 * Displays error message
 *
 * @param {Element} element
 * @param {string} message
 * @private
 */
hash5.forms.DefaultErrorProvider.prototype.displayError = function(element, message)
{
    this.displayError_(element, message);
    goog.Timer.callOnce(function() {
        this.setVisible(true);
    }, 100, this);
};

/**
 * Shows / Hides error provider
 *
 * @param {boolean} isVisible
 */
hash5.forms.DefaultErrorProvider.prototype.setVisible = function(isVisible)
{
    goog.dom.classes.enable(this.getElement(), 'visible', isVisible);
};
