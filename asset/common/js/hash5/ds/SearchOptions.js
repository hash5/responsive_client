goog.provide('hash5.ds.SearchOptions');

/**
 * searchoptions
 *
 * @constructor
 */
hash5.ds.SearchOptions = function()
{

    /**
     * SearchObject
     * @type {Object}
     */
    this.extSearch = {};

    /**
     * query search string
     * @type {string}
     */
    this.querySearchString = '';

    /**
     * additional url params to add
     * @type {Object}
     */
    this.urlParams = {};
};

/**
 * @return {boolean}
 */
hash5.ds.SearchOptions.prototype.canSearch = function()
{
    // TODO if today is specified for example...
    return !!this.querySearchString && this.querySearchString.length > 3;
}