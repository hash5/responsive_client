goog.provide('hash5.ui.SearchTreeDragHandler');

goog.require('goog.fx.DragDropGroup');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.ui.SearchTreeDragHandler = function()
{
    goog.base(this);

    /**
     * @type {goog.events.EventHandler}
     * @private
     */
    this.handler_ = new goog.events.EventHandler(this);
    this.registerDisposable(this.handler_);

    /**
     * @type {goog.fx.DragDropGroup}
     * @private
     */
    this.ddGroupFolders_ = new goog.fx.DragDropGroup();
    this.ddGroupFolders_.addTarget(this.ddGroupFolders_);

    /**
     * @type {goog.fx.DragDropGroup}
     * @private
     */
    this.ddGroupLinks_ = new goog.fx.DragDropGroup();
    this.ddGroupLinks_.addTarget(this.ddGroupFolders_);

    this.init();
};
goog.inherits(hash5.ui.SearchTreeDragHandler, goog.events.EventTarget);

/**
 */
hash5.ui.SearchTreeDragHandler.prototype.init = function()
{
    this.ddGroupFolders_.setDragClass('search-item-drag');
    this.ddGroupFolders_.setSourceClass('source');
    this.ddGroupFolders_.setTargetClass('target');
    this.ddGroupFolders_.init();

    this.ddGroupLinks_.setDragClass('search-item-drag');
    this.ddGroupLinks_.init();

    var eType = goog.fx.AbstractDragDrop.EventType;

    this.handler_.listen(this.ddGroupFolders_, eType.DRAGOVER, this.handleDragOver_);
    this.handler_.listen(this.ddGroupFolders_, eType.DRAGOUT, this.handleDragOut_);
    this.handler_.listen(this.ddGroupFolders_, eType.DROP, this.handleDrop_);
    this.handler_.listen(this.ddGroupFolders_, eType.DRAGSTART, this.handleDragStart_);
    this.handler_.listen(this.ddGroupFolders_, eType.DRAGEND, this.handleDragEnd_);

    this.handler_.listen(this.ddGroupLinks_, eType.DRAGOVER, this.handleDragOver_);
    this.handler_.listen(this.ddGroupLinks_, eType.DRAGOUT, this.handleDragOut_);
    this.handler_.listen(this.ddGroupLinks_, eType.DROP, this.handleDrop_);
    this.handler_.listen(this.ddGroupLinks_, eType.DRAGSTART, this.handleDragStart_);
    this.handler_.listen(this.ddGroupLinks_, eType.DRAGEND, this.handleDragEnd_);
};

/**
 *
 * @param  {hash5.ui.SearchTreeNode} node
 */
hash5.ui.SearchTreeDragHandler.prototype.addItem = function(node)
{
    var dragItem = node.getElementByClass('drag-item');

    if(node.getType() == hash5.ui.SearchTreeNode.Type.FOLDER)
    {
        this.ddGroupFolders_.addItem(dragItem, node);
    }
    else
    {
        this.ddGroupLinks_.addItem(dragItem, node);
    }
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.SearchTreeDragHandler.prototype.handleDragOver_ = function(e)
{
    goog.dom.classes.add(e.dropTargetItem.element, 'drag-over');
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.SearchTreeDragHandler.prototype.handleDragOut_ = function(e)
{
    goog.dom.classes.remove(e.dropTargetItem.element, 'drag-over');
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.SearchTreeDragHandler.prototype.handleDrop_ = function(e)
{
    var movedItem = /** @type {hash5.ui.SearchTreeNode} */ (e.dragSourceItem.data);
    var dropedItem = /** @type {hash5.ui.SearchTreeNode} */ (e.dropTargetItem.data);
    goog.dom.classes.remove(e.dropTargetItem.element, 'drag-over');

    if(movedItem === dropedItem)
    {
        return;
    }

    movedItem.getParent().remove(movedItem);
    dropedItem.add(movedItem);

    this.dispatchEvent(goog.fx.AbstractDragDrop.EventType.DROP);
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.SearchTreeDragHandler.prototype.handleDragStart_ = function(e)
{
    goog.dom.classes.add(e.dragSourceItem.element, 'dragged');
};


/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.SearchTreeDragHandler.prototype.handleDragEnd_ = function(e)
{
    goog.dom.classes.remove(e.dragSourceItem.element, 'dragged');
};