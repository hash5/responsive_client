goog.provide('hash5.ui.UiDecorator');

goog.require('goog.dom');
goog.require('goog.ui.registry');
goog.require('goog.dom.classes');

/**
 * @constructor
 */
hash5.ui.UiDecorator = function()
{

    /**
     * @type {Array.<goog.ui.Component>}
     * @private
     */
    this.uiElements_ = [];

    /**
     * @type {string}
     */
    this.decoratorCssClass = 'fx';
}
goog.addSingletonGetter(hash5.ui.UiDecorator);

/**
 * takes all elements from dom with css-class set in this.decoratorCssClass_ and decorates them using the goog.ui.registry
 * removes decoratorCssClass after decoration
 *
 * @param {(Document|Element)=} opt_el Optional element to look in.
 */
hash5.ui.UiDecorator.prototype.decorateElements = function(opt_el)
{
    var items = goog.dom.getElementsByClass(this.decoratorCssClass, opt_el);

    goog.array.forEach(items, function(itemEl) {
        var uiElement = goog.ui.registry.getDecorator(itemEl);

        if(!goog.isNull(uiElement))
        {
            uiElement.decorate(itemEl);
            this.uiElements_.push(uiElement);
        }


        goog.dom.classes.remove(itemEl, this.decoratorCssClass);

        if (goog.DEBUG)
        {
            if (!goog.isNull(uiElement))
            {
                console.info('UiDecorator: Initialized Control %s: %o', uiElement, uiElement.getElement());
            }
            else
            {
                console.warn('UiDecorator: no control found for form item: %o', uiElement);
            }
        }
    }, this);
}

