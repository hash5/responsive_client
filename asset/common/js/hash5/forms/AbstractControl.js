goog.provide('hash5.forms.AbstractControl');

goog.require('goog.ui.Component');
goog.require('goog.dom.classes');

/**
 * Abstract form control
 *
 * @constructor
 * @param {string=} fieldName
 * @implements {hash5.forms.IControl}
 * @extends {goog.ui.Component}
 */
hash5.forms.AbstractControl = function(fieldName)
{
    goog.base(this);

    /**
     * @type {string}
     * @protected
     */
    this.fieldName_ = fieldName || '';
};

goog.inherits(hash5.forms.AbstractControl, goog.ui.Component);

/**
 * Returns control's name
 *
 * @return {string}
 */
hash5.forms.AbstractControl.prototype.getFieldName = function()
{
    return this.fieldName_;
};

/**
 * Returns control's value
 *
 * @return {*}
 */
hash5.forms.AbstractControl.prototype.getValue = goog.abstractMethod;

/**
 * Resets control value to it's default value
 */
hash5.forms.AbstractControl.prototype.reset = goog.abstractMethod;

/**
 * Sets control configuration
 *
 * @param {Object} config
 */
hash5.forms.AbstractControl.prototype.setConfig = goog.abstractMethod;

/**
 * Sets control value
 *
 * @param {*} value
 */
hash5.forms.AbstractControl.prototype.setValue = goog.abstractMethod;

/**
 * Sets control state to invalid
 * @param {boolean} isInvalid
 */
hash5.forms.AbstractControl.prototype.setInvalid = function(isInvalid)
{
    goog.dom.classes.enable(this.getElement(), 'invalid', isInvalid);
};
