goog.provide('hash5.parsing.ISubParser');

/**
 * Interface for custom SubParsers
 * @interface
 */
hash5.parsing.ISubParser = function() {}

/**
 * @param {hash5.parsing.Parser} parser
 * @return {*}
 */
hash5.parsing.ISubParser.prototype.parse = function(parser) {};