goog.provide('hash5.validation.EqualityValidator');

goog.require('hash5.validation.Validator');

/**
 * Equality Validator
 * Checks whether to values are equals (i.e. email repeat, password repeat)
 *
 * @constructor
 * @param {string} fieldName
 * @param {string} errorMessage
 * @param {string} targetField
 * @extends {hash5.validation.Validator}
 */
hash5.validation.EqualityValidator = function(fieldName, errorMessage, targetField)
{
    goog.base(this, fieldName, errorMessage);

    /**
     * @type {string}
     * @private
     */
    this.targetField_ = targetField;
};
goog.inherits(hash5.validation.EqualityValidator, hash5.validation.Validator);

/** @inheritDoc */
hash5.validation.EqualityValidator.prototype.validate = function(formData)
{
    if (!formData || typeof formData[this.fieldName] != 'string')
    {
        if (goog.DEBUG)
        {
            console.warn(formData, this.fieldName);
        }

        throw new Error('RequiredFieldValidator: Couldn\'t get control value.');
    }


    this.isValid = formData[this.fieldName] == formData[this.targetField_];

    this.dispatchEvent(hash5.validation.Validator.EventType.VALIDATOR_COMPLETE);
};
