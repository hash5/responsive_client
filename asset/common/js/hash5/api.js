goog.provide('hash5.api');
goog.provide('hash5.api.layout');
goog.provide('hash5.api.search');


goog.require('hash5.ds.DataSource');
goog.require('hash5.controller.EditorController');

/**
 * fetches newest entries and stores thmen in collection
 *
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.api.getNewestEntries = function(collection, callback, handler)
{
    var ds = hash5.ds.DataSource.getInstance();
    return ds.getNewestEntries(collection, callback, handler);
};

/**
 * fetches entries from given url and stores them in collection
 *
 * @param  {string} url relative url to fetch entries
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {hash5.ds.Options=} options will be merged with hash5.ds.DataSource.DefaultOptions and specifies pagination
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 * @param {boolean=} append if set true all retrieving entries will be added to collection. Otherwise
 * the new entries will be merged
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.api.getEntries = function(url, collection, options, callback, handler, append)
{
    var ds = hash5.ds.DataSource.getInstance();
    return ds.getEntries(url, collection, options, callback, handler, append);
};


/**
 * searches for entries with given searchStr or searchoptions
 * results will be added to collection.
 *
 * @param  {string|hash5.ds.SearchOptions} searchOptions
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.api.searchEntries = function(searchOptions, collection, callback, handler)
{
    // TODO add options
    var options = undefined;
    var ds = hash5.ds.DataSource.getInstance();
    return ds.search(searchOptions, collection, options, callback, handler);
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
 * removes all current entryLists
 */
hash5.api.clearListPanel = function()
{
    hash5.controller.MainPanelController.getInstance().clearListPanel();
};

/**
 * adds item to searchtree
 *
 * @param  {string} search
 * @param  {string=} title
 */
hash5.api.addSearchTreeItem = function(search, title)
{
    hash5.ui.PageSidebar.getInstance().addSearchTreeItem(search, title);
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

// --------- search ---------

/**
 * adds new form item to search option filters
 * @param {string} label
 * @param {string} className
 * @param {Object=} controlConfig
 * @return {hash5.forms.IControl} generated control
 */
hash5.api.search.addFilterItem = function(label, className, controlConfig)
{
    // TODO move to controller
    var searchField = hash5.ui.search.SearchField.getInstance();
    var searchOptionsCmp = searchField.getSearchOptionCmp();
    return searchOptionsCmp.addFormItem(label, className, controlConfig);
};


/**
 * returns eventtarget to listen for form changes
 * @return {goog.events.EventTarget}
 */
hash5.api.search.getChangeEventDispatcher = function()
{
    return hash5.controller.SearchController.getInstance();
};