goog.provide('hash5.ui.SearchTreeNode');
goog.provide('hash5.ui.SearchTreeNode.Type');

/**
 * A single node in the tree.
 *
 * @param {string} label label for this node
 * @param {dragHandler} hash5.ui.SearchTreeDragHandler
 *
 * @constructor
 * @extends {goog.ui.tree.TreeNode}
 */
hash5.ui.SearchTreeNode = function(label, dragHandler)
{
    goog.base(this, this.getEditHtml(label));

    /**
     * @type {hash5.ui.SearchTreeDragHandler}
     * @private
     */
    this.dragHandler_ = dragHandler;
};
goog.inherits(hash5.ui.SearchTreeNode, goog.ui.tree.TreeNode);


/**
 * returns label combined with html for edit buttons
 *
 * @param {string} label label for this node
 * @return {string}
 */
hash5.ui.SearchTreeNode.prototype.getEditHtml = function(label)
{
    return '<span class="drag-item">' + label + '</span>'
        + '<div class="edit-btns"><span class="rename"></span><span class="delete"></span></div>';
}


/** @inheritDoc */
hash5.ui.SearchTreeNode.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.dragHandler_.addItem(this);
};

/**
 * @return {hash5.ui.SearchTreeNode.Type}
 */
hash5.ui.SearchTreeNode.prototype.getType = function()
{
    var model = this.getModel();
    return model['type'];
};

/** @inheritDoc */
hash5.ui.SearchTreeNode.prototype.onClick_ = function(e)
{
    var model = this.getModel();
    var clickedEl = /** @type {Element} */ (e.target);

    if(goog.dom.classes.has(clickedEl, 'rename'))
    {
        // rename

        // TODO custom modal
        var newName = prompt('Neuer Name: ', model['title']);
        if(newName)
        {
            model['title'] = newName;
            this.dispatchEvent(goog.events.EventType.CHANGE);

            this.setHtml(this.getEditHtml(newName));
        }
    }else if(goog.dom.classes.has(clickedEl, 'delete'))
    {
        // delete
        var parent = this.getParent();
        parent.removeChild(this);

        this.dispatchEvent(goog.events.EventType.CHANGE);
    } else if(goog.dom.classes.has(clickedEl, 'goog-tree-expand-icon'))
    {
        return;
    } else
    {
        this.handleAction_();
    }
};

/**
 * handles action event --> will be called on click
 */
hash5.ui.SearchTreeNode.prototype.handleAction_ = function()
{
    if(this.getType() == hash5.ui.SearchTreeNode.Type.REQUEST)
    {
        var model = this.getModel();

        // search click
        var entryColection = hash5.api.searchEntries(model['query']);
        hash5.api.showEntryCollection(entryColection, model['title']);
    }

    if(this.getType() == hash5.ui.SearchTreeNode.Type.FOLDER)
    {
        hash5.api.clearListPanel();
        this.forEachChild(function(child) {
            child.handleAction_();
        });
    }
};


/** @inheritDoc */
hash5.ui.SearchTreeNode.prototype.getRowClassName = function() {
    var config = this.getConfig();
    var model = this.getModel();
    var selectedClass = ' ';

    if (this.isSelected()) {
        selectedClass += config.cssSelectedRow;
    }

    if(this.getType() == hash5.ui.SearchTreeNode.Type.FOLDER)
    {
        selectedClass += ' search-folder';
    }
    else
    {
        selectedClass += ' search-link';
    }

    return config.cssTreeRow + selectedClass;
};


/**
 * @enum {string}
 */
hash5.ui.SearchTreeNode.Type = {
    FOLDER: 'folder',
    REQUEST: 'request'
};