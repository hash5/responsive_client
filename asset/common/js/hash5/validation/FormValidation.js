goog.provide('hash5.validation.FormValidation');
goog.provide('hash5.validation.FormValidationError');
goog.provide('hash5.validation.FormValidationEvent');

goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');

goog.require('hash5.validation.FormValidationResult');

/**
 * Form Validation contructor
 * Validates form values for correct format.
 *
 * @param {Array.<hash5.validation.Validator>} validators
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.validation.FormValidation = function(validators)
{
    goog.base(this);

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = new goog.events.EventHandler(this);

    goog.array.forEach(validators, function(validator) {
        validator.setParentEventTarget(this);
    }, this);

    /**
     * @type {Array.<hash5.validation.Validator>}
     * @private
     */
    this.validators = validators;

    this.handler_.listen(this,
        hash5.validation.Validator.EventType.VALIDATOR_COMPLETE,
        this.handleValidateComplete_);
};
goog.inherits(hash5.validation.FormValidation, goog.events.EventTarget);

/**
 * Handles validation complete event
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.validation.FormValidation.prototype.handleValidateComplete_ = function(e)
{
    var errors = [], error;
    e.target.isValidating = false;

    for (var i = 0; i < this.validators.length; i++)
    {
        if (this.validators[i].isValidating)
        {
            return;
        }

        if (!this.validators[i].isValid)
        {
            error = /** @lends {hash5.validation.FormValidationError} */ {
                fieldName: this.validators[i].fieldName,
                message: this.validators[i].errorMessage
            };
            errors.push(error);
        }
    }


    this.dispatchEvent({
        type: hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE,
        result: new hash5.validation.FormValidationResult(errors)
    });
};

/**
 * Performs validation of form data
 *
 * @param {Object} formData
 */
hash5.validation.FormValidation.prototype.validate = function(formData)
{
    for (var i = 0; i < this.validators.length; i++)
    {
        this.validators[i].isValidating = true;
        this.validators[i].isValid = false;
    }

    for (i = 0; i < this.validators.length; i++)
    {
        this.validators[i].validate(formData);
    }
};

/**
 * Enumeration for event types
 *
 * @enum {string}
 */
hash5.validation.FormValidation.EventType = {
    VALIDATION_COMPLETE: 'validation_complete'
};

/**
 * @typedef {{
 *   fieldName: (string),
 *   message: (string)
 * }}
 */
hash5.validation.FormValidationError;


/**
 * @param {string} type Event Type.
 * @param {hash5.validation.FormValidation} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @constructor
 * @extends {goog.events.Event}
 */
hash5.validation.FormValidationEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * @type {hash5.validation.FormValidationResult}
     */
    this.result = null;
};
goog.inherits(hash5.validation.FormValidationEvent, goog.events.Event);