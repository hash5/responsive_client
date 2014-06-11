goog.provide('hash5.controller.SearchController');

goog.require('hash5.ui.search.SearchField');
goog.require('hash5.ui.search.FilterChangeEvent');
goog.require('hash5.ui.search.TextInputChangeEvent');
goog.require('hash5.ui.search.EventType');

/**
 * Controller for EntrySearch
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.SearchController = function()
{
    goog.base(this);

    /**
     * registered EditorComponent constructors
     *
     * @type {Array.<Function>}
     * @private
     */
    this.components_ = [];

    /**
     * @type {hash5.ui.search.SearchField}
     * @private
     */
    this.searchField_ = hash5.ui.search.SearchField.getInstance();

    /**
     * @type {hash5.ui.search.SearchOptionsHelper}
     * @private
     */
    this.optionsHelper_ = this.searchField_.getSearchOptionCmp();
};
goog.inherits(hash5.controller.SearchController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.SearchController);

/**
 * @param {Object} config
 */
hash5.controller.SearchController.prototype.initialize = function(config)
{
    goog.events.listen(this.searchField_, goog.ui.Component.EventType.CHANGE, this.handleSearchInputChange_, false, this);
    goog.events.listen(this.optionsHelper_, goog.events.EventType.CHANGE, this.handleFilterChange_, false, this);

};

/**
 * registers EditorComponent. A new instance will be linked to created EntryEditors.
 * The constructor should derive from {@see hash5.ui.editor.EditorComponent}.
 *
 * @param {Function} comp constructor to create component
 */
hash5.controller.SearchController.prototype.registerComponent = function(comp)
{
    this.components_.push(comp);
};


/**
 * handles change of search input
 * @param  {goog.events.Event} e
 */
hash5.controller.SearchController.prototype.handleSearchInputChange_ = function(e)
{
    var curSearchStr = this.searchField_.getCurrentSearchstring(),
        values2Change = {};

    // tokenize search string
    var tokens = goog.string.collapseWhitespace(curSearchStr).split(" ");

    var textChangeEvent = new hash5.ui.search.TextInputChangeEvent(hash5.ui.search.EventType.TEXT_CHANGE, this);
    textChangeEvent.searchString = curSearchStr;
    textChangeEvent.tokens = tokens;
    textChangeEvent.searchOptions = new hash5.ds.SearchOptions();
    textChangeEvent.values2Change = values2Change;

    this.dispatchEvent(textChangeEvent);

    // fill all remaining tokens into contains-field
    values2Change['contains'] = textChangeEvent.tokens.join(" ");

    this.isChanging_ = true;
    this.optionsHelper_.setValues(values2Change);
    this.isChanging_ = false;

    // searchoptions will be update with filterChangeEvent...
};


/**
 * @param {goog.events.Event} e
 */
hash5.controller.SearchController.prototype.handleFilterChange_ = function(e)
{
    var filterChangeEvent = new hash5.ui.search.FilterChangeEvent(hash5.ui.search.EventType.FILTER_CHANGE, this);
    filterChangeEvent.formData = this.optionsHelper_.getValues();
    filterChangeEvent.searchOptions = new hash5.ds.SearchOptions();

    this.dispatchEvent(filterChangeEvent);

    var canSearch = filterChangeEvent.searchOptions.canSearch();

    if(!this.isChanging_) {
        var newString = goog.string.collapseWhitespace(filterChangeEvent.tokens.join(" "));
        this.searchField_.setNewSearchString(newString, canSearch);
    }

    if(canSearch) {
        hash5.api.searchEntries(filterChangeEvent.searchOptions, undefined, this.searchField_.setSuggests, this.searchField_);
    }
};