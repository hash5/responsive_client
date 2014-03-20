goog.provide('hash5.module.calendar.DateUtils');


goog.require('hash5.module.calendar.DateTime');
goog.require('goog.i18n.DateTimeParse');



/**
 * shared parser instances
 *
 * @type {Array.<goog.i18n.DateTimeParse>}
 * @private
 */
hash5.module.calendar.DateUtils.dateParsers_ = [
   new goog.i18n.DateTimeParse("dd'.'MM'.'yyyy"),
   new goog.i18n.DateTimeParse("yyy-MM-dd"),
   new goog.i18n.DateTimeParse("yyy/MM/dd")
];

/**
 * shared time parser instance
 *
 * @type {goog.i18n.DateTimeParse}
 * @private
 */
hash5.module.calendar.DateUtils.timeParser_ = new goog.i18n.DateTimeParse("HH:mm");

/**
 * Returns a Date if the text can be parsed,
 * or null if the text is not valid or was null.
 *
 * @param {string} text
 * @return {hash5.module.calendar.DateTime}
 */
hash5.module.calendar.DateUtils.stringToDate = function(text)
{
  if(!text)
    return null;

  var date = new hash5.module.calendar.DateTime();
  var parsed = hash5.module.calendar.DateUtils.parseDate(text, date);
  if(parsed > 0){
    hash5.module.calendar.DateUtils.parseTime(text.substring(parsed), date);
  }

  return parsed > 0 ? date : null;
};


/**
 * @param {string} text
 * @param {hash5.module.calendar.DateTime} date
 * @return {number}
 */
hash5.module.calendar.DateUtils.parseDate = function(text, date)
{
  var parsers = hash5.module.calendar.DateUtils.dateParsers_;
  var parsedChars = 0;

  for(var i = 0; i < parsers.length; i++)
  {
    parsedChars = parsers[i].strictParse(text, date);
    if(parsedChars > 0)
      return parsedChars;
  }

  return parsedChars;
};

/**
 * @param {string} text
 * @param {hash5.module.calendar.DateTime} date
 * @return {boolean}
 */
hash5.module.calendar.DateUtils.parseTime = function(text, date)
{
  var parser = hash5.module.calendar.DateUtils.timeParser_;

  if(parser.strictParse(text, date) > 0)
  {
    date.setHasTime(true);
    return true;
  }

  return false;
};

/**
 * Returns a Date if the text can be parsed,
 * or null if the text is not valid or was null.
 *
 * This method also supports Time-only-dates (like "HH:MM"),
 * the day will then taken from the startDate argument.
 *
 * @param {string} text
 * @param {hash5.module.calendar.DateTime} startDate
 * @return {hash5.module.calendar.DateTime}
 */
hash5.module.calendar.DateUtils.stringOrTimeToDate = function(text, startDate)
{
  var dateAndTime = hash5.module.calendar.DateUtils.stringToDate(text);

  if(!startDate)
    return dateAndTime;

  if(!dateAndTime) {
    var newDate = startDate.clone();

    if(hash5.module.calendar.DateUtils.parseTime(text, newDate) > 0)
    {
      dateAndTime = newDate;
    }
  }

  return dateAndTime;
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


/**
 * returns string for date
 * if time is set, time is also returned
 *
 * @param {hash5.module.calendar.DateTime} date
 * @return {string}
 */
hash5.module.calendar.DateUtils.dateTimeToString = function(date)
{
    var result = hash5.module.calendar.DateUtils.dateToString(date);

    if(date.hasTime())
    {
        result += ' ' + hash5.module.calendar.DateUtils.timeToString(date);
    }

    return result;
};

/**
 * shared date formatter
 * @type {goog.i18n.DateTimeFormat}
 * @private
 */
hash5.module.calendar.DateUtils.dateFormatter_ = new goog.i18n.DateTimeFormat('d.M.y');

/**
 * shared time formatter
 * @type {goog.i18n.DateTimeFormat}
 * @private
 */
hash5.module.calendar.DateUtils.timeFormatter_ = new goog.i18n.DateTimeFormat('H:m');

/**
 * returns string for time
 *
 * @param {hash5.module.calendar.DateTime} date
 * @return {string}
 */
hash5.module.calendar.DateUtils.timeToString = function(date)
{
    return hash5.module.calendar.DateUtils.timeFormatter_.format(date);
};

/**
 * returns string for date
 *
 * @param {hash5.module.calendar.DateTime} date
 * @return {string}
 */
hash5.module.calendar.DateUtils.dateToString = function(date)
{
    return hash5.module.calendar.DateUtils.dateFormatter_.format(date);
};