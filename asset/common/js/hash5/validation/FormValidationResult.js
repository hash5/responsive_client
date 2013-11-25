goog.provide('hash5.validation.FormValidationResult');

/**
 * Form Validation result
 *
 * @constructor
 * @param {Array.<hash5.validation.FormValidationError>} errors
 */
hash5.validation.FormValidationResult = function(errors)
{
    this.errors = errors;
};

/**
 * Returns whether form is valid
 *
 * @return {boolean}
 */
hash5.validation.FormValidationResult.prototype.isValid = function()
{
    return this.errors.length === 0;
};
