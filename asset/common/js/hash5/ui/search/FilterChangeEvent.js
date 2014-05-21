goog.provide('hash5.ui.search.FilterChangeEvent');
goog.provide('hash5.ui.search.EventType');

goog.require('goog.events.Event');



/**
 * @enum {String}
 */
hash5.ui.search.EventType = {
    FILTER_CHANGE: 'search_filter_change'
};

/**
 * Event which will be triggered on filter changes.
 *
 * @param {string} type Event Type.
 * @param {goog.events.EventTarget} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @constructor
 * @extends {goog.events.Event}
 */
hash5.ui.search.FilterChangeEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * current filter form data
     * @type {Object}
     */
    this.formData = {};

    /**
     * search options
     * @type {hash5.ds.SearchOptions}
     */
    this.searchOptions = null;

    /**
     * string to display in searchfield
     * @type {string}
     */
    this.newSearchString = '';
};
goog.inherits(hash5.ui.search.FilterChangeEvent, goog.events.Event);