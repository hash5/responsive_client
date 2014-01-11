goog.provide('hash5.ui.Entry');

goog.require('goog.ui.Component');
goog.require('goog.date.relative');

goog.require('hash5.model.Entry');

/**
 * @param {hash5.model.Entry} model
 *
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
        body = dom.createDom('div', 'entry-body'),
        info = dom.createDom('div', 'entry-info', [
            dom.createDom('span', 'entry-date')
        ]),
        el = dom.createDom('li', 'entry', [
            actions,
            body,
            info
        ]);

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.Entry.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    var bodyEl = el.querySelector('.entry-body');
    bodyEl.innerHTML = this.getModel().getText();

    var infoBox = el.querySelector('.entry-date');
    infoBox.innerHTML = goog.date.relative.getDateString(this.getModel().getCreatedDate());
};

/** @inheritDoc */
hash5.ui.Entry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');


};