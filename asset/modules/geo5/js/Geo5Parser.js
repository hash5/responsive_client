goog.provide('hash5.module.geo5.Geo5Parser');

goog.require('hash5.parsing.ISubParser');

goog.require('hash5.api');

/**
 * @constructor
 * @implements {hash5.parsing.ISubParser}
 */
hash5.module.geo5.GeoParser = function()
{
  /**
   * @type {string}
   * @private
   */
  this.id = 'geo5Parser';
};

/**
 * @param {hash5.parsing.Parser} parser
 * @return {Array.<hash5.module.calendar.Event>}
 */
hash5.module.geo5.GeoParser.prototype.parse = function(parser)
{
	var geo5 = [];

	var parsed = parser.getServerParsed();
	if(goog.isArray(parsed['geo5'])){

	}
};

/**
 * @param {Array.<hash5.parsing.ComplexTag>} complexTags
 * @return {Array.<hash5.module.geo5.LatLng>}
 */

hash5.module.geo5.GeoParser.parseGeoTags = function(complexTags){
var geoData = [];
  _.forEach(complexTags,
      function(complexTag){
        if(!complexTag.key)
            return;
        var tagName = complexTag.key.toLowerCase(complexTag);

        if(tagName === "coords"){
          if(/^(\-?\d+(\.\d+)?):\s*(\-?\d+(\.\d+)?)$/.test(complexTag.value) === true){
            log.debug("lag lng found");
              var coords = complexTag.value.split(":");
              geoData = {
                "lon" : parseFloat(coords[1]), 
                "lat" : parseFloat(coords[0])
              };
             
          }else{
            log.debug("contains no coords tag"+ tagName);
            return;
          }
        }

      });
  return geoData;
};