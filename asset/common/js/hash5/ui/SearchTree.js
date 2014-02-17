goog.provide('hash5.ui.SearchTree');
goog.provide('hash5.ui.SearchTreeNode');

goog.require('goog.ui.tree.TreeControl');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.SearchTree = function()
{
    goog.base(this);

    /**
     * @type {goog.ui.tree.TreeControl}
     * @private
     */
    this.tree_ = new goog.ui.tree.TreeControl('root');
};
goog.inherits(hash5.ui.SearchTree, goog.ui.Component);

/** @inheritDoc */
hash5.ui.SearchTree.prototype.createDom = function()
{
    goog.base(this, 'createDom');
};

/** @inheritDoc */
hash5.ui.SearchTree.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var userSearchTree = hash5.controller.UserController.getInstance().getSearchTree();
    this.renderSearchTree(userSearchTree);
};

/**
 * renders search tree
 *
 * @param  {Array} searchTree
 */
hash5.ui.SearchTree.prototype.renderSearchTree = function(searchTree)
{
    /**
     * [
          {
            "id": "n139254344870083",
            "title": "folder",
            "type": "folder",
            "children": [
              {
                "id": "r139254343255888",
                "title": "#hashCompex",
                "type": "request",
                "query": "query=#hashCompex"
              }
            ]
          },
          {
            "id": "r139254327577248",
            "title": "asdf",
            "type": "request",
            "query": "query=#hash"
          }
        ]
     */

    for(var i = 0; i < searchTree.length; i++)
    {
        this.addSubNode_(this.tree_.getTree(), searchTree[i]);
    }

    this.tree_.setShowRootNode(false);
    this.tree_.setShowLines(false);
    this.tree_.render(this.getElement());
};


/**
 *
 * @param  {goog.ui.tree.TreeNode} parentNode
 * @param  {Object} data
 * @private
 */
hash5.ui.SearchTree.prototype.addSubNode_ = function(parentNode, data)
{
    var node = new hash5.ui.SearchTreeNode(data['title']);
    node.setModel(data);
    parentNode.add(node);

    if(data['children'])
    {
        for(var i = 0; i < data['children'].length; i++)
        {
            this.addSubNode_(node,data['children'][i]);
        }
    }
};


/**
 * A single node in the tree.
 *
 * @param {string} html The html content of the node label.
 *
 * @constructor
 * @extends {goog.ui.tree.TreeNode}
 */
hash5.ui.SearchTreeNode = function(html)
{
    goog.base(this, html);

};
goog.inherits(hash5.ui.SearchTreeNode, goog.ui.tree.TreeNode);

/** @inheritDoc */
hash5.ui.SearchTreeNode.prototype.onClick_ = function(e)
{
    var model = this.getModel();

    if(model['type'] === 'request')
    {
        var entryColection = hash5.api.searchEntries(model['query']);
        hash5.api.showEntryCollection(entryColection);
    }
};