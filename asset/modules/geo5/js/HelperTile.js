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
      //this.currentPos = pos || new hash5.module.geo5.LatLng();
      this.currentPos = pos || null;

      /**
       * @type {google.maps.LatLng}
       * @private
       */

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
    var position; 
    // = new google.maps.LatLng(48.943258,8.409088);
   // this.getCurrentPosition();
// IF position is set, point center
// else set current pos
    if(this.currentPos == null){
      this.getCurrentPosition();
    }
    else{
      this.currentLatLng =  new google.maps.LatLng(this.currentPos.getLatitude(), this.currentPos.getLongitude());
    }

    //var position = 
    var mapOptions = {
        zoom: 15,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var renderElement = this.getContentElement();
    renderElement.style.height = '200px';
    this.map = new google.maps.Map(renderElement, mapOptions);
   // this.getCurrentPosition();

    this.marker_ = new google.maps.Marker({
        position: position,
        map: this.map,
        draggable: true, 
        title: 'Hofgarten Ettlingen'
    });

    google.maps.event.addListener(this.marker_, 'dragend', goog.bind(this.posChanged_,this));

};

hash5.module.geo5.HelperTile.prototype.posChanged_ = function(){
  console.log(this.marker_.getPosition());
  //use getter and setter functions
  this.currentPos = new hash5.module.geo5.LatLng(this.marker_.getPosition().lat(), this.marker_.getPosition().lng(), 1);
  //console.log(this.currentPos.getLatitude() + ':' this.currentPos.getLongitude());
  this.currentPos.setLatitude(goog.bind(this.marker_.getPosition().lat(), this));
  this.currentPos.setLongitude(goog.bind(this.marker_.getPosition().lng()));
  this.getComponent().updateTextForPosition(this.currentPos);
};

/**
 *@private
 *
 */
hash5.module.geo5.HelperTile.prototype.getCurrentPosition = function(){
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(goog.bind(this.updateCurrentPosition, this));
};

/**
 * @param {google.maps.LatLng}
 * @private
 */
 hash5.module.geo5.HelperTile.prototype.updateCurrentPosition = function(pos){
    console.log('lat '+ pos.coords.latitude + ' long ' + pos.coords.longitude);
    this.currentLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    this.map.panTo(this.currentLatLng);
    this.marker_.setPosition(this.currentLatLng);
 };