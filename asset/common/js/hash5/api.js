goog.provide('hash5.api');
goog.provide('hash5.api.layout');


goog.require('hash5.ds.DataSource');

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

// TODO save, delete, load

/**
 * @param  {hash5.model.EntryCollection} collection
 * @param  {string=} title
 */
hash5.api.showEntryCollection = function(collection, title)
{
    hash5.controller.MainPanelController.getInstance().showEntryCollection(collection, title);
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