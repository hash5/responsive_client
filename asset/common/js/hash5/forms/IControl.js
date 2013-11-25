goog.provide('hash5.forms.IControl');

/**
 * Interface for form control element
 * @interface
 */
hash5.forms.IControl = function() {}

/**
 * @return {Element}
 */
hash5.forms.IControl.prototype.getElement = function() {};

/**
 * @return {*}
 */
hash5.forms.IControl.prototype.getValue = function() {};

/**
 * @return {string}
 */
hash5.forms.IControl.prototype.getFieldName = function() {};

/**
 */
hash5.forms.IControl.prototype.reset = function() {};

/**
 * @param {Object} config
 */
hash5.forms.IControl.prototype.setConfig = function(config) {};

/**
 * @param {boolean} isInvalid
 */
hash5.forms.IControl.prototype.setInvalid = function(isInvalid) {};

/**
 * @param {*} value
 */
hash5.forms.IControl.prototype.setValue = function(value) {};