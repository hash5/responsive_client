goog.provide('hash5.forms.Checkbox');

goog.require('goog.dom.dataset');
goog.require('goog.ui.Checkbox');
goog.require('hash5.forms.IControl');

/**
 * 3-state checkbox widget. Fires CHECK or UNCHECK events before toggled and
 * CHANGE event after toggled by user.
 * The checkbox can also be enabled/disabled and get focused and highlighted.
 *
 * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link goog.ui.CheckboxRenderer}.
 * @constructor
 * @implements {hash5.forms.IControl}
 * @extends {goog.ui.Checkbox}
 */
hash5.forms.Checkbox = function(opt_checked, opt_domHelper, opt_renderer)
{
    goog.base(this, opt_checked, opt_domHelper, opt_renderer);
    /**
     * @type {string}
     * @private
     */
    this.fieldName_ = '';
};
goog.inherits(hash5.forms.Checkbox, goog.ui.Checkbox);

/** @inheritDoc */
hash5.forms.Checkbox.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.fieldName_ = /** @type {string} */ (goog.dom.dataset.get(el, 'name'));
};

/**
 * Returns checkbox field name
 *
 * @return {string}
 */
hash5.forms.Checkbox.prototype.getFieldName = function()
{
    return this.fieldName_;
};

/**
 * Returns checkbox value
 *
 * @return {*} value.
 */
hash5.forms.Checkbox.prototype.getValue = function()
{
    return this.isChecked() ? '1' : '0';
};

/** @inheritDoc */
hash5.forms.Checkbox.prototype.reset = function()
{
    this.setChecked(false);
};

/**
 * Sets control display to invalid state
 *
 * @param {boolean} isInvalid
 */
hash5.forms.Checkbox.prototype.setInvalid = function(isInvalid)
{
    goog.dom.classes.enable(this.getElement(), 'invalid', isInvalid);
};

/**
 * Sets checkbox configugration (no configration options currently)
 */
hash5.forms.Checkbox.prototype.setConfig = goog.nullFunction;

/**
 * @param {*} value
 */
hash5.forms.Checkbox.prototype.setValue = function(value)
{
    value = /** @type {number} */ (value);
    this.setChecked(value == 1);
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'checkbox',
    function() {
      return new hash5.forms.Checkbox();
    });
