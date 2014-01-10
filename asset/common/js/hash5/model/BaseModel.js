goog.provide('hash5.model.BaseModel');

goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.model.BaseModel = function()
{
    goog.base(this);

};
goog.inherits(hash5.model.BaseModel, goog.events.EventTarget);

/**
 * @param {Object} data
 */
hash5.model.BaseModel.prototype.update = function(data)
{
    var fireChange = false;

    for (var i in data)
    {
        if (this[i] != data[i])
        {
            this[i] = data[i];
            fireChange = true;
            this.dispatchEvent(i + 'Changed');
        }
    }

    if (fireChange)
    {
        this.dispatchEvent(goog.events.EventType.CHANGE);
    }
};

/**
 * @return {!Object}
 */
hash5.model.BaseModel.prototype.serialize = function()
{
    return {};
};