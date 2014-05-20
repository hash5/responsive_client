goog.provide('hash5.module.FilesModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.ds.EntryStore');
goog.require('hash5.api');

goog.require('hash5.module.files.EditorComponent');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.FilesModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.FilesModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.FilesModule.prototype.initialize = function(context)
{
    hash5.api.registerEditorComponent(hash5.module.files.EditorComponent);

    // TODO enable, conflicts with LinksModule
    /* var store = hash5.ds.EntryStore.getInstance();
    goog.events.listen(store, hash5.parsing.EntryTextParser.EventType.PARSE, this.handleEntryParse_, false, this); */
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.FilesModule.prototype.handleEntryParse_ = function(e)
{
    var textParser = /** @type {hash5.parsing.EntryTextParser} */ (e.target);
    var parsedText = textParser.getCurParsed();

    var files =  /** @type {Array.<hash5.module.files.File>} */ (textParser.getParser().getSubparsed(hash5.module.files.FileParser));
    for(var i = 0; i < files.length; i++)
    {
        var url = files[i].getUrl();

        parsedText = parsedText.replace(url, '<a href="' + url + '" target="_blank" class="file-link"></a>');
    }

    textParser.setParsed(parsedText);
};

hash5.module.setLoaded(hash5.module.Modules.FILES, hash5.module.FilesModule);