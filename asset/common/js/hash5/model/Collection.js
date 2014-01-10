goog.provide('hash5.model.Collection');
goog.provide('hash5.model.Collection.EventType');
goog.provide('hash5.model.Collection.ChangeEvent');
goog.provide('hash5.model.Collection.MoveEvent');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.events.EventTarget');

/**
 * Collection of BaseModel classes.
 * Maintains event propagation from each model to collection.
 *
 * @constructor
 * @template T
 * @extends {goog.events.EventTarget}
 */
hash5.model.Collection = function()
{
    goog.base(this);

    /**
     * @type {Array.<T>}
     * @private
     */
    this.data_ = [];

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = new goog.events.EventHandler(this);
};
goog.inherits(hash5.model.Collection, goog.events.EventTarget);

/**
 * Whether the collection contains the given object.
 *
 * @param {*} obj The object for which to test.
 * @param {boolean=} opt_idCompare
 * @return {boolean} true if obj is present.
 */
hash5.model.Collection.prototype.contains = function(obj, opt_idCompare)
{
    if (opt_idCompare)
    {
        return !!this.getById(obj.id);
    }
    else
    {
        return goog.array.contains(this.data_, obj);
    }
};

/**
 * Returns number of elements in collection.
 *
 * @return {number}
 */
hash5.model.Collection.prototype.count = function()
{
    return this.data_.length;
};

/**
 * Calls a function for each element in an array.
 *
 * @param {Function} f The function to call for every element. This function
 *     takes 3 arguments (the element, the index and the array). The return
 *     value is ignored. The function is called only for indexes of the array
 *     which have assigned values; it is not called for indexes which have
 *     been deleted or which have never been assigned values.
 *
 * @param {Object=} opt_obj The object to be used as the value of 'this'
 *     within f.
 */
hash5.model.Collection.prototype.forEach = function(f, opt_obj)
{
    goog.array.forEach(this.data_, f, opt_obj);
};

/**
 * Iterates through elements in collection backwards.
 * @param {Function} f The function to call for every element. This function
 *     takes 3 arguments (the element, the index and the array). The return
 *     value is ignored. The function is called only for indexes of the array
 *     which have assigned values; it is not called for indexes which have
 *     been deleted or which have never been assigned values.
 *
 * @param {Object=} opt_obj The object to be used as the value of 'this'
 *     within f.
 */
hash5.model.Collection.prototype.forEachRight = function(f, opt_obj)
{
    goog.array.forEachRight(this.data_, f, opt_obj);
};

/**
 * @return {*}
 */
hash5.model.Collection.prototype.getAt = function(index)
{
    return this.data_[index];
};

/**
 * Returns model with specified ID.
 *
 * @param {number} id
 * @return {T}
 */
hash5.model.Collection.prototype.getById = function(id)
{
    var found = null;
    goog.array.forEach(this.data_, function(item) {
        if (item.id === id)
        {
            found = item;
        }
    });

    return found;
};

/**
 * Pushes an item into an array, if it's not already in the array.
 *
 * @param {T} item Value to add.
 */
hash5.model.Collection.prototype.insert = function(item)
{
     // TODO better check istance of...
    if(goog.isFunction(item.setParentEventTarget))
    {
        item.setParentEventTarget(this);
    }

    goog.array.insert(this.data_, item);

    this.dispatchEvent({
        type: hash5.model.Collection.EventType.INSERT,
        item: item,
        index: this.data_.length - 1
    });
};

/**
 * Inserts an object at the given index of the array.
 *
 * @param {T} item The object to insert.
 * @param {number=} index The index at which to insert the object. If omitted,
 *      treated as 0. A negative index is counted from the end of the array.
 */
hash5.model.Collection.prototype.insertAt = function(item, index)
{
     // TODO better check istance of...
    if(goog.isFunction(item.setParentEventTarget))
    {
        item.setParentEventTarget(this);
    }

    goog.array.insertAt(this.data_, item, index);

    this.dispatchEvent({
        type: hash5.model.Collection.EventType.INSERT,
        item: item,
        index: index
    });
};

/**
 * Returns index of specified model in collection. Returns -1 if element not found.
 *
 * @param {T} item
 * @return {number}
 */
hash5.model.Collection.prototype.indexOf = function(item)
{
    return goog.array.indexOf(this.data_, item);
};

/**
 * @param {number} oldIndex
 * @param {number} newIndex
 */
hash5.model.Collection.prototype.move = function(oldIndex, newIndex)
{
    if (oldIndex == newIndex)
    {
        return;
    }

    var item = this.data_[oldIndex];

    goog.array.removeAt(this.data_, oldIndex);
    goog.array.insertAt(this.data_, item, newIndex);

    this.dispatchEvent({
        type: hash5.model.Collection.EventType.MOVE,
        oldIndex: oldIndex,
        newIndex: newIndex
    });
};

/**
 * Removes the first occurrence of a particular value from an array.
 * @param {T} item Object to remove.
 * @return {boolean} True if an element was removed.
 */
hash5.model.Collection.prototype.remove = function(item)
{
    var index = this.indexOf(item);
    return this.removeAt(index);
};

/**
 * Removes from an array the element at index i
 * @param {number} index The index to remove.
 * @return {boolean} True if an element was removed.
 */
hash5.model.Collection.prototype.removeAt = function(index)
{

    var item = this.data_[index],
        removed = goog.array.remove(this.data_, item);

    if (removed)
    {
         // TODO better check istance of...
        if(goog.isFunction(item.setParentEventTarget))
        {
            item.setParentEventTarget(null);
        }

        this.dispatchEvent({
            type: hash5.model.Collection.EventType.REMOVE,
            index: index,
            item: item
        });
    }

    return removed;
};

/**
 * Serializes collection
 *
 * @return Array.<T>
 */
hash5.model.Collection.prototype.serialize = function()
{
   var data = [];
   goog.array.forEach(this.data_, function(item) {
       data.push(item.serialize());
   });
   return data;
};

/**
 * Events associated with collection
 * @enum {string}
 */
hash5.model.Collection.EventType = {
    INSERT: 'insert',
    CHANGE: goog.events.EventType.CHANGE,
    MOVE: 'move',
    REMOVE: 'remove'
};

/**
 * @constructor
 * @param {string} type Event Type.
 * @param {T=} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @extends {goog.events.Event}
 */
hash5.model.Collection.ChangeEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * @type {T}
     */
    this.item = null;

    /**
     * @type {number}
     */
    this.index = 0;
};
goog.inherits(hash5.model.Collection.ChangeEvent, goog.events.Event);

/**
 * @constructor
 * @param {string} type Event Type.
 * @param {Object=} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @extends {goog.events.Event}
 */
hash5.model.Collection.MoveEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * @type {number}
     */
    this.oldIndex = 0;

    /**
     * @type {number}
     */
    this.newIndex = 0;
};
goog.inherits(hash5.model.Collection.MoveEvent, goog.events.Event);