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
        var entry = parser.getEntry(),
            serverParsed = entry.getServerObj();

        files = goog.array.map(matches, function(url) {
          var id = url.substr(url.lastIndexOf('/') + 1),
            info = this.getFileInfo(id, serverParsed);

            return new hash5.module.files.File(id, url, info);
        }, this);
    }

    return files;
};

/**
 * returns file infos
 * @param  {string} fileId
 * @param  {Object=} serverParsed
 * @return {Object}
 */
hash5.module.files.FileParser.prototype.getFileInfo = function(fileId, serverParsed)
{
  // check for server informations
  if(serverParsed && goog.isDef(serverParsed['attachedFiles'])) {
    for(var i = 0; i < serverParsed['attachedFiles'].length; i++) {
      var info = serverParsed['attachedFiles'][i];
      if(info['_id'] === fileId) {
        return info;
      }
    }
  }

  // check in global storage
  return hash5.module.files.FileParser.fileInfos[fileId] || null;
};

/**
 * global fileInfo storage
 * @type {Object.<string, Object>}
 */
hash5.module.files.FileParser.fileInfos = {};

/**
 * @type {Array.<string>}
 */
hash5.module.files.FileParser.domainList = ['dev.hash5.com:8080', document.location.host];