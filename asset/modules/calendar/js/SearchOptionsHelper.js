goog.provide('hash5.module.calendar.SearchOptionsHelper');

/**
 * class to create default search options like AND, NOT, OR
 *
 * @constructor
 */
hash5.module.calendar.SearchOptionsHelper = function()
{


};

hash5.module.calendar.SearchOptionsHelper.prototype.init = function()
{

    /** @desc form-item label for today entries */
    var MSG_TODAY_CB = goog.getMsg('Today');

    hash5.api.search.addFilterItem(MSG_TODAY_CB, 'checkbox', {fieldName: 'today'});

    var target = hash5.api.search.getChangeEventDispatcher();
    goog.events.listen(target, hash5.ui.search.EventType.FILTER_CHANGE, this.handleFilterChange_, false, this);
};

/**
 *
 * @param  {hash5.ui.search.FilterChangeEvent} e
 */
hash5.module.calendar.SearchOptionsHelper.prototype.handleFilterChange_ = function(e)
{
    if(e.formData['today'] == '1') {
        e.searchOptions.urlParams['daterange'] = 'today';
    }
};