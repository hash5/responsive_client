goog.provide('hash5.ds.DataSource');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');

goog.require('hash5.ds.ConnectionManager');
goog.require('hash5.model.EntryCollection');
goog.require('hash5.ds.Options');

// TODO switch to static functions?

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ds.DataSource = function()
{
    goog.base(this);

};
goog.inherits(hash5.ds.DataSource, goog.events.EventTarget);
goog.addSingletonGetter(hash5.ds.DataSource);


/**
 * fetches all properties from server
 *
 * @param  {hash5.model.BaseModel} model
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.ds.DataSource.prototype.fetch = function(model, callback, handler)
{
    var data = model.serialize();

    hash5.ds.ConnectionManager.request('/entries/' + model.getId(), 'GET', data, function(e){
        var response = e.getResponseJson();
        model.update(response);

        if(goog.isFunction(callback))
        {
            callback.call(handler, model);
        }
    }, this);
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
    var completeHandler = function(e){
        var response = e.getResponseJson();
        model.update(response);

        if(goog.isFunction(callback))
        {
            callback.call(handler, model);
        }
    };

    var data = model.serialize();

    if(model.getId())
    {
        hash5.ds.ConnectionManager.request('/entries/' + model.getId(), 'PUT', data, completeHandler, this);
    }
    else
    {
        hash5.ds.ConnectionManager.request('/entries', 'POST', data, completeHandler, this);
    }
};


/**
 * deletes model from server
 *
 * @param  {hash5.model.BaseModel} model
 */
hash5.ds.DataSource.prototype.destroy = function(model)
{
    hash5.ds.ConnectionManager.request('/entries/' + model.getId(), 'DELETE');
};

/**
 * @param {Function=} callback
 * @param {*=} handler
 * @return {*}
 */
hash5.ds.DataSource.prototype.loadUsersettings = function(callback, handler)
{
    // TODO unobserved request..
    // TODO is this used??? check UserController...
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        callback.call(handler, e.getResponseJson());
    }, false, this);
    var apiPrefix = hash5.App.getInstance().getApiPrefix();
    xhr.send(apiPrefix + '/usersettings');
};

/**
 * searches for entries with given searchStr
 * results will be added to collection.
 *
 * @param  {string|hash5.ds.SearchOptions} searchOptions
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {hash5.ds.Options=} options will be merged with hash5.ds.DataSource.DefaultOptions and specifies pagination
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.ds.DataSource.prototype.search = function(searchOptions, collection, options, callback, handler)
{
    if(goog.isString(searchOptions)) {
        return this.getEntries('/entries?query=' + encodeURIComponent(searchOptions), collection, options, callback, handler);
    } else {
        var url = 'query=' + encodeURIComponent(searchOptions.querySearchString);

        // TODO extSearch

        for (var urlKey in searchOptions.urlParams) {
            var value = encodeURIComponent(searchOptions.urlParams[urlKey]);
            url += '&' + urlKey + '=' + value;
        }

        return this.getEntries('/entries?' + url, collection, options, callback, handler);
    }
};

/**
 * fetches entries from given url and stores it in collection
 *
 * @param  {string} url relative url to fetch entries
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {hash5.ds.Options=} options will be merged with hash5.ds.DataSource.DefaultOptions and specifies pagination
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 * @param {boolean=} append if set true all retrieving entries will be added to collection. Otherwise
 * the new entries will be merged
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.ds.DataSource.prototype.getEntries = function(url, collection, options, callback, handler, append)
{
    options = this.extendOptions_(options);

    if(!collection)
    {
        collection = new hash5.model.EntryCollection(undefined, url);
        collection.setOptions(options);
    }

    collection.startLoadingEntries();

    url = this.getUrlWithOptions_(url, options);
    hash5.ds.ConnectionManager.request(url, 'GET', undefined, function(e){
        var data = e.getResponseJson();
        var modelArr = this.decodeResultJson_(data);

        if(!!append)
        {
            collection.insertLoadedEntries(modelArr);
        }
        else
        {
            collection.merge(modelArr);
        }

        if(callback)
        {
            callback.call(handler, collection);
        }

        collection.finishedLoadingEntries();
    }, this);

    return collection;
};

/**
 * fetches newest entries and stores thmen in collection
 *
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.ds.DataSource.prototype.getNewestEntries = function(collection, callback, handler)
{
    // TODO add options
    return this.getEntries('/entries', collection, undefined, callback, handler);
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

/**
 * extends given options with DefaultOptions
 *
 * @param  {hash5.ds.Options=} opt_options
 * @return {hash5.ds.Options}
 * @private
 */
hash5.ds.DataSource.prototype.extendOptions_ = function(opt_options)
{
    var options = /** @type {hash5.ds.Options} */ (goog.object.clone(hash5.ds.DefaultOptions));
    goog.object.extend(options, opt_options || {});

    return options;
};

/**
 * inserts given options into url
 *
 * @param  {string} url
 * @param  {hash5.ds.Options} options
 * @return {string}
 * @private
 */
hash5.ds.DataSource.prototype.getUrlWithOptions_ = function(url, options)
{
    if(url.indexOf('?') < 0)
    {
        url += '?';
    }

    if(goog.isDef(options.sort))
    {
        url += '&sort=' + options.sort;
    }

    if(goog.isDef(options.order))
    {
        url += '&order=' + options.order;
    }

    if(goog.isDef(options.skip))
    {
        url += '&skip=' + options.skip;
    }

    if(goog.isDef(options.limit))
    {
        url += '&limit=' + options.limit;
    }

    return url;
};