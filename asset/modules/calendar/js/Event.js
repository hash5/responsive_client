goog.provide('hash5.module.calendar.Event');

goog.require('hash5.module.calendar.DateTime');
goog.require('hash5.module.calendar.Duration');
goog.require('hash5.ui.editor.EventType');

/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.module.calendar.Event = function()
{
    goog.base(this);

    /**
     * @type {hash5.module.calendar.DateTime}
     * @private
     */
    this.startDate_ = null;

    /**
     * @type {hash5.module.calendar.DateTime}
     * @private
     */
    this.endDate_ = null;

    /**
     * @type {hash5.module.calendar.Duration}
     * @private
     */
    this.recurrent_ = null;

    /**
     * @type {Array.<Object>}
     * @private
     */
    this.exclude_ = [];
    // TODO
    /*
    * - {index: 123} if there was an index given
 * - {date: ISODate(2012-12-23)} if there was a date given
 * - {index: 345, id: "abcd"} if there was an index with id given
 * - {warning: "Cannot parse"} with an english warning text, if the exclude tag cannot be parsed correctly
     */

    /**
     * @type {hash5.module.calendar.DateTime}
     * @private
     */
    this.recend_ = null;

    /**
     * @type {Object.<string, [number, number]>}
     * @private
     */
    this.indices_ = {};
};
goog.inherits(hash5.module.calendar.Event, goog.events.EventTarget);

/**
 * used to create event obj from server json
 *
 * @param {Object} data
 * @return {hash5.module.calendar.Event}
 */
hash5.module.calendar.Event.factory = function(data)
{
    var dateParser = hash5.module.calendar.DateTime.fromIsoString;

    var entryDate = new hash5.module.calendar.Event();
    entryDate.startDate_ = data['start'] ? dateParser(data['start']) : null;
    entryDate.endDate_ = data['end'] ? dateParser(data['end']) : null;
    entryDate.recurrent_ = data['recurrent'] ? hash5.module.calendar.Duration.fromJson(data['recurrent'])  : null;
    entryDate.recend_ = data['recend'] ? dateParser(data['recend']) : null;

    if(goog.isArray(data['exclude'])) {
        for(var i = 0; i < data['exclude'].length; i++) {
            entryDate.exclude_.push(dateParser(data['exclude'][i]));
        }
    }

    return entryDate;
}


/**
 * @return {hash5.module.calendar.DateTime}
 */
hash5.module.calendar.Event.prototype.getStartDate = function()
{
    return this.startDate_;
};

/**
 * @param {hash5.module.calendar.DateTime} date
 * @param {[number, number]=} indices indices where date was parsed
 * @param {boolean=} queued if set to true, queued tag change will be dispatched
 */
hash5.module.calendar.Event.prototype.setStartDate = function(date, indices, queued)
{
    this.startDate_ = date;

    if(goog.isDef(indices)) {
        this.indices_['start'] = indices;
    } else {
        this.dispatchEvent({
            type: hash5.ui.editor.EventType.CHANGED_TAG,
            tagName: 'start',
            value: date.toString(),
            indices: this.indices_['start'],
            queued: !!queued
        });
    }
};


/**
 * @return {hash5.module.calendar.DateTime}
 */
hash5.module.calendar.Event.prototype.getEndDate = function()
{
    return this.endDate_;
};

/**
 * @param {hash5.module.calendar.DateTime} date
 * @param {[number, number]=} indices indices where date was parsed
 * @param {boolean=} queued if set to true, queued tag change will be dispatched
 */
hash5.module.calendar.Event.prototype.setEndDate = function(date, indices, queued)
{
    this.endDate_ = date;

    if(goog.isDef(indices)) {
        this.indices_['end'] = indices;
    } else {
        var value = '';

        // only write time if start&end is at the same day and time is set
        if(this.endDate_.hasTime() && goog.date.isSameDay(this.startDate_, this.endDate_)) {
            value = date.getTimeString();
        } else {
            value = date.toString();
        }

        this.dispatchEvent({
            type: hash5.ui.editor.EventType.CHANGED_TAG,
            tagName: 'end',
            value: value,
            indices: this.indices_['end'],
            queued: !!queued
        });
    }
};

/**
 * sets hasTime for start and end date
 * @param {boolean} hasTime
 */
