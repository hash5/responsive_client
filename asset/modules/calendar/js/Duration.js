goog.provide('hash5.module.calendar.Duration');
goog.provide('hash5.module.calendar.Duration.Types');



/**
 * simple dataunit to work with hash5 durations
 * factory functions to create / extract durations from strings
 *
 * @param {number} number
 * @param {string} unit
 * @constructor
 */
hash5.module.calendar.Duration = function(number, unit)
{
    /**
     * @type {number}
     */
    this.number = number;

    /**
     * @type {string}
     */
    this.unit = unit;
};


/**
 * @return {string}
 */
hash5.module.calendar.Duration.prototype.toString = function()
{
    return this.number + this.unit;
};

/**
 * @return {Object}
 */
hash5.module.calendar.Duration.prototype.toJson = function()
{
    var types = hash5.module.calendar.Duration.Types;

    var days = (this.unit === types.DAILY ? this.number : false)
                || (this.unit === types.WEEKLY ? this.number * 7 : 0);

    return {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: days,
        months: this.unit === types.MONTHLY ? this.number : 0,
        years: this.unit === types.YEARLY ? this.number : 0
    };
};

/**
 * @param {hash5.module.calendar.Duration} duration
 * @return {boolean}
 */
hash5.module.calendar.Duration.prototype.equals = function(duration)
{
    return !!duration
        && duration.number === this.number
        && duration.unit === this.unit;
};

/**
 * @enum {string}
 */
hash5.module.calendar.Duration.Types = {
    DAILY: 'd',
    WEEKLY: 'w',
    MONTHLY: 'm',
    YEARLY: 'y'
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
 * @return {hash5.module.calendar.Duration}
 */
hash5.module.calendar.Duration.fromString = function(text)
{
    var regex = /^(\d+)([dwmy])$/;
    var result = regex.exec(text.toLowerCase());

    if(result === null) {
        return null;
    }

    var number = parseInt(result[1], 10),
        unit = result[2],
        duration = new hash5.module.calendar.Duration(number, unit);

    return duration;
};

/**
 * creates a Duration Object from json config
 *
 * example:
 * "recurrent": {
 *     "seconds": 0,
 *     "minutes": 0,
 *     "hours": 0,
 *     "days": 14,
 *     "months": 0,
 *     "years": 0
 * } --> '2w'
 *
 * @param  {Object} json
 * @return {hash5.module.calendar.Duration}
 */
hash5.module.calendar.Duration.fromJson = function(json)
{
    var types = hash5.module.calendar.Duration.Types;

    var number = 0,
        unit = types.DAILY;

    for(var longUnit in json)
    {
        if(json[longUnit] > 0)
        {
            number = json[longUnit];

            switch(longUnit){
                case 'days':
                    if(number % 7 === 0)
                    {
                        unit = types.WEEKLY;
                        number = number / 7;
                    }
                    else
                    {
                        unit = types.DAILY;
                    }
                    break;

                case 'months':
                    unit = types.MONTHLY;
                    break;

                case 'years':
                    unit = types.YEARLY;
                    break;
            };

            break;
        }
    }

    return new hash5.module.calendar.Duration(number, unit);
};