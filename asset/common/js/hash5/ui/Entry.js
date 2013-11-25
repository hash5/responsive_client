goog.provide('hash5.ui.Entry');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.model.Entry');

/**
 *
 * @param {hash5.model.Entry} model
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.Entry = function(model)
{
    goog.base(this);

    this.setModel(model);
};
goog.inherits(hash5.ui.Entry, goog.ui.Component);

/**
 * @override
 * @return {hash5.model.Entry}
 */
hash5.ui.Entry.prototype.getModel;

/** @inheritDoc */
hash5.ui.Entry.prototype.createDom = function()
{
    var dom = this.getDomHelper(),
        actions = dom.createDom('div', 'entry-actions'),
        body = dom.createDom('div', 'tooltip-body'),
        el = dom.createDom('div', 'entry', [
            body,
            actions
        ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.Entry.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.bodyEl_ = el.querySelector('element-body');
    this.bodyEl_.innerHTML = this.getModel().getText();
};

/** @inheritDoc */
hash5.ui.Entry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');


};

/**
 * sets the visibility of the login form
 *
 * @param {boolean} isVisible
 */
hash5.ui.Entry.prototype.setVisible = function(isVisible)
{
    goog.dom.classes.enable(this.getElement(), 'hidden', !isVisible);
};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'entry',
    function() {
      return new hash5.ui.Entry();
    }
);
