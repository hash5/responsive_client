goog.provide('hash5.module.files.FileParser');

goog.require('hash5.parsing.ISubParser');
goog.require('hash5.module.files.File');

/**
 * @constructor
 * @implements {hash5.parsing.ISubParser}
 */
hash5.module.files.FileParser = function()
{
  /**
   * @type {string}
   * @private
   */
  this.id = 'fileParser';
};

/**
 * @param {hash5.parsing.Parser} parser
 * @return {Array.<hash5.module.filesendar.File>}
 */
hash5.module.files.FileParser.prototype.parse = function(parser)
{
    var files = [];

    // check if server parsed is available
    // TODO

    return files;
};