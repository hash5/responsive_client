goog.provide('hash5.module.geo5.LatLng');

/**
 * @param {number} lat
 * @param {number} lng
 * @param {[number, number]=} indices
 * @constructor
 */
hash5.module.geo5.LatLng = function(lat, lng, indices)
{

    /**
     * @type {google.maps.LatLng}
     * @private
     */
     this.LatLng_ = new google.maps.LatLng(lat, lng);

    /**
     * @type {[number, number] | null}
     * @private
     */
    this.indices_ = indices || null;
};

/**
 * @return {google.maps.LatLng}
 */
hash5.module.geo5.LatLng.prototype.getLatLng = function()
{
    return this.LatLng_;
};

/**
 * @param {google.maps.LatLng} latlng
 */
hash5.module.geo5.LatLng.prototype.setLatLng = function(latlng)
{
    this.LatLng_  = latlng;
};

/**
 *  returns the latitude and longitude as hashtag for the system
 *  @return {string}
 */
hash5.module.geo5.LatLng.prototype.toString = function()
{
    return this.LatLng_.lat() + ':' +this.LatLng_.lng();
};

/**
 * @param {hash5.module.geo5.LatLng} pos
 */
hash5.module.geo5.LatLng.prototype.equals = function(pos)
{
    return this.LatLng_.equals(pos.LatLng_);
};

/**
 * returns parsed indices
 *
 * @return {[number, number] | null}
 */
hash5.module.geo5.LatLng.prototype.getIndices = function()
{
    return this.indices_ || null;
};

/**
 * update indices
 *
 * @param {hash5.module.geo5.LatLng} newIndices
 */
hash5.module.geo5.LatLng.prototype.updateIndices = function(newIndices)
{
    return this.indices_ = newIndices.indices_;
};