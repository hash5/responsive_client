goog.provide('hash5.module.geo5.HelperTile');

goog.require('goog.date.Interval');

goog.require('hash5.ui.editor.HelperTile');

/**
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.geo5.HelperTile = function(event)
{
    goog.base(this);

};
goog.inherits(hash5.module.geo5.HelperTile, hash5.ui.editor.HelperTile);

/** @inheritDoc */
hash5.module.geo5.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.drawExampleMap();
};


hash5.module.geo5.HelperTile.prototype.drawExampleMap = function()
{
    var position = new google.maps.LatLng(48.943258,8.409088);

    var mapOptions = {
        zoom: 15,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var renderElement = this.getContentElement();
    renderElement.style.height = '200px';
    var map = new google.maps.Map(renderElement, mapOptions);

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Hofgarten Ettlingen'
    });
};