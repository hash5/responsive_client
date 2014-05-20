goog.provide('hash5.module.geo5.HelperTile');

goog.require('goog.date.Interval');

goog.require('hash5.ui.editor.HelperTile');

/**
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 * @param {hash5.module.geo5.LatLng}
 */
hash5.module.geo5.HelperTile = function(pos)
{
    goog.base(this);

    /**
     * @type {google.maps}
     * @private
     */
     this.map;

     /**
      * @type {hash5.module.geo5.LatLng}
      * @private
      */
      this.currentPos = pos || null;

      /**
       * @type {google.maps.marker}
       * @private
       */
      this.marker_ = null;

};
goog.inherits(hash5.module.geo5.HelperTile, hash5.ui.editor.HelperTile);

/** @inheritDoc */
hash5.module.geo5.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');


    this.setUpControls_();
    this.drawExampleMap();
};

/**
 * @private
 */
hash5.module.geo5.HelperTile.prototype.setUpControls_ = function()
{
    //this.useCurrentLocatoin = this.form_.addFormItem('', 'checkbox', {fieldName: 'use-current-pos'}).getControl();
};

hash5.module.geo5.HelperTile.prototype.drawExampleMap = function()
{

    if(this.currentPos == null){
      this.currentPos = new hash5.module.geo5.LatLng(0,0,0);
      this.getCurrentUserPosition();
    }

    var mapOptions = {
        zoom: 15,
        center: this.currentPos.getLatLng(),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var renderElement = this.getContentElement();
    renderElement.style.height = '200px';
    this.map = new google.maps.Map(renderElement, mapOptions);

    this.marker_ = new google.maps.Marker({
        position: this.currentPos.getLatLng(),
        map: this.map,
        draggable: true,
        title: 'Hofgarten Ettlingen'
    });

    google.maps.event.addListener(this.marker_, 'dragend', goog.bind(this.posChanged_,this));

};

/**
 * callback to update the maps view
 */
hash5.module.geo5.HelperTile.prototype.posChanged_ = function(){
  console.log(this.marker_.getPosition());
  //use getter and setter functions
  if(this.currentPos == null)
    this.currentPos = new hash5.module.geo5.LatLng(this.marker_.getPosition().lat(), this.marker_.getPosition().lng(), 1);

  //update hash5latln
  this.currentPos.setLatitude(this.marker_.getPosition().lat());
  this.currentPos.setLongitude(this.marker_.getPosition().lng());

  //update position of the marker and the map
  this.currentPos.setLatLng(new google.maps.LatLng(this.marker_.getPosition().lat(), this.marker_.getPosition().lng()));
  //this.map.panTo(this.currentLatLng);

  this.getComponent().updateTextForPosition(this.currentPos);
};

/**
 *@private
 *
 */
hash5.module.geo5.HelperTile.prototype.getCurrentUserPosition = function(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(goog.bind(this.updateCurrentPosition, this));
    }
};

/**
 * @param {google.maps.LatLng}
 * @private
 */
 hash5.module.geo5.HelperTile.prototype.updateCurrentPosition = function(pos){
    console.log('lat '+ pos.coords.latitude + ' long ' + pos.coords.longitude);
    if(this.currentPos == null)
      this.currentPos = new hash5.module.geo5.LatLng(0,0,0);
    this.currentPos.setLatLng(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    this.map.panTo(this.currentPos.getLatLng());
    this.marker_.setPosition(this.currentPos.getLatLng());
 };