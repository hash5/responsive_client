goog.provide('hash5.ds.DataSource');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.Uri.QueryData');
goog.require('goog.net.XhrManager');

goog.require('hash5.model.EntryCollection');

// TODO - use xhrManager

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ds.DataSource = function()
{
    goog.base(this);

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = null;

    /**
     * @type {goog.net.XhrManager}
     * @private
     */
    this.xhr_ = new goog.net.XhrManager();

    this.index_ = 0;
};
goog.inherits(hash5.ds.DataSource, goog.events.EventTarget);
goog.addSingletonGetter(hash5.ds.DataSource);

/**
 * @return {goog.events.EventHandler}
 */
hash5.ds.DataSource.prototype.getHandler = function() {
    return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
};


hash5.ds.DataSource.prototype.send = function(url, method, content, callback)
{
    this.xhr_.send(this.index_++ + '', '/entries', 'GET', content, undefined, undefined, callback);
};

/**
 *
 *
 * @param {hash5.model.EntryCollection=} collection optional collection. if no collection will be assign, a new one will be created
 * @return {hash5.model.EntryCollection} collection where result entries should be added
 */
hash5.ds.DataSource.prototype.newestEntries = function(collection)
{
    if(!collection)
    {
        collection = new hash5.model.EntryCollection();
    }

    collection.startLoadingEntries();

    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var entries = this.decodeResultJson_(e.target.getResponseJson());

        collection.merge(entries);

        collection.finishedLoadingEntries();
    }, false, this);
    xhr.send('/entries');

    return collection;
};

/**
 * fetches all properties from server
 *
 * @param  {hash5.model.BaseModel} model
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.ds.DataSource.prototype.fetch = function(model, callback, handler)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var response = e.target.getResponseJson();
        model.update(response);

        if(goog.isFunction(callback))
        {
            callback.call(handler, model);
        }
    }, false, this);

    xhr.send('/entries/' + model.getId(), 'GET', goog.Uri.QueryData.createFromMap(model.serialize()).toString());
};

/**
 * saves model to server
 * if model has no id, a new entry will be created, otherwise entry will be updated
 *
 * @param  {hash5.model.BaseModel} model
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.ds.DataSource.prototype.save = function(model, callback, handler)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var response = e.target.getResponseJson();
        model.update(response);

        if(goog.isFunction(callback))
        {
            callback.call(handler, model);
        }
    }, false, this);

    var data = goog.Uri.QueryData.createFromMap(model.serialize()).toString();

    if(model.getId())
    {
        xhr.send('/entries/' + model.getId(), 'PUT', data);
    }
    else
    {
        xhr.send('/entries', 'POST', data);
    }
};


/**
 * deletes model from server
 *
 * @param  {hash5.model.BaseModel} model
 */
hash5.ds.DataSource.prototype.destroy = function(model)
{
    var xhr = new goog.net.XhrIo();
    xhr.send('/entries/' + model.getId(), 'DELETE');
};

/**
 * @param {Function=} callback
 * @param {*=} handler
 * @return {*}
 */
hash5.ds.DataSource.prototype.loadUsersettings = function(callback, handler)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        callback.call(handler, e.getResponseJson());
    }, false, this);
    xhr.send('/usersettings');
};

/**
 * searches for entries with given searchStr
 * results will be added to collection.
 *
 * @param  {string} searchStr
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.ds.DataSource.prototype.search = function(searchStr, collection, callback, handler)
{
    return this.getEntries('/entries?query=' + encodeURIComponent(searchStr), collection, callback, handler);
};

/**
 * fetches entries from given url and stores it in collection
 *
 * @param  {string} url relative url to fetch entries
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.ds.DataSource.prototype.getEntries = function(url, collection, callback, handler)   // TODO remove callback?
{
    if(!collection)
    {
        collection = new hash5.model.EntryCollection(undefined, url);
    }

    collection.startLoadingEntries();

    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var data = e.target.getResponseJson();
        var modelArr = this.decodeResultJson_(data);

        collection.merge(modelArr);

        if(callback)
        {
            callback.call(handler, collection);
        }

        collection.finishedLoadingEntries();

    }, false, this);
    xhr.send(url, 'GET');

    return collection;
};

/**
 * @param  {*} json
 * @return {Array.<hash5.model.Entry>}
 * @private
 */
hash5.ds.DataSource.prototype.decodeResultJson_ = function(json)
{
    var modelArr = [];

    for(var i = 0; i < json['docs'].length; i++)
    {
        modelArr.push(hash5.model.Entry.factory(json['docs'][i]));
    }

    return modelArr;
};