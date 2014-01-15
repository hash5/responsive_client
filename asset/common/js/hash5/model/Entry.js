goog.provide('hash5.model.Entry');
goog.provide('hash5.model.Entry.EntryStore');

goog.require('goog.date.DateTime');

goog.require('hash5.model.BaseModel');
goog.require('hash5.ds.Store');

/**
 * @param {string=} id
 *
 * @constructor
 * @extends {hash5.model.BaseModel}
 */
hash5.model.Entry = function(id)
{
    goog.base(this);

    // make sure that same entries are represented by the same object
    var cached;
    if(goog.isDef(id))
    {
        if(cached = hash5.model.Entry.EntryStore.get(id))
        {
            return cached;
        }
        else
        {
            hash5.model.Entry.EntryStore.set(id, this);
        }
    }

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
     * @type {goog.date.DateTime}
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
 * @param {Object} data
 * @return {hash5.model.Entry}
 */
hash5.model.Entry.factory = function(data)
{
    var entry = new hash5.model.Entry(data['_id']);
    entry.update(data);

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
 * @param {goog.date.DateTime} date
 */
hash5.model.Entry.prototype.setCreatedDate = function(date)
{
    this.createDate_ = date;
};

/**
 * @return {goog.date.DateTime}
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


// ---------------- persistence functions: ----------------

/**
 * fetches all properties from the server
 * changing properties can be catched with bindings
 *
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.model.Entry.prototype.fetch = function(callback, handler)
{
    var ds = hash5.ds.DataSource.getInstance();
    ds.fetch(this, callback, handler);
};


/**
 * sends current modifications to the server
 *
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.model.Entry.prototype.save = function(callback, handler)
{
    var ds = hash5.ds.DataSource.getInstance();

    if(this.getId())
    {
        ds.save(this, callback, handler);
    }
    else
    {
        // if no id is set, save will create a new entry on server
        ds.save(this, function(){
            // make sure to save entry in entryStore
            hash5.model.Entry.EntryStore.set(this.getId(), this);

            if(goog.isFunction(callback))
            {
                callback.call(handler, model);
            }
        }, this);
    }
};

/**
 * deletes entry
 *
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.model.Entry.prototype.delete = function(callback, handler)
{
    var ds = hash5.ds.DataSource.getInstance();

    if(this.id_)
    {
        ds.delete(this);
        hash5.model.Entry.EntryStore.remove(this.id_);
    }
};


/** @inheritDoc */
hash5.model.Entry.prototype.update = function(data)
{
    // provide keyMapping because Closure Compiler will rename
    // class properties
    var keyMapping = {};

    if(goog.isDef(data['_id']))
    {
        keyMapping.id_ = data['_id'];
    }

    if(goog.isDef(data['text']))
    {
        keyMapping.text_ = data['text'];
    }

    if(goog.isDef(data['created_date']))
    {
        if(goog.isString(data['created_date']))
        {
            keyMapping.createDate_ = goog.date.fromIsoString(data['created_date']);
        }
        else
        {
            keyMapping.createDate_ = data['created_date'];
        }
    }

    goog.base(this, 'update', keyMapping);
};

/** @inheritDoc */
hash5.model.Entry.prototype.serialize = function()
{
    return {
        'text': this.text_
    };
};


/**
 * store to cache Entry objects
 *
 * @type {hash5.ds.Store.<hash5.model.Entry>}
 */
hash5.model.Entry.EntryStore = new hash5.ds.Store();