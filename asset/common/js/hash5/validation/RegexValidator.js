goog.provide('hash5.validation.RegexValidator');

goog.require('hash5.validation.Validator');

/**
 * Regular Expression Validator.
 * Validates value with specified Regular expression.
 *
 * @constructor
 * @param {string} fieldName
 * @param {string} errorMessage
 * @param {RegExp} regex
 * @extends {hash5.validation.Validator}
 */
hash5.validation.RegexValidator = function(fieldName, errorMessage, regex)
{
    goog.base(this, fieldName, errorMessage);


    /**
     * @type {RegExp}
     * @private
     */
    this.regex_ = regex;
};
goog.inherits(hash5.validation.RegexValidator,
    hash5.validation.Validator);

/** @inheritDoc */
hash5.validation.RegexValidator.prototype.validate = function(formData)
{
    if (!formData || typeof formData[this.fieldName] != 'string')
    {
        if (goog.DEBUG)
        {
            console.warn(formData, this.fieldName);
        }

        throw new Error('RegexValidator: Couldn\'t get control value.');
    }
    var value = formData[this.fieldName];

    this.isValid = this.isEmpty(value) || !!this.regex_.test(value);

    this.dispatchEvent(hash5.validation.Validator.EventType.VALIDATOR_COMPLETE);
};
