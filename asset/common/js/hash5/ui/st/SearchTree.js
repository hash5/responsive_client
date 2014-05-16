goog.provide('hash5.ui.st.SearchTree');

goog.require('hash5.ui.st.FolderNode');
goog.require('hash5.ui.st.SearchNode');
goog.require('hash5.ui.st.SearchTreeDragHandler');
goog.require('hash5.templates.SearchTree');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.st.SearchTree = function()
{
    goog.base(this);


    /**
     * @type {hash5.ui.st.SearchTreeDragHandler}
     * @private
     */
    this.dragHandler_ = new hash5.ui.st.SearchTreeDragHandler();
    this.registerDisposable(this.dragHandler_);
};
goog.inherits(hash5.ui.st.SearchTree, goog.ui.Component);

/** @inheritDoc */
hash5.ui.st.SearchTree.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.SearchTree.wrapper);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.st.SearchTree.prototype.getContentElement = function()
{
    return this.getElementByClass('search-tree-root');
};

/** @inheritDoc */
hash5.ui.st.SearchTree.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var addBtn = this.getElementByClass('add-folder-btn');
    var addNewestEntriesBtn = this.getElementByClass('newest-entries-btn');
    this.getHandler()
        .listen(addBtn, goog.events.EventType.CLICK, this.addFolder)
        .listen(addNewestEntriesBtn, goog.events.EventType.CLICK, this.addNewestEntries_);

    var userSearchTree = hash5.controller.UserController.getInstance().getSearchTree();
    this.renderSearchTree(userSearchTree);

    this.getHandler().listen(this.dragHandler_, goog.fx.AbstractDragDrop.EventType.DROP, this.handleChange_);
};

/**
 * @param {goog.events.BrowserEvent} e
 */
hash5.ui.st.SearchTree.prototype.addNewestEntries_ = function(e)
{
    var newestEntries = hash5.api.getNewestEntries();
    /** @desc newest entry list heading */
    var MSG_NEWESTENTRIES_HEADING = goog.getMsg('Latest Entries');
    hash5.api.showEntryCollection(newestEntries, MSG_NEWESTENTRIES_HEADING);
};

/**
 * renders search tree
 *
 * @param  {Array} searchTree
 */
hash5.ui.st.SearchTree.prototype.renderSearchTree = function(searchTree)
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

    for(var i = 0; i < searchTree.length; i++) {
        this.addSubNode_(this, searchTree[i]);
    }
};

/**
 *
 * @param  {hash5.ui.st.Node|goog.ui.Component} parentNode
 * @param  {Object} data
 * @private
 */
hash5.ui.st.SearchTree.prototype.addSubNode_ = function(parentNode, data)
{
    var node;
    if(data['type'] === 'folder') {
        node = new hash5.ui.st.FolderNode(data['title'], this.dragHandler_);
    } else {
        node = new hash5.ui.st.SearchNode(data['title'], this.dragHandler_);
    }

    node.setModel(data);
    parentNode.addChild(node, true);

    this.getHandler().listen(node, goog.events.EventType.CHANGE, this.handleChange_);

    if(data['children']) {
        for(var i = 0; i < data['children'].length; i++) {
            this.addSubNode_(node, data['children'][i]);
        }
    }
};

/**
 *
 * @param  {string} search
 * @param  {string=} title
 */
hash5.ui.st.SearchTree.prototype.addSearch = function(search, title)
{
    var data = {
        'title': title || search,
        'type': 'request',
        'query': search
    };

    this.addSubNode_(this, data);

    this.handleChange_();
};

/**
 * adds new folder to the searchtree
 *
 * @param {string=} title optional title for the new folder
 */
hash5.ui.st.SearchTree.prototype.addFolder = function(title)
{
    var strTitle = goog.isString(title) ? title : 'new folder';

    var data = {
        'title': strTitle,
        'type': 'folder'
    };

    this.addSubNode_(this, data);

    this.handleChange_();
};


/**
 * handles any change in the searchTree
 * serializes the tree and stores it to the server
 */
hash5.ui.st.SearchTree.prototype.handleChange_ = function()
{
    var searchTreeData = this.serialize();
    var userController = hash5.controller.UserController.getInstance();

    userController.saveSearchTree(searchTreeData);
};

/**
 * @return {!Array} serialized tree
 */
hash5.ui.st.SearchTree.prototype.serialize = function()
{
    var treeData = [];

    this.forEachChild(function(child){
        treeData.push(this.serializeNode_(child));
    }, this);

    return treeData;
};

/**
 * @param {hash5.ui.st.Node} node
 * @return {!Object} serialized node
 */
hash5.ui.st.SearchTree.prototype.serializeNode_ = function(node)
{
    var childrenData = [];
    node.forEachChild(function(el){
        var child = /** @type {hash5.ui.st.Node} */ (el);
        childrenData.push(this.serializeNode_(child));
    }, this);

    var model = node.getModel();
    var nodeData = {
        'title': model['title'],
        'type': model['type'],
        'query': model['query'],
        'children': childrenData
    };

    return nodeData;
};

/** @inheritDoc */
hash5.ui.st.SearchTree.prototype.addChild = function(child, opt_render)
{
    // make sure that searchnodes are always at the end
    var index = 0,
        lastFolder = null;

    this.forEachChild(function(child) {
        if(child instanceof hash5.ui.st.FolderNode) {
            goog.dom.classes.remove(child.getElement(), 'last-folder');
            lastFolder = child;
            index++;
        }
    });

    if(lastFolder != null) {
        //goog.dom.classes.add(child.getElement(), 'last-folder');
    }

    this.addChildAt(child, index, opt_render);
};