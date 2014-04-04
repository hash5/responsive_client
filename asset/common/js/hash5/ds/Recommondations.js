goog.provide('hash5.ds.Recommondations');

goog.require('goog.net.XhrManager');
goog.require('goog.Uri.QueryData');

// TODO - use xhrManager

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ds.Recommondations = function()
{
    goog.base(this);

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = null;
};
goog.inherits(hash5.ds.Recommondations, goog.events.EventTarget);
goog.addSingletonGetter(hash5.ds.Recommondations);

/**
 * @return {goog.events.EventHandler}
 */
hash5.ds.Recommondations.prototype.getHandler = function() {
    return this.handler_ || (this.handler_ = new goog.events.EventHandler(this));
};



/**
 * calls api for autocomplete tag for given entry-text
 *
 * @param {string} text text of entry
 * @param {string} tag tag to complete, need to be at least 3 characters long
 * @param {Function} callback called when suggests are loaded (Array.<String> as param)
 * @param {*=} handler
 */
hash5.ds.Recommondations.prototype.autocomplete = function(text, tag, callback, handler)
{
    goog.asserts.assert(tag.length > 2, 'Tag to complete need to be at least 3 characters long.');

    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var data = e.target.getResponseJson();
        var result = [];

        /*
        possible result:
        "tags":[
            {"name":"entry:", "occurence": 1, "values": [{"name":"new", "occurence": 1}]},
            {"name":"empty", "occurence": 1},
            {"name":"early", "occurence": 1}
          ]
         */
        if(data['tags'])
        {
            for(var i = 0; i < data['tags'].length; i++)
            {
                var suggest = data['tags'][i];
                result.push('#' + suggest['name']);

                if(suggest['values'])
                {
                    for(var j = 0; j < suggest['values'].length; j++)
                    {
                        result.push('#' + suggest['name'] + '=' + suggest['values'][j]);
                    }
                }
            }
        }


        callback.call(handler, result);

    }, false, this);
    var postData = goog.Uri.QueryData.createFromMap({
        'text': text,
        'tag': tag
    }).toString();
    xhr.send('/autocomplete', 'POST', postData);
};


/**
 * calls api for recommend tags for given entry-text
 *
 * @param {string} text text of entry
 * @param {Function} callback called when suggests are loaded (Array.<String> as param)
 * @param {*=} handler
 */
hash5.ds.Recommondations.prototype.recommend = function(text, callback, handler)   // TODO remove callback?
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var data = e.target.getResponseJson();
        var result = [];

        /*
        possible result:
        "recs":[
            {"name":"entry:", "occurence": 1, "values": [{"name":"new", "occurence": 1}]},
            {"name":"empty", "occurence": 1},
            {"name":"early", "occurence": 1}
          ]
         */

        if(data['recs'])
        {
            for(var i = 0; i < data['recs'].length; i++)
            {
                var suggest = data['recs'][i];
                result.push('#' + suggest['name']);

                if(suggest['values'])
                {
                    for(var j = 0; j < suggest['values'].length; j++)
                    {
                        result.push('#' + suggest['name'] + '=' + suggest['values'][j]);
                    }
                }
            }
        }


        callback.call(handler, result);

    }, false, this);
    var postData = goog.Uri.QueryData.createFromMap({
        'text': text
    }).toString();
    xhr.send('/recommend', 'POST', postData);
};