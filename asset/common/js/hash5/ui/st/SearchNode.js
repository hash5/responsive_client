goog.provide('hash5.ui.st.SearchNode');

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
hash5.ui.st.SearchNode = function(label, dragHandler)
{
    goog.base(this, label, dragHandler);
};
goog.inherits(hash5.ui.st.SearchNode, hash5.ui.st.Node);

/** @inheritDoc */
hash5.ui.st.SearchNode.prototype.createDom = function()
{
    var data = {
        title: this.label_
    };

    var el = goog.soy.renderAsFragment(hash5.templates.SearchTree.searchNode, data);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.st.SearchNode.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');
};


/** @inheritDoc */
hash5.ui.st.SearchNode.prototype.handleActionInternal_ = function()
{
    var model = this.getModel();

    // search click
    var reEscapedUrl = model['query'].replace('#', '%23'); // server replaces escaped char
    var entryColection = hash5.api.getEntries(reEscapedUrl);
    hash5.api.showEntryCollection(entryColection, model['title']);
};
