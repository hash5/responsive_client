goog.provide('hash5.module.calendar.Event');

goog.require('goog.date.DateTime');

/**
 *
 * @constructor
 */
hash5.module.calendar.Event = function()
{

    /**
     * @type {goog.date.DateTime}
     * @private
     */
    this.startDate_ = null;

    /**
     * @type {goog.date.DateTime}
     * @private
     */
    this.endDate_ = null;

    /**
     * @type {Object}
     * @private
     */
    this.recurrent_ = null;

    /**
     * @type {Array.<goog.date.DateTime>}
     * @private
     */
    this.exclude_ = [];

    /**
     * @type {goog.date.DateTime}
     * @private
     */
    this.recend_ = null;
};

/**
 * used to create event obj from server json
 *
 * @param {Object} data
 * @return {hash5.module.calendar.Event}
 */
hash5.module.calendar.Event.factory = function(data)
{
    var entryDate = new hash5.module.calendar.Event();
    entryDate.startDate_ = data['start'] ? goog.date.fromIsoString(data['start']) : null;
    entryDate.endDate_ = data['end'] ? goog.date.fromIsoString(data['end']) : null;
    entryDate.recurrent_ = data['recurrent'] || null;
    entryDate.recend_ = data['recend'] ? goog.date.fromIsoString(data['recend']) : null;

    if(goog.isArray(data['exclude']))
    {
        for(var i = 0; i < data['exclude'].length; i++)
        {
            entryDate.exclude_.push(goog.date.fromIsoString(data['exclude'][i]));
        }
    }

    return entryDate;
}


/**
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.Event.prototype.getStartDate = function()
{
    return this.startDate_;
};

/**
 * @param {goog.date.DateTime} date
 */
hash5.module.calendar.Event.prototype.setStartDate = function(date)
{
    this.startDate_ = date;
};


/**
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.Event.prototype.getEndDate = function()
{
    return this.endDate_;
};

/**
 * @param {goog.date.DateTime} date
 */
hash5.module.calendar.Event.prototype.setEndDate = function(date)
{
    this.endDate_ = date;
};


/**
 * @return {Object}
 */
hash5.module.calendar.Event.prototype.getRecurrent = function()
{
    return this.recurrent_;
};

/**
 * @param {Object} rec
 */
hash5.module.calendar.Event.prototype.setRecurrent = function(rec)
{
    this.recurrent_ = rec;
};

/**
 * @return {goog.date.DateTime}
 */
hash5.module.calendar.Event.prototype.getRecend = function()
{
    return this.recend_;
};

/**
 * @param {goog.date.DateTime} date
 */
hash5.module.calendar.Event.prototype.setRecend = function(date)
{
    this.recend_ = date;
};


/**
 * @param {hash5.module.calendar.Event} event
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.equals = function(event)
{
    return this.equalDates_(this.startDate_, event.startDate_)
        && this.equalDates_(this.endDate_, event.endDate_)
        //&& this.equalDates_(this.recurrent_, event.recurrent_) // TODO
        && this.equalDates_(this.recend_, event.recend_)
        && this.equalDateArrs_(this.exclude_, event.exclude_);
};

/**
 * @param {goog.date.DateTime} date1
 * @param {goog.date.DateTime} date2
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.equalDates_ = function(date1, date2)
{
    if((date1 && !date2) || (!date1 && date2))
        return false;

    return (!date1 && !date2) || date1.equals(date2);
};

/**
 * @param {Array.<goog.date.DateTime>} dates1
 * @param {Array.<goog.date.DateTime>} dates2
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.equalDateArrs_ = function(dates1, dates2)
{
    return goog.array.equals(dates1, dates2, function(date1, date2){
        return date1.equals(date2);
    });
};
