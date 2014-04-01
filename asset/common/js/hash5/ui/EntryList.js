goog.provide('hash5.ui.EntryList');

goog.require('goog.ui.Component');
goog.require('goog.fx.DragListGroup');

goog.require('hash5.ui.Entry');
goog.require('hash5.model.Collection.EventType');

/**
 * UI to display entries of a EntryCollection
 * All changes to the Collection will be observed and rendered
 *
 * @param {hash5.model.EntryCollection} entryCollection
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.EntryList = function(entryCollection)
{
    goog.base(this);

    /**
     * @type {hash5.model.EntryCollection}
     * @private
     */
    this.entryCollection_ = entryCollection;

    this.entryCollection_.forEach(function(entry){
        this.addEntry_(entry);
    }, this);

    /**
     * @type {goog.fx.DragListGroup}
     * @private
     */
    this.dlg_ = new goog.fx.DragListGroup();
    this.dlg_.setHysteresis(10);
};
goog.inherits(hash5.ui.EntryList, goog.ui.Component);

/** @inheritDoc */
hash5.ui.EntryList.prototype.createDom = function()
{
    var el = this.getDomHelper().createDom('ul', 'entry-list');

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.EntryList.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.entryCollection_, hash5.model.Collection.EventType.INSERT, this.handleEntryAdded_)
        .listen(this.entryCollection_, hash5.model.Collection.EventType.REMOVE, this.handleEntryRemoved_)
        .listen(this.entryCollection_, hash5.model.Collection.EventType.MOVE, this.handleEntryMoved_)
        .listen(this.entryCollection_, [goog.net.EventType.READY_STATE_CHANGE, goog.net.EventType.COMPLETE], this.handleCollectionLoading_)

        .listen(this.getElement(), goog.events.EventType.SCROLL, this.handleScroll_)

        .listen(this.dlg_, goog.fx.DragListGroup.EventType.BEFOREDRAGEND, this.handleEntryDragged_);

    this.dlg_.addDragList(this.getElement(), goog.fx.DragListDirection.DOWN);
    this.dlg_.init();

    this.handleCollectionLoading_();
};

/**
 * @return  {goog.fx.DragListGroup}
 */
hash5.ui.EntryList.prototype.getDragHandler = function()
{
    return this.dlg_;
};

/**
 * @param {goog.fx.DragListGroupEvent} e
 */
hash5.ui.EntryList.prototype.handleEntryDragged_ = function(e)
{
    // TODO
    console.log(e);

    return false;
};

/**
 * handles scroll event
 * checks if bottom is reached and tries to load more entries
 * event is redispatched
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.ui.EntryList.prototype.handleScroll_ = function(e)
{
    var el = this.getElement(),
        curScroll = el.scrollTop,
        viewportHeight = el.offsetHeight,
        height = el.scrollHeight;

    //if(curScroll + viewportHeight >= height - viewportHeight / 2)
    var pixelsToButtom = height - viewportHeight- curScroll;
    if(pixelsToButtom < 50)
    {
        this.entryCollection_.tryLoadMoreEntries();
    }

    this.dispatchEvent(e);
};

/**
 * @param  {hash5.model.Collection.ChangeEvent.<hash5.model.Entry>} e
 */
hash5.ui.EntryList.prototype.handleEntryAdded_ = function(e)
{
    this.addEntry_(e.item, e.index);
};

/**
 * @param  {hash5.model.Collection.ChangeEvent.<hash5.model.Entry>} e
 */
hash5.ui.EntryList.prototype.handleEntryRemoved_ = function(e)
{
    var removed = this.removeChildAt(e.index, true);

    if(removed)
    {
        removed.dispose();
    }
};

/**
 * @param  {hash5.model.Collection.MoveEvent.<hash5.model.Entry>} e
 */
hash5.ui.EntryList.prototype.handleEntryMoved_ = function(e)
{
    /*
    if(e.oldIndex < e.newIndex)
    {
        var tmp = e.oldIndex;
        e.oldIndex = e.newIndex;
        e.newIndex = e.oldIndex;
    }*/

    var child = this.getChildAt(e.oldIndex);
    this.addChildAt(child, e.newIndex);
};

/**
 * @param  {hash5.model.Entry} entry
 * @param  {number} index
 */
hash5.ui.EntryList.prototype.addEntry_ = function(entry, index)
{
    var entryUi = new hash5.ui.Entry(entry);

    // TODO
    // addItemToDragList

    if(goog.isNumber(index))
    {
        this.addChildAt(entryUi, index, true);
    }
    else
    {
        this.addChild(entryUi, true);
    }
};


/**
 * returns currently displaying entryList
 *
 * @return {hash5.model.EntryCollection}
 */
hash5.ui.EntryList.prototype.getEntryCollection = function()
{
    return this.entryCollection_;
};

/** @override */
hash5.ui.EntryList.prototype.disposeInternal = function()
{
    this.dlg_.dispose();
};


/**
 * @param {number} offset
 */
hash5.ui.EntryList.prototype.setTopOffset = function(offset)
{
    goog.style.setStyle(this.getElement(), 'top', (offset + 50) + 'px');
};

/**
 * handles collection loading state changes
 */
hash5.ui.EntryList.prototype.handleCollectionLoading_ = function()
{
    var isLoading = this.entryCollection_.isLoadingEntries();
    goog.dom.classes.enable(this.getElement(), 'is-loading', isLoading);
};