hash5.module.calendar.Event.prototype.setHasTime = function(hasTime)
{
    this.startDate_.setHasTime(hasTime);
    this.endDate_.setHasTime(hasTime);

    // trigger update events
    this.setStartDate(this.startDate_, undefined, true);
    this.setEndDate(this.endDate_, undefined, true);

    this.dispatchUpdateEvent();
};

/**
 * returns true if start or enddate has a time set
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.hasTime = function()
{
    return this.startDate_.hasTime() || this.endDate_.hasTime()
};


/**
 * @return {hash5.module.calendar.Duration}
 */
hash5.module.calendar.Event.prototype.getRecurrent = function()
{
    return this.recurrent_;
};

/**
 * @param {hash5.module.calendar.Duration} rec
 * @param {[number, number]=} indices indices where date was parsed
 */
hash5.module.calendar.Event.prototype.setRecurrent = function(rec, indices)
{
    this.recurrent_ = rec;

    if(goog.isDef(indices)) {
        this.indices_['recurrent'] = indices;
    } else {
        this.dispatchEvent({
            type: hash5.ui.editor.EventType.CHANGED_TAG,
            tagName: 'recurrent',
            value: rec ? rec.toString() : '',
            indices: this.indices_['recurrent'],
            removeTag: !rec
        });
    }
};

/**
 * @return {hash5.module.calendar.DateTime}
 */
hash5.module.calendar.Event.prototype.getRecend = function()
{
    return this.recend_;
};

/**
 * @param {hash5.module.calendar.DateTime} date
 * @param {[number, number]=} indices indices where date was parsed
 */
hash5.module.calendar.Event.prototype.setRecend = function(date, indices)
{
    this.recend_ = date;

    if(goog.isDef(indices)) {
        this.indices_['recend'] = indices;
    } else {
        this.dispatchEvent({
            type: hash5.ui.editor.EventType.CHANGED_TAG,
            tagName: 'recend',
            value: date ? date.toString() : '',
            indices: this.indices_['recend'],
            removeTag: !date
        });
    }
};

/**
 * @return {Array.<hash5.module.calendar.DateTime>}
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
 * returns parsed indices for given date key
 * can be used for startdate, enddate...
 *
 * @param {string} key
 * @return {[number, number] | null}
 */
hash5.module.calendar.Event.prototype.getIndices = function(key)
{
    return this.indices_[key] || null;
};

/**
 * update indices
 *
 * @param {hash5.module.calendar.Event} newIndices
 */
hash5.module.calendar.Event.prototype.updateIndices = function(newIndices)
{
    return this.indices_ = newIndices.indices_;
};

/**
 * calls remove event for all current parsed tags
 */
hash5.module.calendar.Event.prototype.removeAllTags = function()
{
    for (var key in this.indices_) {
        this.dispatchEvent({
            type: hash5.ui.editor.EventType.CHANGED_TAG,
            tagName: key,
            indices: this.indices_[key],
            removeTag: true,
            queued: true
        });
    }

    this.dispatchUpdateEvent();
};

hash5.module.calendar.Event.prototype.dispatchUpdateEvent = function()
{
    this.dispatchEvent(hash5.ui.editor.EventType.CHANGED_TAG_UPDATE);
};

/**
 * @param {hash5.module.calendar.Event} event
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.equals = function(event)
{
    return this.equalObjs_(this.startDate_, event.startDate_)
        && this.equalObjs_(this.endDate_, event.endDate_)
        && this.equalObjs_(this.recurrent_, event.recurrent_)
        && this.equalObjs_(this.recend_, event.recend_)
        && this.equalDateArrs_(this.exclude_, event.exclude_);
};

/**
 * @param {hash5.module.calendar.DateTime|hash5.module.calendar.Duration} o1
 * @param {hash5.module.calendar.DateTime|hash5.module.calendar.Duration} o2
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.equalObjs_ = function(o1, o2)
{
    if((o1 && !o2) || (!o1 && o2))
        return false;

    return (!o1 && !o2) || o1.equals(o2);
};

/**
 * @param {Array.<hash5.module.calendar.DateTime>} dates1
 * @param {Array.<hash5.module.calendar.DateTime>} dates2
 * @return {boolean}
 */
hash5.module.calendar.Event.prototype.equalDateArrs_ = function(dates1, dates2)
{
    return goog.array.equals(dates1, dates2, function(date1, date2){
        return date1.equals(date2);
    });
};
