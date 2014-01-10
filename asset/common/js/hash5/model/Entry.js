goog.provide('hash5.model.Entry');

goog.require('goog.date.Date');

goog.require('hash5.model.BaseModel');

/**
 * @param {string=} id
 *
 * @constructor
 * @extends {hash5.model.BaseModel}
 */
hash5.model.Entry = function(id)
{
    goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.id_ = id || '';

    /**
     * @type {string}
     * @private
     */
    this.text_ = '';

    /**
     * @type {goog.date.Date}
     * @private
     */
    this.createDate_ = null;

    /**
     * @type {Array.<string>}
     * @private
     */
    this.simpleTags_ = [];

    /**
     * @type {Array.<{string: string}>}
     * @private
     */
    this.complexTags_ = [];

    //this.user_
    //this.mentions_
    //this.keywords_
};
goog.inherits(hash5.model.Entry, hash5.model.BaseModel);

/**
 * @param {*} data
 * @return {hash5.model.Entry}
 */
hash5.model.Entry.factory = function(data)
{
    var entry = new hash5.model.Entry(data['_id']);

    entry.setText(data['text']);
    entry.setCreatedDate(goog.date.fromIsoString(data['created_date']));

    return entry;
}


/**
 * @return {string}
 */
hash5.model.Entry.prototype.getId = function()
{
    return this.id_;
};

/**
 * @param {string} text
 */
hash5.model.Entry.prototype.setText = function(text)
{
    this.text_ = text;
};

/**
 * @return {string}
 */
hash5.model.Entry.prototype.getText = function()
{
    return this.text_;
};

/**
 * @return {Array.<string>}
 */
hash5.model.Entry.prototype.getSimpleTags = function()
{
    return this.simpleTags_;
};

/**
 * @param {string} date
 */
hash5.model.Entry.prototype.setCreatedDate = function(date)
{
    this.createDate_ = date;
};

/**
 * @return {goog.date.Date}
 */
hash5.model.Entry.prototype.getCreatedDate = function()
{
    return this.createDate_;
};

/**
 * @return {Array.<{string:string}>}
 */
hash5.model.Entry.prototype.getComplexTags = function()
{
    return this.complexTags_;
};

/** @inheritDoc */
hash5.model.Entry.prototype.update = function(data)
{
    // TODO provide keyMapping

    goog.base(this, 'update', data);
};

/** @inheritDoc */
hash5.model.Entry.prototype.serialize = function()
{
    return {
        'text': this.text_
    };
};