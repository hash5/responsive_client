goog.provide('hash5.parsing.Parser');

goog.require('hash5.parsing.ComplexTag');
goog.require('hash5.parsing.ISubParser');
goog.require('goog.events.EventType');

/**
 * handles abstract parsing for entry texts
 *
 * @param {string=} text
 * @param {hash5.model.Entry=} entry
 *
 * @constructor
 */
hash5.parsing.Parser = function(text, entry)
{

    /**
     * @type {string}
     * @private
     */
    this.text_ = text || '';

    /**
     * @type {hash5.model.Entry}
     * @private
     */
    this.entry_ = entry || null;

    /**
     * @type {Array.<string>}
     * @private
     */
    this.simpleTags_ = [];

    /**
     * @type {Array.<hash5.parsing.ComplexTag>}
     * @private
     */
    this.complexTags_ = [];

    /**
     * @type {Array.<string>}
     * @private
     */
    this.mentions_ = [];

    /**
     * @type {Array.<string>}
     * @private
     */
    this.keywords_ = [];

    /**
     * @type {Object.<function(new:hash5.parsing.ISubParser), *>}
     */
    this.cachedSubParsers_ = {};

    /**
     * @type {Object}
     * @private
     */
    this.serverParsed_ = {};
};

/**
 * @param {Object} data
 */
hash5.parsing.Parser.prototype.setParsingResult = function(data)
{
    this.serverParsed_ = data;

    if(goog.isDef(data['simple_tags']))
    {
        this.simpleTags_ = data['simple_tags'];
    }

    if(goog.isDef(data['complex_tags']))
    {
        this.complexTags_ = data['complex_tags'];
    }

    if(goog.isDef(data['mentions']))
    {
        this.mentions_ = data['mentions'];
    }

    if(goog.isDef(data['keywords']))
    {
        this.keywords_ = data['keywords'];
    }
};

/**
 * @param {string} text
 */
hash5.parsing.Parser.prototype.setRawText = function(text)
{
    this.text_ = text;

    this.serverParsed_ = {};
    this.cachedSubParsers_ = {};
    this.parseTags();
    //this.dispatchEvent(goog.events.EventType.CHANGE);
};

/**
 * @return {string}
 */
hash5.parsing.Parser.prototype.getRawText = function()
{
    return this.text_;
};

/**
 * @return {Object}
 */
hash5.parsing.Parser.prototype.getServerParsed = function()
{
    return this.serverParsed_;
};

/**
 * @return {hash5.model.Entry}
 */
hash5.parsing.Parser.prototype.getEntry = function()
{
    return this.entry_;
};


/**
 * @return {Array.<string>}
 */
hash5.parsing.Parser.prototype.getSimpleTags = function()
{
    return this.simpleTags_;
};

/**
 * @return {Array.<hash5.parsing.ComplexTag>}
 */
hash5.parsing.Parser.prototype.getComplexTags = function()
{
    return this.complexTags_;
};

/**
 * @return {Array.<string>}
 */
hash5.parsing.Parser.prototype.getKeywords = function()
{
    return this.keywords_;
};

/**
 * @return {Array.<string>}
 */
hash5.parsing.Parser.prototype.getMentions = function()
{
    return this.mentions_;
};

/**
 * @param {function(new:hash5.parsing.ISubParser)} parser
 * @return {*}
 */
hash5.parsing.Parser.prototype.getSubparsed = function(parser)
{
    // TODO work with id's js does only allow strings for keys
    var parsingResult = this.cachedSubParsers_[parser];

    if(!goog.isDef(parsingResult))
    {
        var parserInstance = new parser();
        parsingResult = parserInstance.parse(this);
        this.cachedSubParsers_[parser] = parsingResult;
    }

    return parsingResult;
};

/**
 * functions parses text for simple and complex tags
 */
hash5.parsing.Parser.prototype.parseTags = function()
{
    var tags = twttr.txt.extractHashtagsWithIndices(this.text_);

    this.simpleTags_ = [];
    this.complexTags_ = [];


    // The Twitter library doesn't handle complex tags, so we have to check
    // if there are complex tags ourself:
    for(var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        var valueWithRestOfText = this.text_.slice(tag['indices'][1]);
        var value = this.valueOfComplexTag_(valueWithRestOfText);

        if(value === null) {
            // Duplicate simple tags will be ignored
            if(this.simpleTags_.indexOf(tag['hashtag']) == -1) {
                this.simpleTags_.push(tag['hashtag']);
            }
        } else {
            var index = tag['indices'][1] + 1;
            this.complexTags_.push({
                key: tag['hashtag'],
                value: value.val,
                indices: [index, index + value.length]
            });
        }
    }
};

/**
 * Returns the value of a complex tag, or null if the tag was a simple tag with no value
 * @param {string} text Text after the tag-key (should start with a ":" when it is a complex tag)
 * @return {{val: string, length: number}|null}
 */
hash5.parsing.Parser.prototype.valueOfComplexTag_ = function(text)
{
    var regexpComplexTag = /^:(?:(?:"([^"]*)")|([^\s"]+))/g;    // matches the value part of a complex tag
    var match = regexpComplexTag.exec(text);
    var result = null;

    if(match !== null) {
        result = match[1] ? match[1] : match[2];

        // If the text in quotes is empty, then the value should also be empty:
        if(result === undefined)
        {
            result = '';
        }

        return {
            val: result,
            length: match[0].length - 1
        };
    }

    return null;
};