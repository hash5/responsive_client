goog.provide('hash5.ui.search.SearchField');

goog.require('goog.ui.Component');

goog.require('goog.ui.ac.Renderer');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.AutoComplete');

goog.require('hash5.forms.Textbox');
goog.require('hash5.templates.Searchfield');
goog.require('hash5.ui.search.SearchOptionsHelper');


/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.search.SearchField = function()
{
    goog.base(this);

    /**
     * @type {hash5.forms.Textbox}
     * @private
     */
    this.searchInput_ = new hash5.forms.Textbox();
    /** @desc search box placeholder */
    var MSG_Placeholder = goog.getMsg('Search...');
    this.searchInput_.setPlaceholder(MSG_Placeholder);

    /**
     * @type {Element}
     * @private
     */
    this.previewsEl_ = null;

    /**
     * @type {boolean}
     * @private
     */
    this.suggestLocked_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.isVisible_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.ignoreChangeEvent_ = false;

    /**
     * @type {hash5.ui.search.SearchOptionsHelper}
     * @private
     */
    this.searchOptions_ = new hash5.ui.search.SearchOptionsHelper();
};
goog.inherits(hash5.ui.search.SearchField, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.search.SearchField);

/** @inheritDoc */
hash5.ui.search.SearchField.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.Searchfield.wrapper);
    this.decorateInternal(/** @type {Element} */ (el));

    this.searchInput_.render(this.getElementByClass('search-input'));
    this.previewsEl_ = this.getElementByClass('previews');
};


/** @inheritDoc */
hash5.ui.search.SearchField.prototype.getContentElement = function()
{
    return this.previewsEl_;
};

/** @inheritDoc */
hash5.ui.search.SearchField.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.searchInput_, goog.events.EventType.SUBMIT, this.handleSubmit_)
        .listen(this.searchInput_, goog.events.EventType.FOCUS, this.handleFocus_)
        .listen(this.searchInput_, goog.events.EventType.CHANGE, this.handleTextInput_)
        .listen(this, goog.ui.Component.EventType.ACTION, this.handlePreviewAction_)
        .listen(this.getElementByClass('save-search'), goog.events.EventType.CLICK, this.saveSearch)
        .listen(this.getElementByClass('search-btn'), goog.events.EventType.CLICK, this.saveSearch)
        .listen(this.getElementByClass('toggle-options'), goog.events.EventType.CLICK, this.toggleOptions_);

    // autocomplete:
    var renderer = new goog.ui.ac.Renderer(this.getElementByClass('suggests-wrapper'));
    var inputhandler = new goog.ui.ac.InputHandler(' ', ' ', true, 300);
    var autoComplete = new goog.ui.ac.AutoComplete(this, renderer, inputhandler);
    this.getHandler().listen(autoComplete, goog.ui.ac.AutoComplete.EventType.UPDATE, this.handleSuggestSelected_);
    inputhandler.attachAutoComplete(autoComplete);
    inputhandler.attachInputs(this.searchInput_.getElement());

    this.searchOptions_.render(this.getElementByClass('options-holder'));
};

/**
 * handles focus of searchInput field. If input contains any keys,
 * suggests box will be shown again.
 */
hash5.ui.search.SearchField.prototype.handleFocus_ = function()
{
    if(!this.isVisible_ && this.searchInput_.getValue()) {
        this.setHelperVisible(true);
    }
};


/**
 * Function used to pass matches to the autocomplete
 *
 * @param {string} token Token to match.
 * @param {number} maxMatches Max number of matches to return.
 * @param {Function} matchHandler callback to execute after matching.
 * @param {string=} opt_fullString The full string from the input box.
 */
hash5.ui.search.SearchField.prototype.requestMatchingRows = function(token, maxMatches, matchHandler, opt_fullString)
{
  if(token.length > 3) {
    var recommender = hash5.ds.Recommondations.getInstance();
    recommender.autocomplete(opt_fullString || '', token, function(suggests){
      matchHandler.call(undefined, token, suggests);
    });
  } else {
    matchHandler.call(undefined, token, []);
  }
};


/**
 * handle suggest from autocomplete selected
 *
 * @param  {goog.events.Event} e
 */
hash5.ui.search.SearchField.prototype.handleSuggestSelected_ = function(e)
{
    this.suggestLocked_ = true;
};

/**
 * handles submit of searchfield
 *
 * @param  {goog.events.Event} e
 */
