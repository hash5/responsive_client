goog.provide('hash5.forms.IErrorProvider');

/**
 * Interface for Error Provider.
 *
 * @interface
 */
hash5.forms.IErrorProvider = function(){};

/**
 * @param {hash5.validation.FormValidationResult} result
 * @param {hash5.forms.Form} form
 */
hash5.forms.IErrorProvider.prototype.display = function(result, form) {};

/**
 * @param {Element} element
 * @param {string} message
 */
hash5.forms.IErrorProvider.prototype.displayError = function(element, message) {};
