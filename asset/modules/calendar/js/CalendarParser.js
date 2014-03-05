goog.provide('hash5.module.calendar.CalendarParser');

goog.require('hash5.parsing.ISubParser');
goog.require('hash5.module.calendar.Event');
goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeParse');

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
      event.setStartDate(this.stringToDate(complexTag.value));

    } else if(tagName === "end") {
      event.setEndDate(this.stringOrTimeToDate(complexTag.value, event.getStartDate()));

    } else if(tagName === "recend") {
      event.setRecend(this.stringToDate(complexTag.value));

    } else if(tagName === "recurrent") {
      if(recurrentAlreadyDefined) return;
      recurrentAlreadyDefined = true;

      // TODO
      //var duration = durationUtilities.stringToDuration(complexTag.value);
      //event.setRecurrent(durationUtilities.durationToJson(duration));
      //event.setExcluded(this.parseExcludeTags(complexTags));
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
 * @type {goog.i18n.DateTimeParse}
 * @private
 */
hash5.module.calendar.CalendarParser.prototype.dateParser_ = new goog.i18n.DateTimeParse("dd'.'MM'.'yyyy");

/**
 * Returns a Date if the text can be parsed,
 * or null if the text is not valid or was null.
 *
 * @param {string} text
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.CalendarParser.prototype.stringToDate = function(text)
{
  var date = new goog.date.DateTime();
  // TODO check if time was parsed...
  // TODO parse with more patterns
  return this.dateParser_.strictParse(text, date) > 0 ? date : null;
};

/**
 * Returns a Date if the text can be parsed,
 * or null if the text is not valid or was null.
 *
 * This method also supports Time-only-dates (like "HH:MM"),
 * the day will then taken from the startDate argument.
 *
 * @param {string} text
 * @param {goog.date.DateTime} startDate
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.CalendarParser.prototype.stringOrTimeToDate = function(text, startDate)
{
  var dateAndTime = this.stringToDate(text);

  if(dateAndTime) {
    return dateAndTime;
  } else {
    return null;
    // TODO
    //var timeMoment = this.timeToMoment(text, startDate);
    //return timeMoment ? timeMoment.toDate() : null;
  }

  return null;
};