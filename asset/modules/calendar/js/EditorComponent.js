goog.provide('hash5.module.calendar.EditorComponent');

goog.require('hash5.module.calendar.HelperTile');

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
    this.title_ = 'Kalender';
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
 * @return {goog.events.Event}
 */
hash5.module.calendar.EditorComponent.prototype.handleTextChanged_ = function(e)
{
    this.checkForNewDates();
};


/**
 * checks if there is a calendar mention without helper tile
 * @return {boolean}
 */
hash5.module.calendar.EditorComponent.prototype.checkForNewDates = function()
{
    // TODO this is just copy&paste from old client! use entryParser instead
    var editor = this.getEditor();
    var curText = editor.getEntryText();
    var patt=/([\s\S]*)\#start:\"(\d\d\d\d\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|(?:1|2)[0-9]|3[0-1]) (?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]?)\"[\s|\S]*?\#end:\"(\d\d\d\d\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|(?:1|2)[0-9]|3[0-1]) (?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]?)\"/;
    var date = patt.exec(curText);

    // TODO this is just pseudo code...
    if(date)
    {
        var tile = new hash5.module.calendar.HelperTile(date);
        editor.addHelperTile(this, tile);

        return true;
    }

    return false;
};
