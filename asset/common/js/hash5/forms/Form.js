goog.provide('hash5.forms.Form');

goog.require('goog.structs.Map');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('hash5.forms.FormItem');
goog.require('hash5.validation.FormValidation');

/**
 * Form component
 * Collection of form items. Handles form validation
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.forms.Form = function()
{
    goog.base(this);

    /**
     * Form validation
     *
     * @type {hash5.validation.FormValidation}
     */
    this.validation = null;

    /**
     * Form error provider
     *
     * @type {hash5.forms.IErrorProvider}
     */
    this.errorProvider = null;
};
goog.inherits(hash5.forms.Form, goog.ui.Component);


/**
 * Adds form item to form
 *
 * @param {string} label
 * @param {string} className
 * @param {Object=} controlConfig
 *
 * @return {hash5.forms.FormItem} created FormItem
 */
hash5.forms.Form.prototype.addFormItem = function(label, className, controlConfig)
{
    var control = goog.ui.registry.getDecoratorByClassName(className);
    if (!control)
    {
        throw new Error('Decorator not found for control type "' + className + '"');
    }

    return this.addFormControl(label, control, controlConfig);
};

/**
 * Adds form control to form
 *
 * @param {string} label
 * @param {hash5.forms.IControl|goog.ui.Component} control
 * @param {Object=} controlConfig
 *
 * @return {hash5.forms.FormItem} created FormItem
 */
hash5.forms.Form.prototype.addFormControl = function(label, control, controlConfig)
{
    controlConfig = controlConfig || {};

    var formItem = new hash5.forms.FormItem();
    if (label)
    {
        formItem.setLabel(label);
    }

    control.setConfig(controlConfig);
    formItem.setControl(control);
    this.addChild(formItem, true);

    return formItem;
};

/** @inheritDoc */
hash5.forms.Form.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    var items = this.getElementsByClass('form-item');
    goog.array.forEach(items, function(itemEl) {
        var formItem = goog.ui.registry.getDecorator(itemEl);
        this.addChild(formItem);
        formItem.decorate(itemEl);

        if (goog.DEBUG)
        {
            if (formItem.getControl())
            {
                console.info('Form: Initialized Control %s: %o %o', formItem, formItem.getControl().getFieldName(), formItem.getControl());
            }
            else
            {
                console.warn('Form: no control found for form item: %o', formItem);
            }
        }
    }, this);
};

/** @inheritDoc */
hash5.forms.Form.prototype.disposeInternal = function()
{
    goog.base(this, 'disposeInternal');

    this.unbindAll();
};

/**
 * Returns form control by specified control name
 *
 * @param {string} name
 * @return {hash5.forms.IControl}
 */
hash5.forms.Form.prototype.getControlByName = function(name)
{
    var found = null;

    this.forEachChild(function(child) {
        if (child.getFieldName && child.getFieldName() == name)
        {
            found = child;
        }
        else if (child instanceof hash5.forms.FormItem && child.getControl().getFieldName() == name)
        {
            found = child.getControl();
        }

    }, this);

    return found;
};

/**
 * Returns form item by specified control name
 *
 * @param {string} name
 * @return {hash5.forms.FormItem}
 */
hash5.forms.Form.prototype.getFormItemByName = function(name)
{
    var found = null;

    this.forEachChild(function(child) {
        if (child instanceof hash5.forms.FormItem && child.getControl().getFieldName() == name)
        {
            found = child;
        }

    }, this);

    return found;
};

/**
 * Returns form data as object
 *
 * @return {Object}
 */
hash5.forms.Form.prototype.getData = function()
{
    var data = {},
        control;

    this.forEachChild(function(child) {
        if (child instanceof hash5.forms.FormItem)
        {
            control = child.getControl();
            if (control)
            {
                data[control.getFieldName()] = control.getValue();
            }
        }
        else if (child.getFieldName)
        {
            data[child.getFieldName()] = child.getValue();
        }
    }, this);

    return data;
};

/**
 * Handles validation complete event and displays error messages
 *
 * @param {Object} e
 * @protected
 */
hash5.forms.Form.prototype.handleValidationComplete = function(e)
{
    var result = /** @type {hash5.validation.FormValidationResult} */ (e.result);

    if (this.errorProvider)
    {
        this.errorProvider.display(result, this);
    }
};

/**
 * Binds model to form controls
 *
 * @param {Object} bind
 */
hash5.forms.Form.prototype.bind = function(bind)
{
    var formItem;
    for (var fieldName in bind)
    {
        formItem = this.getFormItemByName(fieldName);
        if (!formItem)
        {
            console.warn('Form: Form item not found: %s', fieldName);
        }

        this.getFormItemByName(fieldName).bind(bind[fieldName]);
    }
};

/**
 * Resets form
 */
hash5.forms.Form.prototype.reset = function()
{
    this.forEachChild(function(child) {
        if (typeof child.reset == 'function')
        {
            child.reset();
        }
    }, this);
};

/**
 * Validates form
 *
 */
hash5.forms.Form.prototype.validate = function()
{
    if (this.errorProvider)
    {
        this.errorProvider.setVisible(false);
    }

    this.forEachChild(function(child) {
        if (typeof child.setInvalid == 'function')
        {
            child.setInvalid(false);
        }
    }, this);

    if (this.validation)
    {
        this.getHandler().listenOnce(this.validation,
                hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE,
                this.handleValidationComplete);

        this.validation.validate(this.getData());
    }
};

/**
 * Unbinds model
 *
 * @param {Object} bind
 * @private
 */
hash5.forms.Form.prototype.unbind = function(bind)
{
    for (var fieldName in bind)
    {
        this.getFormItemByName(fieldName).unbind(bind[fieldName]);
    }
};

/**
 * Unbinds all models
 *
 * @return {hash5.forms.Form}
 */
hash5.forms.Form.prototype.unbindAll = function()
{
    this.forEachChild(function(child) {
        if (child instanceof hash5.forms.FormItem)
        {
            child.unbindAll();
        }
    }, this);

    return this;
};

/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'form',
    function() {
      return new hash5.forms.Form();
    }
);
