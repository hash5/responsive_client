goog.provide('hash5.module.calendar.EditorComponent');

goog.require('hash5.module.calendar.HelperTile');
goog.require('hash5.module.calendar.CalendarParser');

/**
 * @param {hash5.model.Entry} model
 * @param {hash5.ui.editor.EntryEditor} editor
 *
 * @constructor
 * @extends {hash5.ui.editor.EditorComponent}
 */
hash5.module.calendar.EditorComponent = function(model, editor)
{
    goog.base(this, model, editor);


    this.icon_ = '/client/asset/common/img/sprite/calender.png';
    /** @desc name for the calendar plugin */
    var MSG_CALENDAR_PLUGIN = goog.getMsg('Calendar');
    this.title_ = MSG_CALENDAR_PLUGIN;

    /**
     * @type {Array.<hash5.module.calendar.Event>}
     * @private
     */
    this.curParsedCalendars_ = [];
};
goog.inherits(hash5.module.calendar.EditorComponent, hash5.ui.editor.EditorComponent);


/** @inheritDoc */
hash5.module.calendar.EditorComponent.prototype.init = function()
{
    this.getHandler()
        .listen(this.getEditor(), hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE, this.handleTextChanged_);

    this.checkForNewDates();
};


/** @inheritDoc */
hash5.module.calendar.EditorComponent.prototype.getNewHelperTile = function()
{
    return new hash5.module.calendar.HelperTile();
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.calendar.EditorComponent.prototype.handleTextChanged_ = function(e)
{
    this.checkForNewDates();
};


/**
 * checks if there is a calendar mention without helper tile
 */
hash5.module.calendar.EditorComponent.prototype.checkForNewDates = function()
{
    var editor = this.getEditor();

    var parsedCalendars = /** @type {Array.<hash5.module.calendar.Event>} */ (editor.getParser().getSubparsed(hash5.module.calendar.CalendarParser));

    var datesChanged = !goog.array.equals(this.curParsedCalendars_, parsedCalendars, function(ev1, ev2){
        return ev1.equals(ev2);
    });

    // only update ui if events changed
    if(datesChanged)
    {
        this.curParsedCalendars_ = parsedCalendars;
        this.removeAllHelperTiles();

        for(var i = 0; i < parsedCalendars.length; i++)
        {
            var tile = new hash5.module.calendar.HelperTile(parsedCalendars[i]);
            this.addHelperTile(tile);

            this.getHandler().listen(tile, goog.ui.Component.EventType.CLOSE, this.handleTileRemoved_);
        }
    }
    else
    {
        // update indices
    }

    console.log(parsedCalendars);
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.calendar.EditorComponent.prototype.handleTileRemoved_ = function(e)
{
    var tile = /** @type {hash5.module.calendar.HelperTile} */ (e.target);

    // TODO remove date...
};


/**
 * @param {hash5.module.calendar.Event} event
 * @return {boolean} returns true if text has changed
 */
hash5.module.calendar.EditorComponent.prototype.updateTextForEvent = function(event)
{
    var entryText = this.getEditor().getEntryText();

    // because changing the text the indices got by the parser have to be adjusted
    var changedLength = 0;

    /**
     * replaces positions from startPos to endPos with new replace string
     *
     * @param {string} str
     * @param {string} replace
     * @param {number} startPos
     * @param {number} endPos
     * @return {string} new string
     */
    var posReplace = function(str, replace, startPos, endPos)
    {
        var res = str.substring(0, startPos + changedLength) + replace + str.substring(endPos + changedLength);

        changedLength += replace.length - (endPos - startPos);

        return res;
    };


    var insertString = function(newString, key)
    {
        var parsedIndices = event.getIndices(key);
        var indices = parsedIndices || [entryText.length, entryText.length];

        if(!parsedIndices && newString.length > 0)
        {
            newString = ' #' + key + ':' + newString;
        }

        entryText = posReplace(entryText, newString, indices[0], indices[1]);
    };

    // TODO check if brackets are needed!

    var insertDate = function(date, key)
    {
        var dateStr = date.toString();
        if(dateStr.indexOf(" ") > -1)
        {
            dateStr = '"' + dateStr  + '"';
        }

        insertString(dateStr, key);
    };

    insertDate(event.getStartDate(), 'start');

    if(goog.date.isSameDay(event.getStartDate(), event.getEndDate()))
    {
        insertString(event.getEndDate().getTimeString(), 'end');
    }
    else
    {
        insertDate(event.getEndDate(), 'end');
    }

    insertString(event.getRecurrent() ? event.getRecurrent().toString() : '', 'recurrent');

    if(entryText != this.getEditor().getEntryText())
    {
        this.getEditor().setEntryText(entryText);
        return true;
    }

    return false;
};