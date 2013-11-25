goog.provide('hash5.ds.DataSource');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.Uri.QueryData');

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
};
goog.inherits(hash5.ds.DataSource, goog.events.EventTarget);

/**
 * @return {goog.events.EventHandler}
 */
hash5.ds.DataSource.prototype.getHandler = function() {
    return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
};

hash5.ds.DataSource.prototype.all = function(callback)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleResultsLoaded_, false, this);
    xhr.send('/entries');
};

/**
 * @param  {hash5.model.BaseModel} model
 */
hash5.ds.DataSource.prototype.save = function(model)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleResultsLoaded_, false, this);
    xhr.send('/entries', 'POST', goog.Uri.QueryData.createFromMap(model.serialize()).toString());
};

/**
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
 * @param  {string} searchStr
 * @param {Function} callback
 * @param {*} handler
 */
hash5.ds.DataSource.prototype.search = function(searchStr, callback, handler)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var data = e.target.getResponseJson();
        var modelArr = [];

        console.log(data);

        for(var i = 0; i < data['docs'].length; i++)
        {
            modelArr.push(hash5.model.Entry.factory(data['docs'][i]));
        }

        callback.call(handler, modelArr);
    }, false, this);
    xhr.send('/entries?query=' + encodeURIComponent(searchStr), 'GET');
};


hash5.ds.DataSource.prototype.handleResultsLoaded_ = function(e)
{
    console.log(e.target.getResponseJson());
};