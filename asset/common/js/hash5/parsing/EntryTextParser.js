goog.provide('hash5.parsing.EntryTextParser');
goog.provide('hash5.parsing.EntryTextParser.EventType');
goog.provide('hash5.parsing.EntryTextParser.DisplayEvent');

goog.require('goog.events.EventTarget');

goog.require('hash5.ds.EntryStore');


/**
 * handles parsing to display entries
 *
 * @param {hash5.model.Entry} model
 * @param {hash5.parsing.Parser} parser
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.parsing.EntryTextParser = function(model, parser)
{
    goog.base(this);

    /**
     * @type {hash5.model.Entry}
     */
    this.model = model;

    /**
     * @type {string}
     * @private
     */
    this.modifiedText_ = this.model.getText();

    /**
     * @type {string}
     * @private
     */
    this.orgText_ = this.model.getText();

    /**
     * @type {hash5.parsing.Parser}
     */
    this.parser_ = parser;

    /**
     * @type {boolean}
     * @private
     */
    this.isParsed_ = false;

    this.setParentEventTarget(hash5.ds.EntryStore.getInstance());
};
goog.inherits(hash5.parsing.EntryTextParser, goog.events.EventTarget);

/**
 * @return {hash5.parsing.Parser}
 */
hash5.parsing.EntryTextParser.prototype.getParser = function()
{
    return this.parser_;
};


/**
 * @return {string}
 */
hash5.parsing.EntryTextParser.prototype.getOrgText = function()
{
    return this.orgText_;
};

/**
 * @return {string}
 */
hash5.parsing.EntryTextParser.prototype.getCurParsed = function()
{
    return this.modifiedText_;
};

/**
 * @param {string} parsed
 */
hash5.parsing.EntryTextParser.prototype.setParsed = function(parsed)
{
    this.modifiedText_= parsed;
};

/**
 * @return {string}
 */
hash5.parsing.EntryTextParser.prototype.toString = function()
{
    if(!this.isParsed_) {
        this.dispatchEvent(hash5.parsing.EntryTextParser.EventType.PARSE);

        this.setParsed(this.replaceSimpleTags());

        this.isParsed_ = true;
    }


    return this.modifiedText_;
};

/**
 * @param  {hash5.ui.Entry} entryUi
 */
hash5.parsing.EntryTextParser.prototype.triggerDisplay = function(entryUi)
{
    this.dispatchEvent({
        type: hash5.parsing.EntryTextParser.EventType.DISPLAY,
        ui: entryUi
    });
};


/**
 * @return {string}
 */
hash5.parsing.EntryTextParser.prototype.replaceSimpleTags = function()
{
    var entryText = this.modifiedText_,
        entry = this.model,
        tags = this.parser_.getSimpleTags();

    // add complex tags
    goog.array.forEach(this.parser_.getComplexTags(), function(complexTag){
        if(!goog.array.contains(tags, complexTag.key)) {
            tags.push(complexTag.key);
        }
    });

    // characters to divide hashtags
    var divideCharacters = ['', ' ', ':', '=', '\n'];

    for(var i = 0; i < tags.length; i++) {
        var tag = '#' + tags[i];

        // check replace to make sure #impo will not replace #important hash
        entryText = entryText.replace(new RegExp(tag, 'gi'), function(match, pos){
            var nextChar = entryText.charAt(match.length + pos);

            if(divideCharacters.indexOf(nextChar) >= 0) {
                return '<a class="hash-link simple" href="/search/'
                    + encodeURIComponent(tags[i]) + '">' + tag + '</a>';
            } else {
                return match;
            }
        });
    }

    return entryText;
};

/**
 * @enum {string}
 */
hash5.parsing.EntryTextParser.EventType = {
    PARSE: 'entry_text_parse',
    DISPLAY: 'entry_display'
};

/**
 * @constructor
 * @param {string} type Event Type.
 * @param {Object=} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @extends {goog.events.Event}
 */
hash5.parsing.EntryTextParser.DisplayEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * @type {hash5.ui.Entry}
     */
    this.ui = null;
};
goog.inherits(hash5.parsing.EntryTextParser.DisplayEvent, goog.events.Event);