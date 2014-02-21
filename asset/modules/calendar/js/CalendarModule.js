goog.provide('hash5.module.CalendarModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');

goog.require('hash5.module.calendar.EditorComponent');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.CalendarModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.CalendarModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.CalendarModule.prototype.initialize = function(context)
{
    hash5.api.registerEditorComponent(hash5.module.calendar.EditorComponent);
};

hash5.module.setLoaded(hash5.module.Modules.CALENDAR, hash5.module.CalendarModule);