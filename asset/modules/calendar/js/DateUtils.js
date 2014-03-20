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
   new goog.i18n.DateTimeParse("yyy-MM-dd"),
   new goog.i18n.DateTimeParse("yyy/MM/dd HH:mm"),
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
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.DateUtils.stringToDate = function(text)
{
  if(!text)
    return null;

  var date = new goog.date.DateTime();
  var parsers = hash5.module.calendar.DateUtils.dateParsers_;

  // TODO parse date and time seperatly to check if time was parsed

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

  if(!dateAndTime) {
    var newDate = startDate.clone();

    if(hash5.module.calendar.DateUtils.timeParser_.parse(text, newDate) > 0)
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