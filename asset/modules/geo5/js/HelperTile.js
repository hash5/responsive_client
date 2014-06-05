goog.provide('hash5.module.geo5.HelperTile');

goog.require('goog.date.Interval');

goog.require('hash5.ui.editor.HelperTile');

/**
 *
 * @param {hash5.module.geo5.LatLng=} pos
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.geo5.HelperTile = function(pos)
{
    goog.base(this);

    /**
     * @type {google.maps.Map}
     * @private
     */
     this.map_;

     /**
      * @type {hash5.module.geo5.LatLng}
      * @private
      */
      this.currentPos = pos || new hash5.module.geo5.LatLng(0, 0);

      if(!pos) {
        this.loadCurrentUserPosition()
      }

      /**
       * @type {google.maps.Marker}
       * @private
       */
      this.marker_ = null;
};
goog.inherits(hash5.module.geo5.HelperTile, hash5.ui.editor.HelperTile);

/** @inheritDoc */
hash5.module.geo5.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var mapOptions = {
        zoom: 15,
        center: this.currentPos.getLatLng(),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var renderElement = this.getContentElement();
    renderElement.style.height = '200px';
    this.map_ = new google.maps.Map(renderElement, mapOptions);

    this.marker_ = new google.maps.Marker({
        position: this.currentPos.getLatLng(),
        map: this.map_,
        draggable: true,
        title: 'Position'
    });

    google.maps.event.addListener(this.marker_, 'dragend', goog.bind(this.handlePosChanged_,this));
};

/**
 * handles marker position change
 */
hash5.module.geo5.HelperTile.prototype.handlePosChanged_ = function()
{
  //update position
  var newPosition = new google.maps.LatLng(this.marker_.getPosition().lat(), this.marker_.getPosition().lng());
  this.currentPos.setLatLng(newPosition);

  this.dispatchEvent({
      type: hash5.ui.editor.EventType.CHANGED_TAG,
      tagName: 'coords',
      value: this.currentPos.toString(),
      indices: this.currentPos.getIndices()
  });
};

/**
 * @private
 */
hash5.module.geo5.HelperTile.prototype.loadCurrentUserPosition = function()
{
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(goog.bind(this.updateCurrentPosition, this));
    }
};

/**
 * @param {GeolocationPosition} pos
 * @private
 */
hash5.module.geo5.HelperTile.prototype.updateCurrentPosition = function(pos)
{
    this.currentPos.setLatLng(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

    if(this.map_) {
      this.map_.panTo(this.currentPos.getLatLng());
      this.marker_.setPosition(this.currentPos.getLatLng());
    }
};

/**
 * @return {hash5.module.geo5.LatLng}
 */
hash5.module.geo5.HelperTile.prototype.getPosition = function()
{
    return this.currentPos;
};

/** @inheritDoc */
hash5.module.geo5.HelperTile.prototype.beforeClose_ = function()
{
  var parsedIndices = this.currentPos.getIndices();

  if (parsedIndices) {
    this.dispatchEvent({
        type: hash5.ui.editor.EventType.CHANGED_TAG,
        tagName: 'coords',
        removeTag: true,
        indices: parsedIndices
    });
  }
};

/** @inheritDoc */
hash5.module.geo5.HelperTile.prototype.disposeInternal = function()
{
  google.maps.event.clearListeners(this.marker_, 'dragend');
  goog.base(this, 'disposeInternal');
};