goog.provide('hash5.model.Entry');
goog.provide('hash5.model.Entry.EventType');

goog.require('goog.date.DateTime');

goog.require('hash5.model.BaseModel');
goog.require('hash5.ds.EntryStore');
goog.require('hash5.model.EntryParser');
goog.require('hash5.ds.DataSource');


// TODO remove tag logic?

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
        var store = hash5.ds.EntryStore.getInstance();
        if(cached = store.get(id))
        {
            return cached;
        }
        else
        {
            store.set(id, this);
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
     * @type {Array.<string>}
     * @private
     */
    this.mentions_ = [];

    /**
     * @type {Array.<string>}
     * @private
     */
    this.keywords_ = [];

    /**
     * @type {Array.<{string: string}>}
     * @private
     */
    this.complexTags_ = [];

    //this.user_
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

    this.dispatchEvent(hash5.model.Entry.EventType.TEXT_CHANGED);
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
 * @return {Array.<{string:string}>}
 */
hash5.model.Entry.prototype.getComplexTags = function()
{
    return this.complexTags_;
};

/**
 * @return {Array.<string>}
 */
hash5.model.Entry.prototype.getKeyWords = function()
{
    return this.keywords_;
};

/**
 * @return {Array.<string>}
 */
hash5.model.Entry.prototype.getMentions = function()
{
    return this.mentions_;
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
 * @return {hash5.model.EntryParser}
 */
hash5.model.Entry.prototype.getParsedText = function()
{
    return new hash5.model.EntryParser(this);
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
            var entryStore = hash5.ds.EntryStore.getInstance();
            entryStore.set(this.getId(), this);

            this.dispatchEvent(hash5.model.Entry.EventType.CREATED);

            if(goog.isFunction(callback))
            {
                callback.call(handler, this);
            }
        }, this);
    }
};

/**
 * deletes entry
 */
hash5.model.Entry.prototype.destroy = function()
{
    var ds = hash5.ds.DataSource.getInstance();

    if(this.id_)
    {
        ds.destroy(this);

        this.id_ = '';
    }

    this.dispatchEvent(hash5.model.EventType.DESTROY);
};


/** @inheritDoc */
hash5.model.Entry.prototype.update = function(data)
{
    // provide keyMapping because Closure Compiler will rename
    // class properties
    var keyMapping = {};

    // TODO do not check for isDef, provide only keymaping
    //

    if(goog.isDef(data['_id']))
    {
        keyMapping.id_ = data['_id'];
    }

    if(goog.isDef(data['text']))
    {
        keyMapping.text_ = data['text'];
    }

    if(goog.isDef(data['simple_tags']))
    {
        keyMapping.simpleTags_ = data['simple_tags'];
    }

    if(goog.isDef(data['complex_tags']))
    {
        keyMapping.complexTags_ = data['complex_tags'];
    }

    if(goog.isDef(data['mentions']))
    {
        keyMapping.mentions_ = data['mentions'];
    }

    if(goog.isDef(data['keywords']))
    {
        keyMapping.keywords_ = data['keywords'];
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
 * @enum {string}
 */
hash5.model.Entry.EventType = {
    CREATED: 'entry_created',
    TEXT_CHANGED: 'text_changed'
};