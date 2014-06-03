goog.provide('hash5.style');

/**
 * Translates element position
 *
 * @param {Element} el
 * @param {number|string=} opt_x
 * @param {number|string=} opt_y
 * @param {number|string=} opt_z
 * @param {string=} opt_unit
 */
hash5.style.translate = function(el, opt_x, opt_y, opt_z, opt_unit)
{
    var x = opt_x || 0,
        y = opt_y || 0,
        z = opt_z || 0,
        unit = opt_unit || '';

    var val = 'translate3d(' + x + unit + ', ' + y + unit + ', ' + z + unit + ')';

    goog.style.setStyle(el, 'transform', val);
};


/**
 * Checks whether a coordinate position resides inside a rectangle.
 * @param {goog.math.Coordinate} pos The coordinate position.
 * @param {goog.math.Rect} rect The rectangle.
 * @return {boolean} True if 'pos' is within the bounds of 'rect'.
 */
hash5.style.isInRect = function(pos, rect) {
  return pos.x > rect.left && pos.x < rect.left + rect.width &&
         pos.y > rect.top && pos.y < rect.top + rect.height;
};