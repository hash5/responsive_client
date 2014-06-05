goog.provide('hash5.controller.SearchController');

goog.require('hash5.ui.search.SearchField');

/**
 * Controller for EntrySearch
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.SearchController = function()
{
    goog.base(this);

    /**
     * registered EditorComponent constructors
     *
     * @type {Array.<Function>}
     * @private
     */
    this.components_ = [];
};
goog.inherits(hash5.controller.SearchController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.SearchController);

/**
 * @param {Object} config
 */
hash5.controller.SearchController.prototype.initialize = function(config)
{

};

/**
 * registers EditorComponent. A new instance will be linked to created EntryEditors.
 * The constructor should derive from {@see hash5.ui.editor.EditorComponent}.
 *
 * @param {Function} comp constructor to create component
 */
hash5.controller.SearchController.prototype.registerComponent = function(comp)
{
    this.components_.push(comp);
};

