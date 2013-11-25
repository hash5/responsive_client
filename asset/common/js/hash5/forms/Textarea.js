goog.provide('hash5.forms.Textarea');

goog.require('goog.ui.Control');
goog.require('goog.ui.Textarea');
goog.require('goog.ui.registry');
goog.require('hash5.forms.IControl');


/**
 * A textarea control to handle growing/shrinking with textarea.value.
 *
 * @param {string} content Text to set as the textarea's value.
 * @param {goog.ui.TextareaRenderer=} opt_renderer Renderer used to render or
 *     decorate the textarea. Defaults to {@link goog.ui.TextareaRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Textarea}
 * @implements {hash5.forms.IControl}
 */
hash5.forms.Textarea = function(content, opt_renderer, opt_domHelper)
{
    goog.base(this, content, opt_renderer, opt_domHelper);

    this.addClassName('form-control');

    /**
     * @type {goog.async.Delay}
     * @private
     */
    this.changeDelay_ = new goog.async.Delay(this.update_, 300, this);

    /**
     * @type {boolean}
     * @private
     */
    this.delayChangeEvent_ = true;

    /**
     * @type {string}
     * @private
     */
    this.fieldName_ = '';

    /**
     * @type {*}
     * @private
     */
    this.value_ = '';

    /**
     * @type {string}
     * @private
     */
    this.placeholder_ = '';
};
goog.inherits(hash5.forms.Textarea, goog.ui.Textarea);

/** @inheritDoc */
hash5.forms.Textarea.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.fieldName_ = el.name;

    if (this.className_)
    {
        goog.dom.classes.add(el, this.className_);
    }

};

/** @override **/
hash5.forms.Textarea.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var el = this.getElement();

    if (this.placeholder_)
    {
        el.placeholder = this.placeholder_;
    }

    this.getHandler().listen(el, [
        goog.events.EventType.FOCUS,
        goog.events.EventType.BLUR
    ], this.handleFocus_);

    this.getHandler().listen(el, goog.events.EventType.KEYDOWN,
        this.handleKeyDown_);

    this.getHandler().listen(el, goog.events.EventType.KEYUP,
        this.handleKeyUp_);
};

/**
 * Returns field name
 *
 * @return {string}
 */
hash5.forms.Textarea.prototype.getFieldName = function()
{
    return this.fieldName_;
};

/**
 * Handles user focus on textarea
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.forms.Textarea.prototype.handleFocus_ = function(e)
{
    this.dispatchEvent(e.type);
};

/**
 * Handles keydown event
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.forms.Textarea.prototype.handleKeyDown_ = function(e)
{
    this.dispatchEvent(goog.events.EventType.KEYDOWN);
};

/**
 * Handles key up events and forces change event
 *
 * @param {goog.events.BrowserEvent} e
 */
hash5.forms.Textarea.prototype.handleKeyUp_ = function(e)
{
    this.dispatchEvent(goog.events.EventType.KEYUP);

    if (this.delayChangeEvent_)
    {
        this.changeDelay_.start();
    }
    else
    {
        this.update_();
    }
};

/**
 * Resets textarea value
 */
hash5.forms.Textarea.prototype.reset = function()
{
    this.getElement().value = '';
};


/**
 * Sets textarea configuration
 *
 * @param {Object} config
 */
hash5.forms.Textarea.prototype.setConfig = function(config)
{
    if (typeof config.delayChangeEvent != 'undefined')
    {
        this.delayChangeEvent_ = !!config.delayChangeEvent;
    }

    if (typeof config.className != 'undefined')
    {
        this.addClassName(config.className);
    }

    if (typeof config.fieldName != 'undefined')
    {
        this.fieldName_ = config.fieldName;
    }

    if (typeof config.placeholder != 'undefined')
    {
        this.placeholder_ = config.placeholder;
        if (this.getElement())
        {
            this.getElement().placeholder = this.placeholder_;
        }
    }
};


/**
 *
 * @param {boolean} isInvalid
 */
hash5.forms.Textarea.prototype.setInvalid = function(isInvalid)
{
    goog.dom.classes.enable(this.getElement(), 'invalid', isInvalid);
};

/**
 * @param {*} value
 */
hash5.forms.Textarea.prototype.setValue = function(value)
{
    if (this.getElement().value != value)
    {
        this.getElement().value = value;
        this.value_ = /** @type {string} */ (value);
        this.dispatchEvent(goog.events.EventType.CHANGE);
    }
};

/**
 * @private
 */
hash5.forms.Textarea.prototype.update_ = function()
{
    if (this.value_ != this.getValue())
    {
        this.value_ = this.getValue();
        this.dispatchEvent(goog.events.EventType.CHANGE);
    }
};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'textarea',
    function() {
      return new hash5.forms.Textarea('');
    });
