goog.provide('hash5.module.FilesModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');

goog.require('hash5.module.files.EditorComponent');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.FilesModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.FilesModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.FilesModule.prototype.initialize = function(context)
{
    hash5.api.registerEditorComponent(hash5.module.files.EditorComponent);
};

hash5.module.setLoaded(hash5.module.Modules.FILES, hash5.module.FilesModule);