goog.provide('hash5.ui.st.FolderNode');

goog.require('hash5.ui.st.Node');
goog.require('hash5.templates.SearchTree');

/**
 * A single node in the tree.
 *
 * @param {string} label label for this node
 * @param {dragHandler} hash5.ui.SearchTreeDragHandler
 *
 * @constructor
 * @extends {hash5.ui.st.Node}
 */
hash5.ui.st.FolderNode = function(label, dragHandler)
{
    goog.base(this, label, dragHandler);

};
goog.inherits(hash5.ui.st.FolderNode, hash5.ui.st.Node);


/** @inheritDoc */
hash5.ui.st.FolderNode.prototype.createDom = function()
{
    var data = {
        title: this.label_
    };

    var el = goog.soy.renderAsFragment(hash5.templates.SearchTree.folderNode, data);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.st.FolderNode.prototype.getContentElement = function()
{
    return this.getElementByClass('sub-nodes');
};

/** @inheritDoc */
hash5.ui.st.FolderNode.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElementByClass('collapse-icon'), goog.events.EventType.CLICK, this.toggle);
};

/**
 * toggles folder
 */
hash5.ui.st.FolderNode.prototype.toggle = function()
{
    goog.dom.classes.toggle(this.getElement(), 'collapsed');
};

/** @inheritDoc */
hash5.ui.st.FolderNode.prototype.handleAction_ = function()
{
    this.toggle();
    hash5.api.clearListPanel();

    this.handleActionInternal_();
};

/** @inheritDoc */
hash5.ui.st.FolderNode.prototype.handleActionInternal_ = function()
{
    this.forEachChild(function(child) {
        child.handleActionInternal_();
    });
};

/** @inheritDoc */
hash5.ui.st.FolderNode.prototype.addChild = function(child, opt_render)
{
    // make sure that searchnodes are always at the end
    var index = 0;

    this.forEachChild(function(child) {
        if(child instanceof hash5.ui.st.FolderNode) {
            index++;
        }
    });

    this.addChildAt(child, index, opt_render);
};