goog.provide('hash5.module.calendar.EditorComponent');

goog.require('hash5.module.calendar.ui.HelperTile');
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

    this.iconClass_ = 'icon-event';

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
    var tile = new hash5.module.calendar.ui.HelperTile();
    this.curParsedCalendars_.push(tile.getEvent());
    return tile;
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
            var event = parsedCalendars[i];

            var tile = new hash5.module.calendar.ui.HelperTile(event);
            this.addHelperTile(tile);

            this.getHandler().listen(tile, goog.ui.Component.EventType.CLOSE, this.handleTileRemoved_);
        }
    }
    else
    {
        for(var i = 0; i < this.curParsedCalendars_.length; i++)
        {
            this.curParsedCalendars_[i].updateIndices(parsedCalendars[i]);
        }
    }
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.calendar.EditorComponent.prototype.handleTileRemoved_ = function(e)
{
    var tile = /** @type {hash5.module.calendar.ui.HelperTile} */ (e.target);

    tile.getEvent().removeAllTags();
};