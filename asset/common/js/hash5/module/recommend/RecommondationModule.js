goog.provide('hash5.module.RecommondationModule');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');

goog.require('hash5.module.recommend.EditorComponent');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.RecommondationModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.RecommondationModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.RecommondationModule.prototype.initialize = function(context)
{
    hash5.api.registerEditorComponent(hash5.module.recommend.EditorComponent);
};

//hash5.module.setStaticLoaded(hash5.module.Modules.RECOMMEND, hash5.module.RecommondationModule);