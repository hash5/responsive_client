goog.provide('hash5.validation.Validator');
goog.provide('hash5.validation.Validator.EventType');

/**
 *Abstract Validator class
 *
 * @param {string} fieldName
 * @param {string} errorMessage
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.validation.Validator = function(fieldName, errorMessage)
{
    goog.base(this);

    /**
     * Field name
     *
     * @type {string}
     */
    this.fieldName = fieldName;

    /**
     * Current validation state
     *
     * @type {boolean}
     */
    this.isValid = false;

    /**
     * @type {boolean}
     */
    this.isValidating = false;

    /**
     * @type {string}
     */
    this.errorMessage = errorMessage;
};
goog.inherits(hash5.validation.Validator, goog.events.EventTarget);

/**
 * Returns true if value is empty string
 *
 * @param {string} value
 * @return {boolean}
 * @protected
 */
hash5.validation.Validator.prototype.isEmpty = function(value)
{
    return !goog.string.trim(value);
};

/**
 * Performs validation
 *
 * @param {Object} formData
 */
hash5.validation.Validator.prototype.validate = goog.abstractMethod;


hash5.validation.Validator.EventType = {
    VALIDATOR_COMPLETE: 'validator_complete'
};
