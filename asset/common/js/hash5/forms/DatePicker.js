goog.provide('hash5.forms.DatePicker');

goog.require('goog.async.Delay');
goog.require('goog.ui.Control');
goog.require('goog.ui.registry');
goog.require('goog.events.KeyCodes');

goog.require('hash5.forms.IControl');
goog.require('hash5.forms.DatePickerRenderer');


/**
 * A DatePicker control
 *
 * @param {string=} content Text to set as the DatePicker's value.
 * @param {hash5.forms.DatePickerRenderer=} opt_renderer Renderer used to render or
 *     decorate the DatePicker.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *     document interaction.
 * @constructor
 * @implements {hash5.forms.IControl}
 * @extends {goog.ui.Control}
 */
hash5.forms.DatePicker = function(content, opt_renderer, opt_domHelper)
{
    goog.base(this, content, opt_renderer || hash5.forms.DatePickerRenderer.getInstance(), opt_domHelper);

    this.addClassName('form-control');

    /**
     * Delay after which change event is fired
     *
     * @type {goog.async.Delay}
     * @private
     */
    this.changeDelay_ = new goog.async.Delay(this.fireChangeEvent_, 300, this);

    /**
     * Defines whether change event should be delayed
     *
     * @type {boolean}
     * @private
     */
    this.delayChangeEvent_ = true;

    /**
     * Field name
     *
     * @type {string}
     * @private
     */
    this.fieldName_ = '';

    /**
     * DatePicker value
     *
     * @type {*}
     * @private
     */
    this.value_ = '';

    /**
     * DatePicker placeholder
     *
     * @type {string}
     * @private
     */
    this.placeholder_ = '';

    /**
     * @type {boolean}
     * @private
     */
    this.isPasswordField_ = false;


    this.setHandleMouseEvents(false);
    this.setAllowTextSelection(true);
    if (!content)
    {
        this.setContent('');
    }
};
goog.inherits(hash5.forms.DatePicker, goog.ui.Control);

/** @inheritDoc */
hash5.forms.DatePicker.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.fieldName_ = el.name;

    if (this.className_)
    {
        goog.dom.classes.add(el, this.className_);
    }
};

/** @inheritDoc */
hash5.forms.DatePicker.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var el = this.getElement();

    if (this.placeholder_)
    {
        el.placeholder = this.placeholder_;
    }

    if(this.isPasswordField_)
    {
        this.getElement().setAttribute('type', 'password');
    }

    this.getHandler()
        .listen(el, goog.events.EventType.KEYDOWN, this.handleKeyDown_)
        .listen(el, goog.events.EventType.KEYUP, this.handleKeyUp_)
        .listen(el, goog.events.EventType.CHANGE, this.fireChangeEvent_)
        .listen(el, goog.events.EventType.FOCUS, this.handleFocus_);
};

/**
 * Fires change event if value has actually been changed
 *
 * @private
 */
hash5.forms.DatePicker.prototype.fireChangeEvent_ = function()
{
    if (this.value_ != this.getValue())
    {
        this.value_ = this.getValue();
        this.dispatchEvent(goog.events.EventType.CHANGE);
    }
};

/**
 * Focuses in DatePicker
 */
hash5.forms.DatePicker.prototype.focus = function()
{
    this.getElement().focus();
};


/**
 * handles focus event and redispatches it
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.forms.DatePicker.prototype.handleFocus_ = function(e)
{
    this.dispatchEvent(e);
};

/**
 * Returns field name
 *
 * @return {string}
 */
hash5.forms.DatePicker.prototype.getFieldName = function()
{
    return this.fieldName_;
};

/**
 * Returns current value
 *
 * @return {*}
 */
hash5.forms.DatePicker.prototype.getValue = function()
{
    return this.getElement().value;
};

/**
 * Handles key down events
 *
 * @param {goog.events.BrowserEvent} e
 * @private
 */
hash5.forms.DatePicker.prototype.handleKeyDown_ = function(e)
{
    if (e.keyCode == goog.events.KeyCodes.ENTER)
    {
        this.dispatchEvent(goog.events.EventType.SUBMIT);
    }

    this.dispatchEvent(goog.events.EventType.KEYDOWN);
};

/**
 * Handles key up events
 *
 * @param {goog.events.BrowserEvent} e
 * @private
 */
hash5.forms.DatePicker.prototype.handleKeyUp_ = function(e)
{
    this.dispatchEvent(goog.events.EventType.KEYUP);

    if (this.delayChangeEvent_)
    {
        this.changeDelay_.start();
    }
    else
    {
        this.fireChangeEvent_();
    }
};

/** @inheritDoc */
hash5.forms.DatePicker.prototype.reset = function()
{
    this.setValue('');
};

/**
 * Sets DatePicker config
 *
 * @param {Object} config
 */
hash5.forms.DatePicker.prototype.setConfig = function(config)
{
    if (goog.isDef(config.delayChangeEvent))
    {
        this.delayChangeEvent_ = !!config.delayChangeEvent;
    }

    if (goog.isDef(config.className))
    {
        this.addClassName(config.className);
    }

    if (goog.isDef(config.fieldName))
    {
        this.fieldName_ = config.fieldName;
    }

    if (goog.isDef(config.placeholder))
    {
        this.setPlaceholder(config.placeholder);
    }

    if (goog.isDef(config.password))
    {
        this.isPasswordField_ = !!config.password;
    }
};

/**
 * Sets DatePicker placeholder
 *
 * @param {string} placeholder
 */
hash5.forms.DatePicker.prototype.setPlaceholder = function(placeholder)
{
    this.placeholder_ = placeholder;

    this.placeholder_ = placeholder;
    if (this.getElement())
    {
        this.getElement().placeholder = this.placeholder_;
    }
};


/**
 * Sets control state to invalid
 *
 * @param {boolean} isInvalid
 */
hash5.forms.DatePicker.prototype.setInvalid = function(isInvalid)
{
    goog.dom.classes.enable(this.getElement(), 'invalid', isInvalid);
};

/**
 * Sets control's value
 *
 * @param {*} value
 */
hash5.forms.DatePicker.prototype.setValue = function(value)
{
    if (this.getElement().value != value)
    {
        this.getElement().value = value;
        this.value_ = /** @type {string} */ (value);
        this.dispatchEvent(goog.events.EventType.CHANGE);
    }
};



/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'datepicker',
    function() {
      return new hash5.forms.DatePicker('');
    }
);
