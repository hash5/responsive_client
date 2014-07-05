goog.provide('hash5.module.EntryLayouterModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');


/**
 * Module to change layout of entries depending on their hashtags.
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.EntryLayouterModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.EntryLayouterModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.EntryLayouterModule.prototype.initialize = function(context)
{
    var store = hash5.ds.EntryStore.getInstance();
    goog.events.listen(store, hash5.parsing.EntryTextParser.EventType.DISPLAY, this.handleEntryDisplay_, false, this);
};

/**
 * @param {hash5.parsing.EntryTextParser.DisplayEvent} e
 */
hash5.module.EntryLayouterModule.prototype.handleEntryDisplay_ = function(e)
{
    var entryUi = e.ui,
        parser = entryUi.getModel().getParser(),
        cssClasses = [entryUi.getElement()];

    goog.array.forEach(parser.getSimpleTags(), function(hashtag){
        switch(hashtag) {
            case 'green':
            case 'grün':
                cssClasses.push('color-green');
                break;
            case 'red':
            case 'rot':
            case 'important':
            case 'wichtig':
                cssClasses.push('color-red');
                break;
            case 'blue':
            case 'blau':
                cssClasses.push('color-blue');
                break;
            case 'yellow':
            case 'gelb':
                cssClasses.push('color-yellow');
                break;
        }
    });

    if(cssClasses.length > 1) {
        goog.dom.classes.add.apply(this, cssClasses);
    }
};


//hash5.module.setStaticLoaded(hash5.module.Modules.ENTRY_LAYOUTER, hash5.module.EntryLayouterModule);