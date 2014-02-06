goog.provide('hash5.model.EntryParser');


/**
 * handles abstract parsing for entry texts
 *
 * @param {hash5.model.Entry} model
 *
 * @constructor
 */
hash5.model.EntryParser = function(model)
{

    /**
     * @type {hash5.model.Entry}
     * @private
     */
    this.model_ = model;

    /**
     * @type {string}
     */
    this.modifiedText = this.model_.getText();

    /**
     * @type {string}
     */
    this.orgText = this.model_.getText();
};


/**
 * @return {string}
 */
hash5.model.EntryParser.prototype.toString = function()
{
    var entry = this.model_;
    var entryText = entry.getText();

    // TODO let modules modify display text --> dispatch event and let modules modify inner variable
    // moduleManager.dispatchEvent(hash5.events.ParseEntry);

    entryText = this.replaceSimpleTags();

    return entryText;
};


/**
 * @return {string}
 */
hash5.model.EntryParser.prototype.replaceSimpleTags = function()
{
    var entryText = this.modifiedText;
    var entry = this.model_;

    var simpleTags = entry.getSimpleTags();
    for(var i = 0; i  < simpleTags.length; i++)
    {
        var tag = '#' + simpleTags[i];
        entryText = entryText.replace(tag, '<a class="hash-link simple" href="/search/'
            + encodeURIComponent(simpleTags[i]) + '">' + tag + '</a>');
    }

    return entryText;
};