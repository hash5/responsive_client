goog.provide('hash5.ui.EntryList');

goog.require('goog.ui.Component');
goog.require('goog.fx.DragListGroup');

goog.require('hash5.ui.Entry');
goog.require('hash5.model.Collection.EventType');


/**
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

    this.setMaxHeight();
// TODO move events...
    this.getHandler()
        .listen(this.entryCollection_, hash5.model.Collection.EventType.INSERT, this.handleEntryAdded_)
        .listen(this.entryCollection_, hash5.model.Collection.EventType.REMOVE, this.handleEntryRemoved_)
        .listen(hash5.App.viewportSizeMonitor, goog.events.EventType.RESIZE, this.setMaxHeight);

    /*var el = this.getElement();
    var dlg = this.dlg_;
    window.setTimeout(function(){
        dlg.addDragList(el, goog.fx.DragListDirection.DOWN);
        dlg.init();
    }, 1000);*/
    //this.dlg_.addDragList(this.getElement(), goog.fx.DragListDirection.DOWN);
    //this.dlg_.init();
};

hash5.ui.EntryList.prototype.setMaxHeight = function()
{
    var el = this.getElement(),
        viewPort = goog.dom.getViewportSize(),
        elPositionTop = goog.style.getPageOffsetTop(el),
        maxHeight = viewPort.height - elPositionTop;

    goog.style.setStyle(el, 'height', maxHeight + 'px');
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