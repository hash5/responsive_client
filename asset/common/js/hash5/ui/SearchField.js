goog.provide('hash5.ui.SearchField');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.forms.Textbox');


/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.SearchField = function()
{
    goog.base(this);

    /**
     * search input field
     *
     * @type {hash5.forms.Textbox}
     * @private
     */
    this.searchInput_ = new hash5.forms.Textbox();
    this.searchInput_.setPlaceholder(goog.getMsg('Suchen...'));

    /**
     * element where suggest are renderred
     *
     * @type {Element}
     * @private
     */
    this.suggestEl_ = null;

    /**
     * @type {string}
     * @private
     */
    this.searchKey_ = '';
};
goog.inherits(hash5.ui.SearchField, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.SearchField);


/** @inheritDoc */
hash5.ui.SearchField.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.searchInput_.render(this.getElementByClass('search-input'));
    this.suggestEl_ = this.getElementByClass('search-suggests');
};

/** @inheritDoc */
hash5.ui.SearchField.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.searchInput_, goog.events.EventType.CHANGE, this.handleTextInput_)
        .listen(this.searchInput_, goog.events.EventType.SUBMIT, this.handleInputSubmit_);
};

/**
 * @param  {goog.events.Event} e
 */
hash5.ui.SearchField.prototype.handleTextInput_ = function(e)
{
    var newSearchKey = /** @type {string} */ (this.searchInput_.getValue());
    var ds = new hash5.ds.DataSource();

    if(newSearchKey.length > 3 && newSearchKey != this.searchKey_)
    {
        ds.search(newSearchKey, undefined, this.handleSuggestsLoaded_, this);
    }
    if(newSearchKey.length == 0)
    {
        this.hideSuggestionBox();
    }

    this.searchKey_ = newSearchKey;
};

/**
 * @param  {goog.events.Event} e
 */
hash5.ui.SearchField.prototype.handleInputSubmit_ = function(e)
{
    var searchKey = /** @type {string} */ (this.searchInput_.getValue());
    var ds = new hash5.ds.DataSource();

    if(searchKey.length > 3){
        ds.search(searchKey, undefined, function(entryCollection){
            hash5.controller.MainPanelController.getInstance().showEntryCollection(entryCollection, searchKey);
        }, this);
        this.hideSuggestionBox();
    }
};

/**
 * @param  {hash5.model.EntryCollection} entryCollection
 */
hash5.ui.SearchField.prototype.handleSuggestsLoaded_ = function(entryCollection)
{
    goog.dom.removeChildren(this.suggestEl_);

    if(entryCollection.count() > 0)
    {
        goog.dom.classes.remove(this.suggestEl_, 'hidden');
        var domHelper = this.getDomHelper();  // TODO use DomFragement or subcomponent instead!
        entryCollection.forEach(function(entry){
            var entryEl = domHelper.createDom('li', undefined, entry.getText());
            goog.dom.append(/** @type {!Node} */ (this.suggestEl_), entryEl);
        }, this);

        this.getHandler().listenOnce(document.body, goog.events.EventType.CLICK, this.hideSuggestionBox);
    }
};


hash5.ui.SearchField.prototype.hideSuggestionBox = function()
{
    goog.dom.classes.remove(this.getElement(), 'visible');
    goog.dom.classes.add(this.suggestEl_, 'hidden');
    this.getHandler().unlisten(document.body, goog.events.EventType.CLICK, this.hideSuggestionBox);
};

hash5.ui.SearchField.prototype.toggle = function()
{
    goog.dom.classes.toggle(this.getElement(), 'visible');
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'search-field',
    function() {
      return hash5.ui.SearchField.getInstance();
    }
);