hash5.ui.search.SearchField.prototype.handleSubmit_ = function(e)
{
    // timeout is needed to check if submit came from accepting suggest
    window.setTimeout(goog.bind(function() {
        if(this.suggestLocked_) {
            this.suggestLocked_ = false;
        } else {
            this.saveSearch();
        }
    }, this), 50);
};

/**
 * handle search input changes
 *
 * @param  {goog.events.Event} e
 */
hash5.ui.search.SearchField.prototype.handleTextInput_ = function(e)
{
    if(!this.ignoreChangeEvent_) {
        var searchKey = /** @type {string} */ (this.searchInput_.getValue());

        this.dispatchEvent(goog.ui.Component.EventType.CHANGE);

        this.setHelperVisible(searchKey.length > 0);
    }


    // TODO --> handleInputSubmit_
};

/**
 * saves the current search as column
 */
hash5.ui.search.SearchField.prototype.saveSearch = function()
{
    var searchKey = /** @type {string} */ (this.searchInput_.getValue());
// TODO controller, searchoptions
    if(searchKey.length > 3) {
        var entryCollection = hash5.api.searchEntries(searchKey); // TODO searchkey...
        hash5.api.showEntryCollection(entryCollection, searchKey);
        this.setHelperVisible(false);
        this.searchInput_.reset();
    }
};


/**
 * sets new searchstring for input field and whether search is possible
 *
 * @param {string} newSearchString
 * @param {boolean} canSearch
 */
hash5.ui.search.SearchField.prototype.setNewSearchString = function(newSearchString, canSearch)
{
    this.ignoreChangeEvent_ = true;
    this.searchInput_.setValue(newSearchString);
    this.ignoreChangeEvent_ = false;

    if(!canSearch) {
        this.removeChildren(true);
        goog.dom.classes.enable(this.getElementByClass('found-search-error'), 'hidden', true);
    }

    goog.dom.classes.enable(this.getElementByClass('short-search-error'), 'hidden', canSearch);
};

/**
 * @return {string}
 */
hash5.ui.search.SearchField.prototype.getCurrentSearchstring = function()
{
    return /** @type {string} */ (this.searchInput_.getValue());
};

/**
 * renders given suggests
 *
 * @param  {hash5.model.EntryCollection} entryCollection
 */
hash5.ui.search.SearchField.prototype.setSuggests = function(entryCollection)
{
    this.removeChildren(true);

    entryCollection.forEach(function(entry){
        var entryUi = new hash5.ui.Entry(entry);
        this.addChild(entryUi, true);
    }, this);

    var foundEntries = (entryCollection.count() > 0);
    goog.dom.classes.enable(this.getElementByClass('found-search-error'), 'hidden', foundEntries);
};

/**
 * sets the visibility of the helper-container
 *
 * @param {boolean} isVisible
 */
hash5.ui.search.SearchField.prototype.setHelperVisible = function(isVisible)
{
    goog.dom.classes.enable(this.getElementByClass('search-helper'), 'hidden', !isVisible);
    goog.dom.classes.enable(this.getElement(), 'visible', isVisible);

    if(isVisible) {
      this.getHandler().listen(document.body, goog.events.EventType.CLICK, this.handleDocClick_);
    } else {
      this.getHandler().unlisten(document.body, goog.events.EventType.CLICK, this.handleDocClick_);
    }

    this.isVisible_ = isVisible;
};

/**
 * handles click on entry which opens editor
 * @param {goog.events.Event} e
 */
hash5.ui.search.SearchField.prototype.handlePreviewAction_ = function(e)
{
  this.setHelperVisible(false);
};

/**
 * handles each click on the document. If clicked target is outside
 * the this component, the helper element will be hidden.
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.ui.search.SearchField.prototype.handleDocClick_ = function(e)
{
    if(!goog.dom.contains(this.getElement(), e.target)) {
        this.setHelperVisible(false);
    }
};

/**
 * toggles visibility. used to hide/show component on mobile.
 */
hash5.ui.search.SearchField.prototype.toggle = function()
{
    goog.dom.classes.toggle(this.getElement(), 'visible');
};

/**
 * toggles visibility of search options.
 */
hash5.ui.search.SearchField.prototype.toggleOptions_ = function()
{
    this.searchOptions_.setVisibility();
};

/**
 * @return {hash5.ui.search.SearchOptionsHelper} current control to display options
 */
hash5.ui.search.SearchField.prototype.getSearchOptionCmp = function()
{
    return this.searchOptions_;
};
