goog.provide('hash5.ui.EntryListContainer');

goog.require('goog.ui.Component');

goog.require('hash5.ui.EntryList');
goog.require('hash5.ui.QuickCreateEntry');
goog.require('hash5.templates.ui.EntryListContainer');


/**
 * Container for an EntryList. Provides edit functionality.
 *
 * @param {hash5.model.EntryCollection} entryCollection
 * @param {string=} title
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.EntryListContainer = function(entryCollection, title)
{
    goog.base(this);

    /**
     * @type {hash5.ui.QuickCreateEntry}
     * @private
     */
    this.quickCreateEntry_ = new hash5.ui.QuickCreateEntry(entryCollection.getSearchPatternText());


    /**
     * @type {hash5.ui.EntryList}
     * @private
     */
    this.entryList_ = new hash5.ui.EntryList(entryCollection);

    /**
     * @type {string}
     * @private
     */
    this.title_ = title || entryCollection.getSearchPattern();
};
goog.inherits(hash5.ui.EntryListContainer, goog.ui.Component);

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.createDom = function()
{
    var data = {
        title: this.title_
    };

    var el = goog.soy.renderAsFragment(hash5.templates.ui.EntryListContainer.container, data);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.addChild(this.quickCreateEntry_, true);
    this.addChild(this.entryList_, true);
};

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElementByClass('entry-list-actions'), goog.events.EventType.CLICK, this.handleActionClick_)
        .listen(this.getElementByClass('entry-list-menu'), goog.events.EventType.CLICK, this.handleActionClick_)
        .listen(this.quickCreateEntry_, goog.ui.Textarea.EventType.RESIZE, this.adjustQuickEditHeight_)
        .listen(this.quickCreateEntry_, goog.ui.Component.EventType.CLOSE, this.closeQuickEdit);
};

/**
 * adjust the top offset of the entrylist to create space for the editor
 *
 * @param {boolean=} visible
 * @private
 */
hash5.ui.EntryListContainer.prototype.adjustQuickEditHeight_ = function(visible)
{
    var offset = 0;

    this.quickCreateEntry_.setVisible(!!visible);

    if(!goog.isDef(visible) || visible) {
        offset = this.quickCreateEntry_.getElement().offsetHeight;
    }

    this.entryList_.setTopOffset(offset);
};

/**
 * toggles the quick editor
 */
hash5.ui.EntryListContainer.prototype.toggleQuickEdit = function()
{
    var isVisible = this.quickCreateEntry_.isVisible();
    this.adjustQuickEditHeight_(!isVisible);
};

/**
 * closes the quick editor
 */
hash5.ui.EntryListContainer.prototype.closeQuickEdit = function()
{
    this.adjustQuickEditHeight_(false);
};

/**
 * @param {goog.events.BrowserEvent=} e
 */
hash5.ui.EntryListContainer.prototype.toggleActionmenu = function(e)
{
    var actionsEl = this.getElementByClass('entry-list-menu');

    goog.dom.classes.toggle(actionsEl, 'visible');

    var offset = 0;
    if(goog.dom.classes.has(actionsEl, 'visible')) {
        offset = actionsEl.offsetHeight;
        this.getHandler().listen(document.body, goog.events.EventType.CLICK, this.handleDocumentCloseClick_, true);
    } else {
        this.getHandler().unlisten(document.body, goog.events.EventType.CLICK, this.handleDocumentCloseClick_, true);
    }

    this.entryList_.setTopOffset(offset);
};

/**
 * @param {goog.events.BrowserEvent} e
 */
hash5.ui.EntryListContainer.prototype.handleDocumentCloseClick_ = function(e)
{
    var clickedEl = e.target;

    // check if click was not on element
    if(!goog.dom.contains(this.getElement(), clickedEl)) {
        this.toggleActionmenu();
    }
};

/**
 * returns searchpattern to search for listed entries
 *
 * @return {string}
 */
hash5.ui.EntryListContainer.prototype.getSearchPattern = function()
{
    var collection = this.entryList_.getEntryCollection();

    return collection.getSearchPattern();
};

/**
 * @return {string}
 */
hash5.ui.EntryListContainer.prototype.getTitle = function()
{
    return this.title_;
};


/**
 * handles action btn click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.EntryListContainer.prototype.handleActionClick_ = function(e)
{
    var clickedTarget = e.target,
        action = clickedTarget.getAttribute('data-action');

    switch(action){
        case 'add':
            this.toggleQuickEdit();
            break;
        case 'toggle':
            this.toggleActionmenu();
            break;
        case 'close':
            this.close();
            break;
        case 'save':
            hash5.api.addSearchTreeItem(this.getSearchPattern(), this.title_);
            break;
        case 'delete':
            var collection = this.entryList_.getEntryCollection();
            collection.forEachRight(function(entry){
                entry.destroy();
            });
            this.close();
            break;
        case 'sort-text':
            this.toggleSort_(hash5.ds.options.SortField.TEXT, clickedTarget);
            break;
        case 'sort-date':
            this.toggleSort_(hash5.ds.options.SortField.CREATED_DATE, clickedTarget);
            break;
    }
};

/**
 * applies given sort and toggles action btns
 * @param  {hash5.ds.options.SortField} sortField
 */
hash5.ui.EntryListContainer.prototype.toggleSort_ = function(sortField, el)
{
    var sortOrder = hash5.ds.options.SortOrder.DESC;

    goog.dom.classes.remove(this.getElementByClass('action-sort-text'), 'active-sort');
    goog.dom.classes.remove(this.getElementByClass('action-sort-date'), 'active-sort');
    if(goog.dom.classes.has(el, 'asc')) {
        sortOrder = hash5.ds.options.SortOrder.ASC;
    }
    goog.dom.classes.toggle(el, 'asc');
    goog.dom.classes.add(el, 'active-sort');

    var collection = this.entryList_.getEntryCollection();
    collection.sortBy(sortField, sortOrder);
    // TODO store into LocalStorage...
};


/**
 * removes entryList from main-panel
 */
hash5.ui.EntryListContainer.prototype.close = function()
{
    this.getParent().removeChild(this);
    this.dispose();
};