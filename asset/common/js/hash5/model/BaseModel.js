goog.provide('hash5.model.BaseModel');
goog.provide('hash5.model.EventType');

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
 * @param {goog.events.EventHandler} eh
 * @param {Object} data
 */
hash5.model.BaseModel.prototype.bind = function(eh, data)
{
    for (var i in data)
    {
        eh.listen(this, i + 'Changed', data[i]);
    }
};

/**
 * @param {goog.events.EventHandler} eh
 * @param {Object} data
 */
hash5.model.BaseModel.prototype.unbind = function(eh, data)
{
    for (var i in data)
    {
        eh.unlisten(this, i + 'Changed', data[i]);
    }
};

/**
 * @param {Object} data
 */
hash5.model.BaseModel.prototype.update = function(data)
{
    var fireChange = false;

    for (var i in data)
    {
        if (this.hasOwnProperty(i) && this[i] != data[i])
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


/**
 * @enum {string}
 */
hash5.model.EventType = {
    DESTROY: 'destroy'
};