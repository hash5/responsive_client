goog.provide('hash5.module.calendar.DateTime');

goog.require('goog.date.DateTime');

/**
 * @param {Date=} date
 * @constructor
 * @extends {goog.date.DateTime}
 */
hash5.module.calendar.DateTime = function(date)
{
    goog.base(this, date);

    /**
     * @type {boolean}
     * @private
     */
    this.hasTime_ = false;

    /**
     * @type {Date}
     * @private
     */
    this.date_ = date || null;
};
goog.inherits(hash5.module.calendar.DateTime. goog.date.DateTime);

/**
 * @return {Date}
 */
hash5.module.calendar.DateTime.prototype.getDate = function()
{
    return this.date_;
};


/**
 * @return {boolean}
 */
hash5.module.calendar.DateTime.prototype.hasTime = function()
{
    return this.hasTime_;
};

/**
 * @param {date} time
 */
hash5.module.calendar.DateTime.prototype.setTime = function(time)
{
    // TODO
};

/**
 * @param {date} date
 * @param {boolean=} containsTime
 */
hash5.module.calendar.DateTime.prototype.setDate = function(date, containsTime)
{
    this.date_ = date;
    this.hasTime_ = !!containsTime;
};

