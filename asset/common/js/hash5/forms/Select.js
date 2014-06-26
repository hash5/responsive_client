goog.provide('hash5.forms.Select');

goog.require('goog.dom.dataset');
goog.require('goog.ui.Select');
goog.require('goog.ui.Option');

/**
 * Select controls.
 * Extends google closure native control to support hash5.forms.IControl interface
 *
 * @constructor
 * @extends {goog.ui.Select}
 * @implements {hash5.forms.IControl}
 */
hash5.forms.Select = function()
{
    goog.base(this, '');

    /**
     * @type {string}
     * @private
     */
    this.fieldName_ = '';
};
goog.inherits(hash5.forms.Select, goog.ui.Select);

/** @inheritDoc */
hash5.forms.Select.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.fieldName_ = /** @type {string} */ (goog.dom.dataset.get(el, 'name'));
};

/**
 * Returns field name
 *
 * @return {string}
 */
hash5.forms.Select.prototype.getFieldName = function()
{
    return this.fieldName_;
};

/**
 * Returns select box value
 *
 * @return {*}
 */
hash5.forms.Select.prototype.getValue = function()
{
    return this.getSelectedItem() ?
                this.getSelectedItem().getValue() : null;
};

/**
 * Resets select value to default
 */
hash5.forms.Select.prototype.reset = function()
{
    this.setSelectedIndex(0);
};

/**
 * @param {Object} config
 */
hash5.forms.Select.prototype.setConfig = function(config)
{
    if (config.caption)
    {
        this.setCaption(config.caption);
    }

    if (config.options && goog.isArray(config.options))
    {
        this.addOptions(config.options);
    }

    if (goog.isDef(config.fieldName))
    {
        this.fieldName_ = config.fieldName;
    }
};

/**
 * adds given options to select
 *
 * @param {Array.<Object>} options
 */
hash5.forms.Select.prototype.addOptions = function(options)
{
    for (var i = 0; i < options.length; i++)
    {
        this.addItem(new goog.ui.Option(options[i].text, options[i].model));
    }
};

/**
 * Defines whether control is in invalid state
 */
hash5.forms.Select.prototype.setInvalid = goog.nullFunction;

/** @inheritDoc */
hash5.forms.Select.prototype.CSS_CLASS = 'select';

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    hash5.forms.Select.prototype.CSS_CLASS,
    function() {
      return new hash5.forms.Select();
});
