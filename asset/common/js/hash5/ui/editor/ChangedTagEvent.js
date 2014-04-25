goog.provide('hash5.ui.editor.ChangedTagEvent');
goog.provide('hash5.ui.editor.EventType');

goog.require('goog.events.Event');

/**
 * @enum {string}
 */
hash5.ui.editor.EventType = {
    CHANGED_TAG: 'changed_tag',
    CHANGED_TAG_UPDATE: 'changed_tag_update'
};

/**
 * Event to trigger tag update in the EntryEditor
 *
 * @param {string} type Event Type.
 * @param {hash5.validation.FormValidation} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @constructor
 * @extends {goog.events.Event}
 */
hash5.ui.editor.ChangedTagEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * tagname
     * @type {string}
     */
    this.tagName = '';

    /**
     * new value for tag
     * @type {string}
     */
    this.value = '';

    /**
     * parsed indices. if not set, tag will be appended
     * @type {[number, number]|undefined}
     */
    this.indices;

    /**
     * iff set to true, tag will be removed
     * (no value need to be set)
     * @type {boolean|undefined}
     */
    this.removeTag = false;

    /**
     * if set to true, text will not update before
     * hash5.ui.editor.EventType.CHANGED_TAG_UPDATE is dispatched
     * @type {boolean}
     */
    this.queued = false;
};
goog.inherits(hash5.ui.editor.ChangedTagEvent, goog.events.Event);