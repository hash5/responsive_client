goog.provide('hash5.module.links.LinkParser');

goog.require('hash5.parsing.ISubParser');

/**
 * @constructor
 * @implements {hash5.parsing.ISubParser}
 */
hash5.module.links.LinkParser = function()
{
        /**
       * @type {string}
       * @private
       */
      this.id = 'linkParser';
};

/**
 * @param {hash5.parsing.Parser} parser
 * @return {Array.<String>}
 */
hash5.module.links.LinkParser.prototype.parse = function(parser)
{
    var parsed = twttr.txt.extractUrlsWithIndices(parser.getRawText());

    return parsed || [];
};
