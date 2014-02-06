goog.provide('hash5.ui.Entry');

goog.require('goog.ui.Component');
goog.require('goog.date.relative');

goog.require('hash5.model.Entry');
goog.require('hash5.templates.ui.Entry');

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
    var entry = this.getModel();

    var data = {
        editUrl: '/edit/' + entry.getId(),
        body: entry.getParsedText().toString(),
        date: entry.getCreatedDate()
    };

    var el = soy.renderAsFragment(hash5.templates.ui.Entry.listEntry, data);
    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.Entry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');


};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.Entry.prototype.handleClick_ = function(e)
{
    hash5.api.editEntry(this.getModel());
};