goog.provide('hash5.ui.editor.AutoComplete');

goog.require('hash5.ds.Recommondations');

goog.require('hash5.ui.editor.AutoCompleteInputHandler');
goog.require('goog.ui.ac.AutoComplete');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.Renderer');

/**
 * returns new AutoComplete for hashtags attached to the given inputEl
 *
 * @param {Element|goog.events.EventTarget} inputEl
 * @return {goog.ui.ac.AutoComplete}
 */
hash5.ui.editor.AutoComplete.attachAutoComplete = function(inputEl)
{
    var renderer = new goog.ui.ac.Renderer();
    var inputhandler = new hash5.ui.editor.AutoCompleteInputHandler(undefined, undefined, true, 300);
    var matcher = new hash5.ui.editor.AutoComplete.Matcher();
    var autoComplete = new goog.ui.ac.AutoComplete(matcher, renderer, inputhandler);
    inputhandler.attachAutoComplete(autoComplete);
    inputhandler.attachInputs(inputEl);

    return autoComplete;
};


/**
 * @constructor
 */
hash5.ui.editor.AutoComplete.Matcher = function()
{

};

/**
 * @param  {string} token
 * @param  {number} maxMatches
 * @param  {Function} matchCallback
 * @param  {string} full
 * @return {!Array}
 */
hash5.ui.editor.AutoComplete.Matcher.prototype.requestMatchingRows = function(token, maxMatches, matchCallback, full)
{
    // TODO cached suggestions?

    if(token.length > 3)
    {
        var recommender = hash5.ds.Recommondations.getInstance();
        recommender.autocomplete(full, token, function(suggests){
            matchCallback.call(undefined, token, suggests);
        });
    }
    else
    {
        matchCallback.call(undefined, token, []);
    }
};