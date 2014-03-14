goog.provide('hash5.module.LinksModule');

goog.require('goog.Uri');

goog.require('hash5.ds.EntryStore');
goog.require('hash5.module.links.LinkParser');
goog.require('hash5.module.links.ImagePreview');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.LinksModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.LinksModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.LinksModule.prototype.initialize = function(context)
{
    var store = hash5.ds.EntryStore.getInstance();
    goog.events.listen(store, hash5.parsing.EntryTextParser.EventType.PARSE, this.handleEntryParse_, false, this);
    goog.events.listen(store, hash5.parsing.EntryTextParser.EventType.DISPLAY, this.handleEntryDisplay_, false, this);
};


/**
 * @param {goog.events.Event} e
 */
hash5.module.LinksModule.prototype.handleEntryParse_ = function(e)
{
    var textParser = /** @type {hash5.parsing.EntryTextParser} */ (e.target);
    var parsedText = textParser.getCurParsed();

    var links = textParser.getParser().getSubparsed(hash5.module.links.LinkParser);
    for(var i = 0; i < links.length; i++)
    {
        var url = links[i].url;
        var displayUrl = url.length > 20 ? url.substr(0, 20) + '...' : url;

        if(!url.match(/^(http)/gi))
        {
            url = 'http://' + url;
        }

        parsedText = parsedText.replace(links[i].url, '<a href="' + url + '" target="_blank" class="extern-link">' + displayUrl + '</a>');
    }

    textParser.setParsed(parsedText);
};

/**
 * @param {hash5.parsing.EntryTextParser.DisplayEvent} e
 */
hash5.module.LinksModule.prototype.handleEntryDisplay_ = function(e)
{
    var textParser = /** @type {hash5.parsing.EntryTextParser} */ (e.target);
    var entryUi = e.ui;

    var links = entryUi.getElementsByClass('extern-link');
    var prev;

    for(var i = 0; i < links.length; i++)
    {
        var link = links[i];
        var url = link.href;

        if(url.match(/(jpg|png|gif)$/gi))
        {
            prev = prev || hash5.module.links.ImagePreview.getInstance();
            prev.attachEl(link);
        }
    }

};

//hash5.module.setLoaded(hash5.module.Modules.LINKS, hash5.module.LinksModule);