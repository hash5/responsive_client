goog.provide('hash5.ui.editor.AutoComplete');

goog.require('hash5.ds.Recommondations');

goog.require('hash5.ui.editor.AutoCompleteInputHandler');
goog.require('goog.ui.ac.AutoComplete');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.Renderer');

/**
 * returns new AutoComplete for hashtags attached to the given inputEl
 *
 * @param {Element} inputEl
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
 * Function used to pass matches to the autocomplete
 *
 * @param {string} token Token to match.
 * @param {number} maxMatches Max number of matches to return.
 * @param {Function} matchHandler callback to execute after matching.
 * @param {string=} opt_fullString The full string from the input box.
 */
hash5.ui.editor.AutoComplete.Matcher.prototype.requestMatchingRows = function(token, maxMatches, matchHandler, opt_fullString)
{
    // TODO cached suggestions?

    if(token.length > 3)
    {
        var recommender = hash5.ds.Recommondations.getInstance();
        recommender.autocomplete(opt_fullString || '', token, function(suggests){
            matchHandler.call(undefined, token, suggests);
        });
    }
    else
    {
        matchHandler.call(undefined, token, []);
    }
};