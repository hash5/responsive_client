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
    goog.events.listen(target, hash5.ui.search.EventType.TEXT_CHANGE, this.handleSearchTextChange_, false, this);
};

/**
 *
 * @param  {hash5.ui.search.FilterChangeEvent} e
 */
hash5.ui.search.DefaultSearchOptionsHelper.prototype.handleFilterChange_ = function(e)
{
    var addSearchString = '',
        formData = e.formData;

    e.tokens.push(formData['contains']);

    if(formData['not-contains'].length > 0) {
        var notStr = formData['not-contains'].split(" ");
        e.tokens.push("-" + notStr.join(" -"));
    }

    if(formData['optional-contains'].length > 0) {
        var optionalStr = formData['optional-contains'].split(" ");
        e.tokens.push("OR " + optionalStr.join(" OR "));
    }

    // TODO fill searchoptions with optinal and not

    e.searchOptions.querySearchString += formData['contains'];
};

/**
 *
 * @param  {*} e
 */
hash5.ui.search.DefaultSearchOptionsHelper.prototype.handleSearchTextChange_ = function(e)
{
    var notContaining = '',
        optContaining = '',
        orToken = false;

    e.tokens = goog.array.filter(e.tokens, function(token) {

        if(token.charAt(0) === '-') {
            notContaining += token.substr(1) + " ";
            return false;
        }

        if(token.toLowerCase() === 'or') {
            orToken = true;
            return false;
        }

        if(orToken) {
            optContaining += token + " ";
            orToken = false;
            return false;
        }

        return true;
    });

    if(orToken) {
        e.tokens.push('or');
    }

    // "contains" is handled by controller to ensure all remaining tokens are included

    e.values2Change['not-contains'] = notContaining.trim();
    e.values2Change['optional-contains'] = optContaining.trim();
};