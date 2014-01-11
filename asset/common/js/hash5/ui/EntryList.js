goog.provide('hash5.ui.EntryList');

goog.require('goog.ui.Component');

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

    this.getHandler()
        .listen(this.entryCollection_, hash5.model.Collection.EventType.INSERT, this.handleEntryAdded_)
        .listen(hash5.App.viewportSizeMonitor, goog.events.EventType.RESIZE, this.setMaxHeight);
};

hash5.ui.EntryList.prototype.setMaxHeight = function()
{
    var el = this.getElement(),
        viewPort = goog.dom.getViewportSize(),
        elPosition = goog.style.getPosition(el),
        maxHeight = viewPort.height - elPosition.y;

    goog.style.setStyle(el, 'maxHeight', maxHeight + 'px');
};

/**
 * @param  {hash5.model.Collection.ChangeEvent.<hash5.model.Entry>} e
 */
hash5.ui.EntryList.prototype.handleEntryAdded_ = function(e)
{
    this.addEntry_(e.item, e.index);
};

/**
 * @param  {hash5.model.Entry} entry
 * @param  {number} index
 */
hash5.ui.EntryList.prototype.addEntry_ = function(entry, index)
{
    var entryUi = new hash5.ui.Entry(entry);

    if(goog.isNumber(index))
    {
        this.addChildAt(entryUi, index, true);
    }
    else
    {
        this.addChild(entryUi, true);
    }
};
