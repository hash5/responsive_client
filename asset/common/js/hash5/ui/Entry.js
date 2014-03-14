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

    var relDate = goog.date.relative.getDateString(entry.getCreatedDate());
    var data = {
        editUrl: '/edit/' + entry.getId(),
        deleteUrl: '/delete/' + entry.getId(),
        body: entry.getTextParser().toString(),
        date: relDate
    };

    var el = goog.soy.renderAsFragment(hash5.templates.ui.Entry.listEntry, data);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.Entry.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var entry = this.getModel();

    this.getHandler()
        .listen(entry, hash5.model.Entry.EventType.TEXT_CHANGED, this.handleTextChanged_);

    entry.getTextParser().triggerDisplay(this);

    var dlg = this.getParent().getDragHandler();
    //dlg.listenForDragEvents(this.getElement());
};

/**
 * @param  {goog.events.Event} e
 */
hash5.ui.Entry.prototype.handleTextChanged_ = function(e)
{
    var entryText = this.getModel().getTextParser().toString();

    this.getElementByClass('entry-body').innerHTML = entryText;
    this.getModel().getTextParser().triggerDisplay(this);
};