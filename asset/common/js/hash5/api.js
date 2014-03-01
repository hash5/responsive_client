goog.provide('hash5.api');
goog.provide('hash5.api.layout');


goog.require('hash5.ds.DataSource');
goog.require('hash5.controller.EditorController');


/**
 * fetches entries from given url and stores it in collection
 *
 * @param  {string} url relative url to fetch entries
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.api.getEntries = function(url, collection, callback, handler)
{
    var ds = hash5.ds.DataSource.getInstance();
    return ds.getEntries(url, collection, callback, handler);
};


/**
 * searches for entries with given searchStr
 * results will be added to collection.
 *
 * @param  {string} searchStr
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.api.searchEntries = function(searchStr, collection, callback, handler)
{
    var ds = hash5.ds.DataSource.getInstance();
    return ds.search(searchStr, collection, callback, handler);
};


/**
 * renders entryCollection to mainpanel
 *
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 */
hash5.api.showEntryCollection = function(collection, title)
{
    hash5.controller.MainPanelController.getInstance().showEntryCollection(collection, title);
};

/**
 * adds item to searchtree
 *
 * @param  {string} search
 * @param  {string=} title
 */
hash5.api.addSearchTreeItem = function(search, title)
{
    hash5.controller.MainPanelController.getInstance().addSearchTreeItem(search, title);
};

/**
 * opens EntryEditor to edit given entry
 *
 * @param  {hash5.model.Entry} entry
 * @return {hash5.ui.editor.EntryEditor}
 */
hash5.api.editEntry = function(entry)
{
    return hash5.controller.EditorController.getInstance().createEntryEditor(entry);
};

/**
 * registers EditorComponent. A new instance will be linked to created EntryEditors.
 *
 * @param  {Function} constructor constructor method to create component,
 * should be derive from {@see hash5.ui.editor.EditorComponent}.
 */
hash5.api.registerEditorComponent = function(constructor)
{
    hash5.controller.EditorController.getInstance().registerComponent(constructor);
};

/**
 * adds new buttonGroup to page header
 *
 * @param  {hash5.layout.HeaderButtonGroup} buttonGroup
 */
hash5.api.layout.addHeaderButtonGroup = function(buttonGroup)
{
    hash5.layout.Header.getInstance().addButtonGroup(buttonGroup);
};