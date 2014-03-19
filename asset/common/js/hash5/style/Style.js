goog.provide('hash5.style');

/**
 * Translates element position
 *
 * @param {Element} el
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_z
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