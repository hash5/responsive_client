goog.provide('hash5.module.geo5.LatLng');

/**
 *
 * @constructor
 */
hash5.module.geo5.LatLng = function(lat, lng, indices)
{

    /**
     * @type {number}
     * @private
     */
    this.latitude_ = lat;

    /**
     * @type {number}
     * @private
     */
    this.longitude_ = lng;

    /**
     * @type {google.maps.LatLng}
     * @private
     */

     this.LatLng_ = new google.maps.LatLng(lat, lng);

    /**
     * @type {[number, number]}
     * @private
     */
    this.indices_ = indices;
};

/**
 *  @return {number}
 */
hash5.module.geo5.LatLng.prototype.getLatitude = function(){
    return this.latitude_;
};

/** 
 *  @param {number}
 */
hash5.module.geo5.LatLng.prototype.setLatitude = function(lat){
    this.LatLng_ = new google.maps.LatLng(lat, this.longitude_);
    this.latitude_ = lat;
};

/**
 *  @return {number}
 */
hash5.module.geo5.LatLng.prototype.getLongitude = function(){
    return this.longitude_;
};

/** 
 *  @param {number}
 */
hash5.module.geo5.LatLng.prototype.setLongitude = function(longitude){
    this.LatLng_ = new google.maps.LatLng(this.latitude_, longitude);
    this.longitude_  = longitude;
};

/**
 *  returns the latitude and longitude as hashtag for the system
 *  @return{string}
 */
hash5.module.geo5.LatLng.prototype.toString = function(){
    return '#coords:"'+this.latitude_+':'+this.longitude_+'"';
};

/**
 *
 *
 */
hash5.module.geo5.LatLng.prototype.equals = function(pos){
    return this.latitude_ === pos.latitude_ && this.longitude_ === pos.longitude_;
};

/**
 * returns parsed indices for given date key
 * can be used for startdate, enddate...
 *
 * @param {string} key
 * @return {[number, number] | null}
 */
hash5.module.geo5.LatLng.prototype.getIndices = function(key)
{
    return this.indices_[key] || null;
};

/**
 *  @return {google.maps.LatLng}
 */
hash5.module.geo5.LatLng.prototype.getLatLng = function(){
    return this.LatLng_;
};

/**
 *  @param {google.maps.LatLng}
 */
hash5.module.geo5.LatLng.prototype.setLatLng = function(latlng){
    this.latitude_ = latlng.lat();
    this.longitude_ = latlng.lng();
    this.LatLng_  = latlng;
};
