goog.provide('hash5.model.Entry');

goog.require('hash5.model.BaseModel');

/**
 * @constructor
 * @extends {hash5.model.BaseModel}
 */
hash5.model.Entry = function()
{
    goog.base(this);

    /**
     * @type {string}
     * @private
     */
    this.text_ = '';
};
goog.inherits(hash5.model.Entry, hash5.model.BaseModel);

/**
 * @param {*} data
 * @return {hash5.model.Entry}
 */
hash5.model.Entry.factory = function(data)
{
    var entry = new hash5.model.Entry();

    entry.setText(data['text']);

    return entry;
}

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

/** @inheritDoc */
hash5.model.Entry.prototype.serialize = function()
{
    return {
        'text': this.text_
    };
}