goog.provide('hash5.forms.TextboxRenderer');

goog.require('goog.ui.ControlRenderer');

/**
 * Textbox Renderer
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
hash5.forms.TextboxRenderer = function()
{
    goog.base(this);
};

goog.inherits(hash5.forms.TextboxRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(hash5.forms.TextboxRenderer);

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
hash5.forms.TextboxRenderer.CSS_CLASS = goog.getCssName('textbox');


/**
 * @param {goog.ui.Control} textbox
 * @return {Element}
 * @override
 */
hash5.forms.TextboxRenderer.prototype.createDom = function(textbox) {
    this.setUpTextbox_(textbox);
    var element = textbox.getDomHelper().createDom('input', {
        'type': 'text',
        'class': this.getClassNames(textbox).join(' '),
        'disabled': !textbox.isEnabled(),
        'value': textbox.getContent()
    });

    return element;
};

/** @override */
hash5.forms.TextboxRenderer.prototype.decorate = function(control, element)
{
  this.setUpTextbox_(control);
  goog.base(this, 'decorate', control, element);

  control.setContent(element.value);

  return element;
};

/** @override */
hash5.forms.TextboxRenderer.prototype.setFocusable = goog.nullFunction;

/** @override */
hash5.forms.TextboxRenderer.prototype.setState = function(textbox, state, enable)
{
    goog.base(this, 'setState', textbox, state, enable);
    var element = textbox.getElement();
    if (element && state == goog.ui.Component.State.DISABLED)
    {
        element.disabled = enable;
    }
};


/**
 * @override
 */
hash5.forms.TextboxRenderer.prototype.updateAriaState = goog.nullFunction;


/**
 * @param {goog.ui.Control} textbox Textbox control to configure
 * @private
 */
hash5.forms.TextboxRenderer.prototype.setUpTextbox_ = function(textbox)
{
    textbox.setHandleMouseEvents(false);
    textbox.setAutoStates(goog.ui.Component.State.ALL, false);
    textbox.setSupportedState(goog.ui.Component.State.FOCUSED, false);
};


/** @override **/
hash5.forms.TextboxRenderer.prototype.setContent = function(element, value)
{
    if (element)
    {
        element.value = value;
    }
};

/** @override **/
hash5.forms.TextboxRenderer.prototype.getCssClass = function()
{
    return hash5.forms.TextboxRenderer.CSS_CLASS;
};
