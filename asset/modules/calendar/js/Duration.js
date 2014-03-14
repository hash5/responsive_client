goog.provide('hash5.module.calendar.Duration');



/**
 * @constructor
 */
hash5.module.calendar.Duration = function()
{

/*
exports.durationToJson = function(duration) {
  return {
    seconds: duration.seconds(),
    minutes: duration.minutes(),
    hours: duration.hours(),
    days: duration.days(),
    months: duration.months(),
    years: duration.years()
  };
};
 */
};

/**
 * Returns the recurrent text as a Duration Object
 *
 * Examples for valid durations are "12d", "3w", "7m" or "2y".
 * The method works with upper- and lowercase letters.
 *
 * If the duration cannot be parsed null will be returned.
 *
 * @param  {string} text
 * @return {goog.date.Datetime}
 */
hash5.module.calendar.Duration.fromString = function(text)
{
    var regex = /^(\d+)([dwmy])$/;
    var result = regex.exec(text.toLowerCase());

    if(result === null) {
        return null;
    }

    var number = parseInt(result[1], 10);
    var unit = (result[2] === "m") ? "M" : result[2];
    var duration = new hash5.module.calendar.Duration();

    // TODO

    return duration;
};