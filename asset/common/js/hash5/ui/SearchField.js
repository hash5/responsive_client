goog.provide('hash5.ui.SearchField');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('goog.events.KeyCodes');


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
     * @type {Element}
     * @private
     */
    this.searchInput_ = null;

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

    // TODO delayed ajax request for search
};
goog.inherits(hash5.ui.SearchField, goog.ui.Component);


/** @inheritDoc */
hash5.ui.SearchField.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.searchInput_ = this.getElementByClass('search-input');
    this.suggestEl_ = this.getElementByClass('search-suggests');
};

/** @inheritDoc */
hash5.ui.SearchField.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler().listen(this.searchInput_, goog.events.EventType.KEYUP, this.handleKeyPressed_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.SearchField.prototype.handleKeyPressed_ = function(e)
{
    var ds = new hash5.ds.DataSource();

    if(e.keyCode == goog.events.KeyCodes.ENTER)
    {
      // enter pressed

    }

    var newSearchKey = this.searchInput_.value;
    if(newSearchKey.length > 3 && newSearchKey != this.searchKey_)
    {
        ds.search(newSearchKey, this.handleSuggestsLoaded_, this);
    }
    if(newSearchKey.length == 0)
    {
        goog.dom.classes.add(this.suggestEl_, 'hidden');
    }

    this.searchKey_ = newSearchKey;
};

/**
 * @param  {Array.<hash5.model.Entry>} entries
 */
hash5.ui.SearchField.prototype.handleSuggestsLoaded_ = function(entries)
{
    goog.dom.removeChildren(this.suggestEl_);

    if(entries.length > 0)
    {
        goog.dom.classes.remove(this.suggestEl_, 'hidden');
        var domHelper = this.getDomHelper();  // TODO use DomFragement or subcomponent instead!
        goog.array.forEach(entries, function(entry){
            var entryEl = domHelper.createDom('li', undefined, entry.getText());
            goog.dom.append(this.suggestEl_, entryEl);
        }, this);
    }
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'search-field',
    function() {
      return new hash5.ui.SearchField();
    }
);
