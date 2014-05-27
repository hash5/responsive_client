goog.provide('hash5.ui.search.DefaultSearchOptionsHelper');

goog.require('hash5.ui.search.EventType');

/**
 * class to create default search options like AND, NOT, OR
 *
 * @constructor
 */
hash5.ui.search.DefaultSearchOptionsHelper = function()
{


};

hash5.ui.search.DefaultSearchOptionsHelper.prototype.init = function()
{

    /** @desc form-item label for containing strings */
    var MSG_OPTIONS_CONTAINING = goog.getMsg('Containing');
    /** @desc form-item label for not containing strings */
    var MSG_OPTIONS_NOT_CONTAINING = goog.getMsg('Not Containing');
    /** @desc form-item label for optional containing strings */
    var MSG_OPTIONS_OPTIONAL_CONTAINING = goog.getMsg('Optional Containing');

    hash5.api.search.addFilterItem(MSG_OPTIONS_CONTAINING, 'textbox', {fieldName: 'contains'});
    hash5.api.search.addFilterItem(MSG_OPTIONS_NOT_CONTAINING, 'textbox', {fieldName: 'not-contains'});
    hash5.api.search.addFilterItem(MSG_OPTIONS_OPTIONAL_CONTAINING, 'textbox', {fieldName: 'optional-contains'});

    var target = hash5.api.search.getChangeEventDispatcher();
    goog.events.listen(target, hash5.ui.search.EventType.FILTER_CHANGE, this.handleFilterChange_, false, this);
    goog.events.listen(target, hash5.ui.search.SearchField.EventType.TEXT_CHANGE, this.handleSearchTextChange_, false, this);
};

/**
 *
 * @param  {hash5.ui.search.FilterChangeEvent} e
 */
hash5.ui.search.DefaultSearchOptionsHelper.prototype.handleFilterChange_ = function(e)
{
    var addSearchString = '',
        formData = e.formData;

    addSearchString += formData['contains'] + ' ';
    addSearchString += formData['not-contains'] + ' ';
    addSearchString += formData['optional-contains'] + ' ';

    e.newSearchString += addSearchString;
    e.searchOptions.querySearchString += addSearchString;
};

/**
 *
 * @param  {*} e
 */
hash5.ui.search.DefaultSearchOptionsHelper.prototype.handleSearchTextChange_ = function(e)
{
    // TODO event type
    e.values2Change['contains'] = e.curSearchText;
};