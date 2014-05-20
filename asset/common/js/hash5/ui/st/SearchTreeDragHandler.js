goog.provide('hash5.ui.st.SearchTreeDragHandler');

goog.require('goog.fx.DragDropGroup');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @suppress {accessControls}
 */
hash5.ui.st.SearchTreeDragHandler = function()
{
    goog.base(this);

    /**
     * current drag item
     * @type {goog.fx.DragDropItem}
     * @private
     */
    this.curDragItem_ = null;

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
    this.ddGroupFolders_.createDragElementInternal = goog.bind(this.createDragElement_, this);

    /**
     * @type {goog.fx.DragDropGroup}
     * @private
     */
    this.ddGroupLinks_ = new goog.fx.DragDropGroup();
    this.ddGroupLinks_.addTarget(this.ddGroupFolders_);
    this.ddGroupLinks_.createDragElementInternal = goog.bind(this.createDragElement_, this);

    this.init();
};
goog.inherits(hash5.ui.st.SearchTreeDragHandler, goog.events.EventTarget);

/**
 */
hash5.ui.st.SearchTreeDragHandler.prototype.init = function()
{
    this.ddGroupFolders_.setDragClass('search-item-drag');
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
 * @param  {hash5.ui.st.Node} node
 */
hash5.ui.st.SearchTreeDragHandler.prototype.addItem = function(node)
{
    var dragItem = node.getDragItem();

    if(node instanceof hash5.ui.st.FolderNode) {
        this.ddGroupFolders_.addItem(dragItem, node);
    } else {
        this.ddGroupLinks_.addItem(dragItem, node);
    }
};

/**
 * adds extra element to folderGroup so that elements can be moved to root-level.
 *
 * @param  {Element} el
 * @param  {goog.ui.Component} rootParent Component which holds root nodes
 */
hash5.ui.st.SearchTreeDragHandler.prototype.addRootDummy = function(el, rootParent)
{
    this.ddGroupFolders_.addItem(el, rootParent);
};


/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.st.SearchTreeDragHandler.prototype.handleDragOver_ = function(e)
{
    goog.dom.classes.add(e.dropTargetItem.element, 'drag-over');
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.st.SearchTreeDragHandler.prototype.handleDragOut_ = function(e)
{
    goog.dom.classes.remove(e.dropTargetItem.element, 'drag-over');
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.st.SearchTreeDragHandler.prototype.handleDrop_ = function(e)
{
    var movedItem = /** @type {hash5.ui.st.Node} */ (e.dragSourceItem.data);
    var dropedItem = /** @type {hash5.ui.st.Node} */ (e.dropTargetItem.data);
    goog.dom.classes.remove(e.dropTargetItem.element, 'drag-over');

    if(movedItem === dropedItem) {
        return;
    }

    movedItem.getParent().removeChild(movedItem, true);
    dropedItem.addChild(movedItem, true);

    this.dispatchEvent(goog.fx.AbstractDragDrop.EventType.DROP);
};

/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.st.SearchTreeDragHandler.prototype.handleDragStart_ = function(e)
{
    this.curDragItem_ = e.dragSourceItem;
    goog.dom.classes.add(e.dragSourceItem.element, 'dragged');
};


/**
 *
 * @param  {goog.fx.DragDropEvent} e
 * @private
 */
hash5.ui.st.SearchTreeDragHandler.prototype.handleDragEnd_ = function(e)
{
    goog.dom.classes.remove(e.dragSourceItem.element, 'dragged');
};


/**
 * Generates an element to follow the cursor during dragging, given a drag
 * source element.
 * @param {Element} sourceEl Drag source element.
 * @return {Element} The new drag element.
 * @private
 */
hash5.ui.st.SearchTreeDragHandler.prototype.createDragElement_ = function(sourceEl)
{
    var model = this.curDragItem_.data.getModel();
    return goog.dom.createDom('div', 'dragelement', model['title']);
};