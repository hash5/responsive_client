goog.provide('hash5.module.calendar.CalendarParser');

goog.require('hash5.parsing.ISubParser');
goog.require('hash5.module.calendar.Event');
goog.require('hash5.module.calendar.DateUtils');
goog.require('hash5.module.calendar.Duration');

var utils = hash5.module.calendar.DateUtils;

/**
 * @constructor
 * @implements {hash5.parsing.ISubParser}
 */
hash5.module.calendar.CalendarParser = function()
{
  /**
   * @type {string}
   * @private
   */
  this.id = 'calParser';
};

/**
 * @param {hash5.parsing.Parser} parser
 * @return {Array.<hash5.module.calendar.Event>}
 */
hash5.module.calendar.CalendarParser.prototype.parse = function(parser)
{
    var cal = [];

    // check if server parsed is available
    var parsed = parser.getServerParsed();
    if(goog.isArray(parsed['cal']))
    {
      for(var i = 0; i < parsed['cal'].length; i++)
      {
        cal.push(hash5.module.calendar.Event.factory(parsed['cal'][i]));
      }
    }
    else
    {
      // parse new text
      var complexTags = parser.getComplexTags();
      cal = this.parseCalendarData(complexTags);
    }

    return cal;
};


/**
 * Parse the calendar data from complex tags and return an
 * array with all calendar information.
 *
 * If there are no valid calendar information, an empty array is returned.
 *
 * There can be multiple #start/#end-tags in the complexTags, but only the
 * first #recurrent-tag is parsed. The recurrent-data is stored to the
 * calendar data of the last #start-tag.
 *
 * @param {Array.<hash5.parsing.ComplexTag>} complexTags
 * @return {Array.<hash5.module.calendar.Event>}
 */
hash5.module.calendar.CalendarParser.prototype.parseCalendarData = function(complexTags)
{
  var cal = [];
  var event = new hash5.module.calendar.Event();
  var recurrentAlreadyDefined = false;

  goog.array.forEach(complexTags, function(complexTag)
  {
    if(!complexTag.key) return;
    var tagName = complexTag.key.toLowerCase();

    if(tagName === "start") {
      this.addValidEvent(cal, event);
      event = new hash5.module.calendar.Event();
      event.setStartDate(utils.stringToDate(complexTag.value), complexTag.indices);

    } else if(tagName === "end") {
      event.setEndDate(utils.stringOrTimeToDate(complexTag.value, event.getStartDate()), complexTag.indices);

    } else if(tagName === "recend") {
      event.setRecend(utils.stringToDate(complexTag.value), complexTag.indices);

    } else if(tagName === "recurrent") {
      if(recurrentAlreadyDefined) return;
      recurrentAlreadyDefined = true;

      // TODO
      var duration = hash5.module.calendar.Duration.fromString(complexTag.value);
      event.setRecurrent(duration, complexTag.indices);
      event.setExcluded(this.parseExcludeTags(complexTags));
    }

  }, this);

  this.addValidEvent(cal, event);

  return cal;
};


/**
 * Adds the event to the array, if all required calendar information like start, end
 * is in the event object.
 * If the event is not valid, nothing is pushed into the array.
 * If start is later than end, the values will be swapped.
 *
 * @param {Array.<hash5.module.calendar.Event>} array
 * @param {hash5.module.calendar.Event} event
 */
hash5.module.calendar.CalendarParser.prototype.addValidEvent = function(array, event)
{

  if(event.getStartDate() && event.getEndDate()) {

    if(event.getStartDate() > event.getEndDate()) {
      var swap = event.getStartDate();
      event.setStartDate(event.getEndDate());
      event.setEndDate(swap);
    }

    array.push(event);
  }
};


/**
 * Parses all `#exc`-tags from the complex tags and returns an Array
 * of objects with data about the excluded dates.
 *
 * @param {Array.<hash5.parsing.ComplexTag>} complexTags
 * @return {Array.<Object>}
 */
hash5.module.calendar.CalendarParser.prototype.parseExcludeTags = function(complexTags)
{
  var allExcTags = goog.array.filter(complexTags, function(tag) {
    return tag.key === "exc";
  });

  return goog.array.map(allExcTags, function(tag) {
    return this.parseExcludeTag(tag.value);
  }, this);
};

/**
 * Parses one exclude tag and returns an object.
 *
 * Exclude tags can consists of an index or date, and an optional Id of the excluded tag:
 * Format as Pseudo-Regexp: /(Index|Date) (, Id)?/
 *
 * If there is no id given, the date is omitted.
 * It there is an id, this event will be used instead of the original recurrent event.
 *
 * Possible results:
 *
 * - {index: 123} if there was an index given
 * - {date: ISODate(2012-12-23)} if there was a date given
 * - {index: 345, id: "abcd"} if there was an index with id given
 * - {warning: "Cannot parse"} with an english warning text, if the exclude tag cannot be parsed correctly
 *
 * @param {string} tagValue
 * @return {Object}
 */
hash5.module.calendar.CalendarParser.prototype.parseExcludeTag = function(tagValue)
{
  var regexpWholeValue = /^([^\s,]+)\s*(?:,\s*(\w+))?$/;
  var match = regexpWholeValue.exec(tagValue);
  if(!match) return { warning: "Cannot parse " + tagValue};

  var result = utils.parseDateOrIndex(match[1]);
  if(match[2]) {
    result.id = match[2];
  }

  return result;
};