goog.provide('hash5.ds.Recommondations');

goog.require('goog.net.XhrManager');
goog.require('goog.Uri.QueryData');

// TODO - change to static functions?

/**
 * @constructor
 */
hash5.ds.Recommondations = function()
{
    //goog.base(this);
};
//goog.inherits(hash5.ds.Recommondations, goog.events.EventTarget);
goog.addSingletonGetter(hash5.ds.Recommondations);



/**
 * calls api for autocomplete tag for given entry-text
 *
 * @param {string} text text of entry
 * @param {string} autocompleteTag tag to complete, need to be at least 3 characters long
 * @param {Function} callback called when suggests are loaded (Array.<String> as param)
 * @param {*=} handler
 */
hash5.ds.Recommondations.prototype.autocomplete = function(text, autocompleteTag, callback, handler)
{
    goog.asserts.assert(autocompleteTag.length > 2, 'Tag to complete need to be at least 3 characters long.');

    var postData = {
        'text': text,
        'tag': autocompleteTag
    };
    hash5.ds.ConnectionManager.simpleRequest('/autocomplete', 'POST', postData, function(e) {
        var data = e.getResponseJson();
        var result = [];

        /*
        possible result:
        "tags":[
            {"name":"entry:", "occurence": 1, "values": [{"name":"new", "occurence": 1}]},
            {"name":"empty", "occurence": 1},
            {"name":"early", "occurence": 1}
          ]
         */
        if(data['tags']) {
            for(var i = 0; i < data['tags'].length; i++) {
                var suggest = data['tags'][i],
                    suggestTag = '#' + suggest['name'];

                if(autocompleteTag !== suggestTag) {
                    result.push(suggestTag);
                }

                if(suggest['values']) {
                    for(var j = 0; j < suggest['values'].length; j++) {
                        result.push('#' + suggest['name'] + ':' + suggest['values'][j]['name']);
                    }
                }
            }
        }

        callback.call(handler, result);

    }, this);
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
    var postData = {
        'text': text
    };
    hash5.ds.ConnectionManager.simpleRequest('/recommend', 'POST', postData, function(e){
        var data = e.getResponseJson();
        var result = [];

        /*
        possible result:
        "recs":[
            {"name":"entry:", "occurence": 1, "values": [{"name":"new", "occurence": 1}]},
            {"name":"empty", "occurence": 1},
            {"name":"early", "occurence": 1}
          ]
         */

        if(data['recs']) {
            for(var i = 0; i < data['recs'].length; i++) {
                var suggest = data['recs'][i];
                result.push('#' + suggest['name']);

                if(suggest['values']) {
                    for(var j = 0; j < suggest['values'].length; j++) {
                        result.push('#' + suggest['name'] + ':' + suggest['values'][j]['name']);
                    }
                }
            }
        }


        callback.call(handler, result);

    }, this);
};