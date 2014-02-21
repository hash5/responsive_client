goog.provide('hash5.module.calendar.HelperTile');


goog.require('hash5.ui.editor.HelperTile');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');

/**
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.calendar.HelperTile = function()
{
    goog.base(this);

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();
    this.form_.addFormItem('start time', 'textbox', {fieldName: 'start'});
    this.form_.addFormItem('end time', 'textbox', {fieldName: 'end'});
};
goog.inherits(hash5.module.calendar.HelperTile, hash5.ui.editor.HelperTile);

/** @inheritDoc */
hash5.module.calendar.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.addChild(this.form_, true);

    this.getHandler()
        .listen(this, goog.ui.Component.EventType.CLOSE, this.handleClose_)
        .listen(this.form_, goog.events.EventType.CHANGE, this.handleDateChanges_);
};

/**
 * handles changes of dates
 *
 * @param  {goog.events.Event} e
 */
hash5.module.calendar.HelperTile.prototype.handleDateChanges_ = function(e)
{
    console.log(this.form_.getData());
};

/**
 * handles user remove of helper tile
 *
 * @param  {goog.events.Event} e
 */
hash5.module.calendar.HelperTile.prototype.handleClose_ = function(e)
{

};