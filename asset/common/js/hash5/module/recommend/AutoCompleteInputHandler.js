goog.provide('hash5.module.recommend.AutoCompleteInputHandler');

goog.require('goog.ui.ac.InputHandler');

/**
 * Class for managing the interaction between an auto-complete object and a
 * text-input or textarea for suggested insering of hashtags.
 *
 * @param {?string=} opt_separators Separators to split multiple entries.
 *     If none passed, uses ',' and ';'.
 * @param {?string=} opt_literals Characters used to delimit text literals.
 * @param {?boolean=} opt_multi Whether to allow multiple entries
 *     (Default: true).
 * @param {?number=} opt_throttleTime Number of milliseconds to throttle
 *     keyevents with (Default: 150). Use -1 to disable updates on typing. Note
 *     that typing the separator will update autocomplete suggestions.
 * @constructor
 * @extends {goog.ui.ac.InputHandler}
 */
hash5.module.recommend.AutoCompleteInputHandler = function(opt_separators, opt_literals, opt_multi, opt_throttleTime)
{
    goog.base(this, opt_separators, opt_literals, opt_multi, opt_throttleTime);

};
goog.inherits(hash5.module.recommend.AutoCompleteInputHandler, goog.ui.ac.InputHandler);

/** @inheritDoc */
hash5.module.recommend.AutoCompleteInputHandler.prototype.parseToken = function()
{
    var caret = this.getCursorPosition();
    var text = this.getValue();

    // find currently insering hashtag
    var hashInput = '';
    for(var i = caret-1; i > 0; i--)
    {
        var curChar = text.charAt(i);

        if(curChar === ' ' || curChar === '\n')
        {
            // no hashtag
            break;
        }else if(curChar === '#'){  // TODO different hash char codes?
            hashInput = text.substr(i, caret - i);
            break;
        }
    }

    //returns empty string if no hashtag is currently insert
    return hashInput;
};

/** @inheritDoc */
hash5.module.recommend.AutoCompleteInputHandler.prototype.setTokenText = function(tokenText, opt_multi)
{
    var curToken = this.parseToken();
    var caret = this.getCursorPosition();
    var text = this.getValue();
    var startIndex = text.lastIndexOf(curToken, caret);

    // replace half written hashtag with new one
    var newText = text.substr(0, startIndex)
                    + tokenText
                    + text.substr(startIndex + curToken.length);

    this.setValue(newText);

    // set new cursor position
    var newCursorPos = startIndex + tokenText.length;
    this.setCursorPosition(newCursorPos);

};