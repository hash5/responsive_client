goog.provide('hash5.forms.Textbox');

goog.require('goog.async.Delay');
goog.require('goog.ui.Control');
goog.require('goog.ui.registry');
goog.require('goog.events.KeyCodes');

goog.require('hash5.forms.IControl');
goog.require('hash5.forms.TextboxRenderer');


/**
 * A textbox control
 *
 * @param {string} content Text to set as the textbox's value.
 * @param {hash5.forms.TextboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the textbox.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *     document interaction.
 * @constructor
 * @implements {hash5.forms.IControl}
 * @extends {goog.ui.Control}
 */
hash5.forms.Textbox = function(content, opt_renderer, opt_domHelper)
{
    goog.base(this, content, opt_renderer || hash5.forms.TextboxRenderer.getInstance(), opt_domHelper);

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
     * Textbox value
     *
     * @type {*}
     * @private
     */
    this.value_ = '';

    /**
     * Textbox placeholder
     *
     * @type {string}
     * @private
     */
    this.placeholder_ = '';


    this.setHandleMouseEvents(false);
    this.setAllowTextSelection(true);
    if (!content)
    {
        this.setContent('');
    }
};
goog.inherits(hash5.forms.Textbox, goog.ui.Control);

/** @inheritDoc */
hash5.forms.Textbox.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.fieldName_ = el.name;

    if (this.className_)
    {
        goog.dom.classes.add(el, this.className_);
    }
};

/** @inheritDoc */
hash5.forms.Textbox.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var el = this.getElement();

    if (this.placeholder_)
    {
        el.placeholder = this.placeholder_;
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
hash5.forms.Textbox.prototype.fireChangeEvent_ = function()
{
    if (this.value_ != this.getValue())
    {
        this.value_ = this.getValue();
        this.dispatchEvent(goog.events.EventType.CHANGE);
    }
};

/**
 * Focuses in textbox
 */
hash5.forms.Textbox.prototype.focus = function()
{
    this.getElement().focus();
};


/**
 * handles focus event and redispatches it
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.forms.Textbox.prototype.handleFocus_ = function(e)
{
    this.dispatchEvent(e);
};

/**
 * Returns field name
 *
 * @return {string}
 */
hash5.forms.Textbox.prototype.getFieldName = function()
{
    return this.fieldName_;
};

/**
 * Returns current value
 *
 * @return {*}
 */
hash5.forms.Textbox.prototype.getValue = function()
{
    return this.getElement().value;
};

/**
 * Handles key down events
 *
 * @param {goog.events.BrowserEvent} e
 * @private
 */
hash5.forms.Textbox.prototype.handleKeyDown_ = function(e)
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
hash5.forms.Textbox.prototype.handleKeyUp_ = function(e)
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
hash5.forms.Textbox.prototype.reset = function()
{
    this.setValue('');
};

/**
 * Sets textbox config
 *
 * @param {Object} config
 */
hash5.forms.Textbox.prototype.setConfig = function(config)
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
};

/**
 * Sets textbox placeholder
 *
 * @param {string} placeholder
 */
hash5.forms.Textbox.prototype.setPlaceholder = function(placeholder)
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
hash5.forms.Textbox.prototype.setInvalid = function(isInvalid)
{
    goog.dom.classes.enable(this.getElement(), 'invalid', isInvalid);
};

/**
 * Sets control's value
 *
 * @param {*} value
 */
hash5.forms.Textbox.prototype.setValue = function(value)
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
    'textbox',
    function() {
      return new hash5.forms.Textbox('');
    }
);
