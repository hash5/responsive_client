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
     * @type {Array.<Object>}
     * @private
     */
    this.exclude_ = [];
    /*
    * - {index: 123} if there was an index given
 * - {date: ISODate(2012-12-23)} if there was a date given
 * - {index: 345, id: "abcd"} if there was an index with id given
 * - {warning: "Cannot parse"} with an english warning text, if the exclude tag cannot be parsed correctly
     */

    /**
     * @type {goog.date.DateTime}
     * @private
     */
    this.recend_ = null;

    /**
     * @type {Object.<*, [number, number]>}
     * @private
     */
    this.indices_ = {};
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
 * @param {[number, number]=} indices indices where date was parsed
 */
hash5.module.calendar.Event.prototype.setStartDate = function(date, indices)
{
    this.startDate_ = date;

    if(goog.isDef(indices))
    {
        this.indices_[date] = indices;
    }
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
 * @param {[number, number]=} indices indices where date was parsed
 */
hash5.module.calendar.Event.prototype.setEndDate = function(date, indices)
{
    this.endDate_ = date;

    if(goog.isDef(indices))
    {
        this.indices_[date] = indices;
    }
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
 * @param {[number, number]=} indices indices where date was parsed
 */
hash5.module.calendar.Event.prototype.setRecurrent = function(rec, indices)
{
    this.recurrent_ = rec;

    if(goog.isDef(indices))
    {
        this.indices_[rec] = indices;
    }
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
 * @param {[number, number]=} indices indices where date was parsed
 */
hash5.module.calendar.Event.prototype.setRecend = function(date, indices)
{
    this.recend_ = date;

    if(goog.isDef(indices))
    {
        this.indices_[date] = indices;
    }
};

/**
 * @return {Array.<goog.date.DateTime>}
 */
hash5.module.calendar.Event.prototype.getExcluded = function()
{
    return this.exclude_;
};

/**
 * @param {Object} exclude
 */
hash5.module.calendar.Event.prototype.addExclude = function(exclude)
{
    this.exclude_.push(exclude);
};

/**
 * @param {Array.<Object>} excluded
 */
hash5.module.calendar.Event.prototype.setExcluded = function(excluded)
{
    this.exclude_ = excluded;
};

/**
 * returns parsed indices for given date obj
 * can be used for startdate, enddate...
 *
 * @param {*} obj
 * @return {[number, number] | null}
 */
hash5.module.calendar.Event.prototype.getIndices = function(obj)
{
    return this.indices_[obj] || null;
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
