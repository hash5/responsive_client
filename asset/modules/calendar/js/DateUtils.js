goog.provide('hash5.module.calendar.DateUtils');


goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeParse');



/**
 * shared parser instances
 *
 * @type {Array.<goog.i18n.DateTimeParse>}
 * @private
 */
hash5.module.calendar.DateUtils.dateParsers_ = [
   new goog.i18n.DateTimeParse("dd'.'MM'.'yyyy HH:mm"),
   new goog.i18n.DateTimeParse("dd'.'MM'.'yyyy"),
   new goog.i18n.DateTimeParse("yyy-MM-dd HH:mm"),
   new goog.i18n.DateTimeParse("yyy-MM-dd")
];

/**
 * Returns a Date if the text can be parsed,
 * or null if the text is not valid or was null.
 *
 * @param {string} text
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.DateUtils.stringToDate = function(text)
{
  if(!text)
    return null;

  var date = new goog.date.DateTime();
  var parsers = hash5.module.calendar.DateUtils.dateParsers_;

  for(var i = 0; i < parsers.length; i++)
  {
    if(parsers[i].strictParse(text, date) > 0)
      return date;
  }

  return null;
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
hash5.module.calendar.DateUtils.stringOrTimeToDate = function(text, startDate)
{
  var dateAndTime = hash5.module.calendar.DateUtils.stringToDate(text);

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


/**
 * Returns true, if the given text is a single
 * positive integer number.
 *
 * @param  {string} text
 * @return {boolean}
 */
hash5.module.calendar.DateUtils.isSingleNumber = function(text)
{
    return (/^\d+$/).test(text);
};

/**
 * Parses a date or an index from the text.
 * Returns an object with {index: 123} or {date: 2012-03-14}.
 * If no date or index can be parsed, an object with {warning: txt} is returned.
 *
 * Used to parse fragments from the `#exc`-tag.
 *
 * @param {string} text
 * @return {Object} [description]
 */
hash5.module.calendar.DateUtils.parseDateOrIndex = function(text)
{
    var result = {};

    if(hash5.module.calendar.DateUtils.isSingleNumber(text)) {
        result.index = parseInt(text, 10);
    } else {
        result.date = hash5.module.calendar.DateUtils.stringToDate(text);

        if(!result.date) {
            result.warning = "Cannot parse index or date: " + text;
        }
    }

    return result;
};