goog.provide('hash5.model.Entry');
goog.provide('hash5.model.Entry.EventType');

goog.require('goog.date.DateTime');

goog.require('hash5.model.BaseModel');
goog.require('hash5.ds.EntryStore');
goog.require('hash5.ds.DataSource');
goog.require('hash5.parsing.Parser');
goog.require('hash5.parsing.EntryTextParser');

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
     * @type {hash5.parsing.Parser}
     * @private
     */
    this.parser_ = null;

    /**
     * @type {hash5.parsing.EntryTextParser}
     * @private
     */
    this.textParser_ = null;

    /**
     * @type {Object}
     * @private
     */
    this.serverObj_ = null;
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
    this.textParser_ = null;

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
 * @return {Object}
 */
hash5.model.Entry.prototype.getServerObj = function()
{
    return this.serverObj_;
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
    return this.createDate_ || new goog.date.DateTime();
};

/**
 * returns new or cached entry parser
 *
 * @return {hash5.parsing.Parser}
 */
hash5.model.Entry.prototype.getParser = function(newParser)
{
    if(!this.parser_)
    {
        this.parser_ = new hash5.parsing.Parser(this.text_, this);
        this.parser_.setParsingResult(this.serverObj_ || {});
    }

    // TODO update parsingResult on server fetch...

    return this.parser_;
};


/**
 * returns new or cached parser to display an entry body
 *
 * @return {hash5.parsing.EntryTextParser}
 */
hash5.model.Entry.prototype.getTextParser = function()
{
    return this.textParser_ ||
        (this.textParser_ = new hash5.parsing.EntryTextParser(this, this.getParser()));
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

    this.serverObj_ = data;

    // provide keyMapping because Closure Compiler will rename
    // class properties
    var keyMapping = {};

    // TODO do not check for isDef, provide only keymaping
    // include this in factory...

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
 * @enum {string}
 */
hash5.model.Entry.EventType = {
    CREATED: 'entry_created',
    TEXT_CHANGED: 'text_changed'
};