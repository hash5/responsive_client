goog.provide('hash5.utils');

/**
 * finds last index of matching regex
 * @param  {string} text
 * @param  {RegExp} regex
 * @return {number}
 */
hash5.utils.lastIndexOfRegex = function(text, regex)
{
    var matches = text.match(regex);

    if(!matches) {
        return -1;
    }

    var lastMatch = matches[matches.length - 1];
    return text.lastIndexOf(lastMatch);
};


/**
 * finds ending index of first orrurence of regex
 * @param  {string} text
 * @param  {RegExp} regex
 * @return {number}
 */
hash5.utils.endIndexOfRegex = function(text, regex)
{
    var matches = text.match(regex);

    if(!matches) {
        return -1;
    }

    var firstMatch = matches[0];
    return text.indexOf(firstMatch) + firstMatch.length;
};


/**
 * finds next possilbe split position.
 * Function ensures that html tags are not splitted.
 * @param {string} text
 * @param {number} splitLength
 * @return {number} split index
 */
hash5.utils.findSplitPosition = function(text, splitLength)
{
    var indexOfLastStartTag = hash5.utils.lastIndexOfRegex(text.substr(0, splitLength+1), /<[a-z]/ig);

    if(indexOfLastStartTag > 0) {
        var relIndexOfNextEndTag = hash5.utils.endIndexOfRegex(text.substr(indexOfLastStartTag), /<\/[a-z]+>/ig);

        if(relIndexOfNextEndTag > 0 &&
            (indexOfLastStartTag + relIndexOfNextEndTag) > splitLength) {
            return (indexOfLastStartTag + relIndexOfNextEndTag);
        }
    }

    return splitLength;
};