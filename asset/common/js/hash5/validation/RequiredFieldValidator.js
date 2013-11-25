goog.provide('hash5.validation.RequiredFieldValidator');

goog.require('hash5.validation.Validator');

/**
 * Required Field Validator
 * Verifies whether field value is not empty.
 *
 * @constructor
 * @param {string} fieldName
 * @param {string} errorMessage
 * @extends {hash5.validation.Validator}
 */
hash5.validation.RequiredFieldValidator = function(fieldName, errorMessage)
{
    goog.base(this, fieldName, errorMessage);
};

goog.inherits(hash5.validation.RequiredFieldValidator,
    hash5.validation.Validator);

/** @inheritDoc */
hash5.validation.RequiredFieldValidator.prototype.validate = function(formData)
{
    if (!formData || typeof formData[this.fieldName] != 'string')
    {
        if (goog.DEBUG)
        {
            console.warn(formData, this.fieldName);
        }

        throw new Error('RequiredFieldValidator: Couldn\'t get control value for field ' + this.fieldName + '.');
    }
    this.isValid = !this.isEmpty(formData[this.fieldName]);

    this.dispatchEvent(hash5.validation.Validator.EventType.VALIDATOR_COMPLETE);
};
