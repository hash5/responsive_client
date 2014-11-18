goog.provide('hash5.view.ListView');
goog.provide('hash5.view.ListView.EventType');

goog.require('hash5.view.BaseView');
goog.require('hash5.ui.EntryListContainer');
goog.require('hash5.storage.AppData');
goog.require('hash5.templates.ListView');
goog.require('hash5.ui.ListSwitcher');
goog.require('hash5.ui.PageSidebar');
goog.require('hash5.style');

goog.require('monin.fx.WindowScroll');
goog.require('hash5.fx.CssClassAnimation');
goog.require('goog.fx.easing');
goog.require('goog.fx.DragListGroup');


/**
 * Default ListView controller.
 * Class is responsible for drag&drop and storing into LocalStorage.
 *
 * @constructor
 * @extends {hash5.view.BaseView}
 */
hash5.view.ListView = function()
{
    goog.base(this);

    /**
     * @type {goog.fx.DragListGroup}
     * @private
     */
    this.dlg_ = new goog.fx.DragListGroup();
    this.dlg_.setHysteresis(10);
    this.dlg_.setCurrDragItemClass('dragging');
    this.dlg_.setDraggerElClass('drag-list');
    this.dlg_.setFunctionToGetHandleForDragItem(this.getDragItem_);

    /**
     * hint message element when no lists are displayed
     * @type {Element}
     */
    this.emptyHint_ = null;

    /**
     * cached sidebar reference
     * @type {hash5.ui.PageSidebar}
     */
    this.sidebar_ = hash5.ui.PageSidebar.getInstance();
};
goog.inherits(hash5.view.ListView, hash5.view.BaseView);

/** @inheritDoc */
hash5.view.ListView.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.ListView.wrapper);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.view.ListView.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var el = this.getElement();

    if (hash5.App.isMobile) {
        var switcher = new hash5.ui.ListSwitcher(this);
        switcher.render(el.parentElement);
    } else {
        // init drag & drop
        this.dlg_.addDragList(el, goog.fx.DragListDirection.RIGHT);
        this.dlg_.init();
        this.getHandler()
            .listen(this.dlg_, goog.fx.DragListGroup.EventType.DRAGSTART, this.handleListDragStart_)
            .listen(this.dlg_, goog.fx.DragListGroup.EventType.DRAGMOVE, this.handleListDragMove_)
            .listen(this.dlg_, goog.fx.DragListGroup.EventType.DRAGEND, this.handleListDragged_);
    }

    this.restoreLists();
    this.checkForEmptyView();
};


/**
 * @param  {goog.fx.DragListGroupEvent} e
 */
hash5.view.ListView.prototype.handleListDragStart_ = function(e)
{

    this.sidebarPos_ = goog.style.getBounds(this.sidebar_.getElement());
};


/**
 * @param  {goog.fx.DragListGroupEvent} e
 */
hash5.view.ListView.prototype.handleListDragMove_ = function(e)
{
    var isOverSideBar = this.isOverSideBar_(e.event);
    this.sidebar_.setListHover(isOverSideBar);
};

/**
 * @param  {goog.events.BrowserEvent|goog.fx.DragEvent} e
 * @return {boolean}
 */
hash5.view.ListView.prototype.isOverSideBar_ = function(e)
{
    var curPos = new goog.math.Coordinate(e.clientX, e.clientY);
    return hash5.style.isInRect(curPos, this.sidebarPos_);
};


/**
 * @param  {goog.fx.DragListGroupEvent} e
 */
hash5.view.ListView.prototype.handleListDragged_ = function(e)
{
    var newIndex = -1, movedChild = null, oldIndex = -1;

    // get child component object for draged element
    this.forEachChild(function(child, i) {
        if (child.getElement() == e.currDragItem) {
            oldIndex = i;
            movedChild = child;
            newIndex = goog.array.indexOf(goog.dom.getChildren(this.getContentElement()),
                                            e.currDragItem);
        }
    }, this);

    this.removeChild(movedChild);
    goog.dom.removeNode(movedChild.getElement());

    this.addChildAt(movedChild, newIndex);
    goog.dom.insertChildAt(this.getContentElement(), movedChild.getElement(), newIndex);

    this.storeLists();

    //this.dispatchEvent(hash5.ui.PlaceItemGroup.EventType.REORDER);

    // droped on sidebar?
    if (this.isOverSideBar_(e.event)) {
        movedChild.saveToSearchtree();
    }
    this.sidebar_.setListHover(false);
};

/**
 * @param  {Element} el
 * @return {Element}
 */
hash5.view.ListView.prototype.getDragItem_ = function(el)
{
    return goog.dom.getElementByClass('drag-element', el);
};


