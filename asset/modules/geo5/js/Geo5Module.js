goog.provide('hash5.module.Geo5Module');

goog.require('hash5.module.BaseModule');

goog.require('hash5.api');
goog.require('goog.net.jsloader');
goog.require('hash5.module.geo5.EditorComponent');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.Geo5Module = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.Geo5Module, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.Geo5Module.prototype.initialize = function(context)
{
    goog.net.jsloader.load('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=hash5.mapsApiLoaded')
        .addCallback(this.handleGMapsApiLoaded_, this);
};

hash5.module.Geo5Module.prototype.handleGMapsApiLoaded_ = function()
{
    hash5.api.registerEditorComponent(hash5.module.geo5.EditorComponent);
};

hash5.module.setLoaded(hash5.module.Modules.GEO5, hash5.module.Geo5Module);

hash5.module.Geo5Module.mapsApiLoaded = function()
{
    // callback is needed for googlemaps api script tag!
    // can be left empty
};

goog.exportSymbol('hash5.mapsApiLoaded', hash5.module.Geo5Module.mapsApiLoaded);