goog.provide('hash5.module.calendar.DateTime');

goog.require('goog.date.DateTime');

/**
 * @param {Date=} date
 * @constructor
 * @extends {goog.date.DateTime}
 */
hash5.module.calendar.DateTime = function(date)
{
    goog.base(this, date || 0);

    /**
     * @type {boolean}
     * @private
     */
    this.hasTime_ = false;
};
goog.inherits(hash5.module.calendar.DateTime, goog.date.DateTime);


/**
 * @return {boolean}
 */
hash5.module.calendar.DateTime.prototype.hasTime = function()
{
    return this.hasTime_;
};

/**
 * @param {boolean} hasTime
 */
hash5.module.calendar.DateTime.prototype.setHasTime = function(hasTime)
{
    this.hasTime_ = true;
};

/**
 * @return {string}
 */
hash5.module.calendar.DateTime.prototype.toString = function()
{
    return hash5.module.calendar.DateUtils.dateTimeToString(this);
};

/**
 * @return {string}
 */
hash5.module.calendar.DateTime.prototype.getTimeString = function()
{
    return hash5.module.calendar.DateUtils.timeToString(this);
};


/**
 * @return {!hash5.module.calendar.DateTime} A clone of the datetime object.
 * @override
 */
hash5.module.calendar.DateTime.prototype.clone = function()
{
  var date = new hash5.module.calendar.DateTime(this.date);
  date.hasTime_ = this.hasTime_;
  return date;
};


/**
 * Creates a DateTime from a datetime string expressed in ISO 8601 format.
 *
 * @param {string} formatted A date or datetime expressed in ISO 8601 format.
 * @return {hash5.module.calendar.DateTime} Parsed date or null if parse fails.
 */
hash5.module.calendar.DateTime.fromIsoString = function(formatted) {
  var ret = new hash5.module.calendar.DateTime();
  return goog.date.setIso8601DateTime(ret, formatted) ? ret : null;
};