/**
 * renderes the given entry collection in the mainPanel
 * if there is already a list with same searchpattern, the list will not be added!
 *
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 * @param {boolean=} animated when set to false, no scroll animation will be played
 * @return {hash5.ui.EntryListContainer} returns rendered EntryListContainer
 * @suppress {accessControls}
 */
hash5.view.ListView.prototype.addEntryCollection = function(collection, title, animated)
{
    var listUi;

    // check if list is already displayed
    this.forEachChild(function(child) {
        if (child.getSearchPattern() == collection.getSearchPattern()) {
            listUi = child;
        }
    }, this);

    // create new list
    if (!listUi) {
        listUi = new hash5.ui.EntryListContainer(collection, title);
        this.addChild(listUi, true);

        if(this.isInDocument()) {
            this.dlg_.listenForDragEvents(listUi.getElement());
        }

        this.storeLists();
        this.dispatchEvent(hash5.view.ListView.EventType.LIST_ADDED);
    }

    // hightlight list
    if (animated !== false) {
        this.slideToList(listUi);
    }

    this.checkForEmptyView();

    return listUi;
};

/**
 * slides MainPanel to show given list
 *
 * @param {hash5.ui.EntryListContainer} listUi
 */
hash5.view.ListView.prototype.slideToList = function(listUi)
{
    if (hash5.App.isMobile) {
        var index = this.indexOfChild(listUi);
        this.mobileShowList(index);
    } else {
        var el = listUi.getElement();

        var scrollEl = this.getElement();
        var scrollAnim = new monin.fx.WindowScroll(el, [scrollEl.scrollLeft, 0], [el.offsetLeft, 0], 500, goog.fx.easing.inAndOut, scrollEl);
        scrollAnim.play();

        listUi.highlight();
    }
};

/**
 * slides MainPanel to show given list (mobileVersion)
 *
 * @param {number} listIndex
 */
hash5.view.ListView.prototype.mobileShowList = function(listIndex)
{
    hash5.style.translate(this.getElement(), (listIndex * -100) + '%', undefined, undefined, '');
};

/**
 * removes all current entryLists
 */
hash5.view.ListView.prototype.clearListPanel = function()
{
    this.removeChildren(true);
};

/** @inheritDoc */
hash5.view.ListView.prototype.removeChild = function(child, opt_unrender)
{
    var removedChild = goog.base(this, 'removeChild', child, opt_unrender);

    this.dispatchEvent(hash5.view.ListView.EventType.LIST_REMOVED);
    this.storeLists();

    this.checkForEmptyView();

    return removedChild;
};

/**
 * checks if currently no list is displayed.
 * Hint will be rendered then.
 */
hash5.view.ListView.prototype.checkForEmptyView = function()
{
    if (this.getChildCount() == 0) {
        if(this.emptyHint_ == null) {
            var template = goog.soy.renderAsFragment(hash5.templates.ListView.noListsHint);
            this.emptyHint_ = /** @type {Element} */ (template);
            goog.dom.appendChild(this.getElement(), this.emptyHint_);
        }

        goog.dom.classes.remove(this.emptyHint_, 'hidden');
    } else if (this.emptyHint_ != null) {
        goog.dom.classes.add(this.emptyHint_, 'hidden');
    }
};


/**
 * @type {string}
 * @private
 */
hash5.view.ListView.prototype.storageKey_ = 'listview-opend';


/**
 * stores current opend lists to appStorage
 */
hash5.view.ListView.prototype.storeLists = function()
{
    var serializedLists = [];

    this.forEachChild(function(child){
        var childList = /** @type {hash5.ui.EntryListContainer} */ (child);
        var list = {
            'searchPattern': childList.getSearchPattern(),
            'title': childList.getTitle()
        };
        serializedLists.push(list);
    });


    var storage = hash5.storage.AppData.getInstance();
    storage.set(this.storageKey_, serializedLists);
};

/**
 * restores opend lists from appStorage
 */
hash5.view.ListView.prototype.restoreLists = function()
{
    var storage = hash5.storage.AppData.getInstance();
    var lastLists = storage.get(this.storageKey_);

    if (lastLists) {
        for(var i = 0; i < lastLists.length; i++) {
            var list = lastLists[i];
            var collection = hash5.api.getEntries(list['searchPattern']);
            this.addEntryCollection(collection, list['title'], false);
        }
    } else {
        var newestEntries = hash5.api.getNewestEntries();
        /** @desc newest entry list heading */
        var MSG_NEWEST_HEADING = goog.getMsg('Latest Entries');
        this.addEntryCollection(newestEntries, MSG_NEWEST_HEADING, false);
    }
};


/**
 * @enum {string}
 */
hash5.view.ListView.EventType = {
    LIST_ADDED: 'list-added',
    LIST_REMOVED: 'list-removed'
};