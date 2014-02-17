goog.provide('hash5.api');
goog.provide('hash5.api.layout');


goog.require('hash5.ds.DataSource');
goog.require('hash5.controller.EditorController');

 /**
 * @param  {string} searchStr
 * @param {hash5.model.EntryCollection=} collection optional. if no collection will be assign, a new one will be created
 * @param {Function=} callback called when request is finished and results added to collection
 * @param {*=} handler
 *
 * @return {hash5.model.EntryCollection} collection where result entries will be added
 */
hash5.api.searchEntries = function(searchStr, collection, callback, handler)
{
    return hash5.ds.DataSource.getInstance().search(searchStr, collection, callback, handler);
};


// layout -------

/**
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 */
hash5.api.showEntryCollection = function(collection, title)
{
    hash5.controller.MainPanelController.getInstance().showEntryCollection(collection, title);
};


/**
 * @param  {hash5.model.Entry} entry
 * @return {hash5.ui.editor.EntryEditor}
 */
hash5.api.editEntry = function(entry)
{
    return hash5.controller.EditorController.getInstance().createEntryEditor(entry);
};

/**
 * @param  {Function} constructor constructor method to create component,
 * should be derive from {@see hash5.ui.editor.EditorComponent}.
 */
hash5.api.registerEditorComponent = function(constructor)
{
    hash5.controller.EditorController.getInstance().registerComponent(constructor);
};

/**
 *  adds a new action button to the header bar
 *
 * @param  {hash5.ui.PageHeader.ActionBarButton} button
 * @param  {Array.<hash5.ui.PageHeader.ActionBarButton>=} subButtons
 */
hash5.api.layout.addActionBarBtn = function(button, subButtons)
{
    hash5.ui.PageHeader.getInstance().addActionBarBtn(button, subButtons);
};