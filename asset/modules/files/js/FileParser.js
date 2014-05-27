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
 * @return {Array.<hash5.module.files.File>}
 */
hash5.module.files.FileParser.prototype.parse = function(parser)
{
    var files = [],
        rawText = parser.getRawText();

    var domains = hash5.module.files.FileParser.domainList,
        url = hash5.App.getInstance().getApiPrefix() + '/files/',
        regex = new RegExp("http(s)?:\/\/(" + domains.join('|') + ")" + url + "\\w+", 'ig'),
        matches = rawText.match(regex);

    if(matches) {
        files = goog.array.map(matches, function(url) {
            return new hash5.module.files.File(url);
        });
    }

    return files;
};

/**
 * TODO work more abstract -> config file?
 * @type {Array.<string>}
 */
hash5.module.files.FileParser.domainList = ['dev.hash5.com:8080', document.location.host];