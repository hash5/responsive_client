goog.provide('hash5.ui.SearchTree');

goog.require('goog.ui.tree.TreeControl');
goog.require('goog.fx.DragDropGroup');

goog.require('hash5.ui.SearchTreeNode');
goog.require('hash5.ui.SearchTreeDragHandler');

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
    this.registerDisposable(this.tree_);

    /**
     * @type {hash5.ui.SearchTreeDragHandler}
     * @private
     */
    this.dragHandler_ = new hash5.ui.SearchTreeDragHandler();
    this.registerDisposable(this.dragHandler_);
};
goog.inherits(hash5.ui.SearchTree, goog.ui.Component);

/** @inheritDoc */
hash5.ui.SearchTree.prototype.createDom = function()
{
    /** @desc add folder button */
    var MSG_ADD_FOLDER = goog.getMsg('Add Folder');
    var domHelper = this.getDomHelper(),
        el = domHelper.createDom('div', undefined, [
        domHelper.createDom('div', {
            'class': 'btn add-folder-btn tooltip',
            'data-tooltip': MSG_ADD_FOLDER
        }, '+')
    ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.SearchTree.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var addBtn = this.getElementByClass('add-folder-btn');
    this.getHandler().listen(addBtn, goog.events.EventType.CLICK, this.addFolder);

    var userSearchTree = hash5.controller.UserController.getInstance().getSearchTree();
    this.renderSearchTree(userSearchTree);

    this.getHandler().listen(this.dragHandler_, goog.fx.AbstractDragDrop.EventType.DROP, this.handleChange_);
};

/**
 * renders search tree
 *
 * @param  {Array} searchTree
 */
hash5.ui.SearchTree.prototype.renderSearchTree = function(searchTree)
{
    /**
     * example:
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
    var node = new hash5.ui.SearchTreeNode(data['title'], this.dragHandler_);
    node.setModel(data);
    parentNode.add(node);

    this.getHandler().listen(node, goog.events.EventType.CHANGE, this.handleChange_);

    if(data['children'])
    {
        for(var i = 0; i < data['children'].length; i++)
        {
            this.addSubNode_(node, data['children'][i]);
        }
    }
};

/**
 *
 * @param  {string} search
 * @param  {string=} title
 */
hash5.ui.SearchTree.prototype.addSearch = function(search, title)
{
    var data = {
        'title': title || search,
        'type': 'request',
        'query': search
    };

    this.addSubNode_(this.tree_.getTree(), data);

    this.handleChange_();
};

/**
 * adds new folder to the searchtree
 *
 * @param {string=} title optional title for the new folder
 */
hash5.ui.SearchTree.prototype.addFolder = function(title)
{
    var strTitle = goog.isString(title) ? title : 'new folder';

    var data = {
        'title': strTitle,
        'type': 'folder'
    };

    this.addSubNode_(this.tree_.getTree(), data);

    this.handleChange_();
};


/**
 * handles any change in the searchTree
 * serializes the tree and stores it to the server
 */
hash5.ui.SearchTree.prototype.handleChange_ = function()
{
    var searchTreeData = this.serialize();
    var userController = hash5.controller.UserController.getInstance();

    userController.saveSearchTree(searchTreeData);
};

/**
 * @return {!Array} serialized tree
 */
hash5.ui.SearchTree.prototype.serialize = function()
{
    var treeData = [];
    var tree = this.tree_;

    var children = tree.getChildren();
    for(var i = 0; i < children.length; i++)
    {
        var child = /** @type {hash5.ui.SearchTreeNode} */ (children[i]);
        treeData.push(this.serializeNode_(child));
    }

    return treeData;
};

/**
 * @param {hash5.ui.SearchTreeNode} node
 * @return {!Object} serialized node
 */
hash5.ui.SearchTree.prototype.serializeNode_ = function(node)
{
    var model = node.getModel();

    var children = node.getChildren();
    var childrenData = [];
    for(var i = 0; i < children.length; i++)
    {
        var child = /** @type {hash5.ui.SearchTreeNode} */ (children[i]);
        childrenData.push(this.serializeNode_(child));
    }

    var nodeData = {
        'title': model['title'],
        'type': model['type'],
        'query': model['query'],
        'children': childrenData
    };

    return nodeData;
};