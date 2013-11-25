goog.provide('hash5.validation.EmailValidator');

goog.require('goog.format.EmailAddress');
goog.require('hash5.validation.Validator');

/**
 * Email Validator
 *
 * @constructor
 * @param {string} fieldName
 * @param {string} errorMessage
 * @extends {hash5.validation.Validator}
 */
hash5.validation.EmailValidator = function(fieldName, errorMessage)
{
    goog.base(this, fieldName, errorMessage);

};
goog.inherits(hash5.validation.EmailValidator,
    hash5.validation.Validator);

/** @inheritDoc */
hash5.validation.EmailValidator.prototype.validate = function(formData)
{
    var value = formData[this.fieldName];

    this.isValid = this.isEmpty(value) ||
        goog.format.EmailAddress.isValidAddress(value);

    this.dispatchEvent(hash5.validation.Validator.EventType.VALIDATOR_COMPLETE);
};
