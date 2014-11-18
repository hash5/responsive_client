goog.provide('hash5.ui.st.Node');

/**
 * A single node in the tree.
 *
 * @param {string} label label for this node
 * @param {dragHandler} hash5.ui.SearchTreeDragHandler
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.st.Node = function(label, dragHandler)
{
    goog.base(this);

    /**
     * label for node
     * @type {string}
     * @protected
     */
    this.label_ = label;

    /**
     * @type {hash5.ui.st.SearchTreeDragHandler}
     * @private
     */
    this.dragHandler_ = dragHandler;
};
goog.inherits(hash5.ui.st.Node, goog.ui.Component);



/** @inheritDoc */
hash5.ui.st.Node.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElementByClass('title'), goog.events.EventType.CLICK, this.handleAction_)
        .listen(this.getElementByClass('edit-icon'), goog.events.EventType.CLICK, this.handleToggleEditClick_)
        .listen(this.getElementByClass('edit-bar'), goog.events.EventType.CLICK, this.handleEditClick_);

    this.dragHandler_.addItem(this);
};


/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.st.Node.prototype.handleToggleEditClick_ = function(e)
{
    goog.dom.classes.toggle(this.getElement(), 'edit-bar-visible');
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.st.Node.prototype.handleEditClick_ = function(e)
{
    var target = /** @type {Element} */ (e.target);

    if(goog.dom.classes.has(target, 'remove')) {
        this.getParent().removeChild(this, true);
        this.dispatchEvent(goog.events.EventType.CHANGE);
        this.dispose();
    } else if (goog.dom.classes.has(target, 'rename')) {
        var model = this.getModel();
        /** @desc new title label */
        var MSG_NEW_TITLE = goog.getMsg('New name: ');
        // TODO custom modal
        var newTitle = prompt(MSG_NEW_TITLE, model['title']);
        if(newTitle) {
            this.setTitle(newTitle);
        }
    }

};

/**
 * handles action event --> will be called on click
 * @protected
 */
hash5.ui.st.Node.prototype.handleAction_ = function()
{
    this.handleActionInternal_();

    this.dispatchEvent(goog.ui.Component.EventType.SELECT);
};

/**
 * handles action internal (also will be called when folders are clicked)
 * @protected
 */
hash5.ui.st.Node.prototype.handleActionInternal_ = function()
{

};

/**
 * sets new label
 * @param  {string} label
 */
hash5.ui.st.Node.prototype.setTitle = function(label)
{
    this.label_ = label;
    this.getElementByClass('title').innerHTML = label;

    var model = this.getModel();
    model['title'] = label;

    this.dispatchEvent(goog.events.EventType.CHANGE);
};

/**
 * returns element used to attache drag events
 * @return {Element}
 */
hash5.ui.st.Node.prototype.getDragItem = function()
{
    return this.getElement().getElementsByTagName('header')[0];
};