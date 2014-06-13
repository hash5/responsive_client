goog.provide('hash5.ui.Entry');

goog.require('goog.ui.Component');
goog.require('goog.date.relative');

goog.require('hash5.model.Entry');
goog.require('hash5.templates.ui.Entry');
goog.require('hash5.utils');


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
    // split text when length is greater than this value
    var splitLength = 200;

    var entry = this.getModel(),
        relDate = goog.date.relative.getPastDateString(entry.getCreatedDate()),
        prevBody = entry.getTextParser().toString(),
        restBody = '';

    var needExpose = prevBody.length > splitLength;

    if(needExpose) {
        // make sure split does not break html tags
        var splitPosition = hash5.utils.findSplitPosition(prevBody, splitLength);
        restBody = prevBody.substr(splitPosition);
        prevBody = prevBody.substr(0, splitPosition);

        needExpose = restBody.length > 0;
    }

    var data = {
        editUrl: '/edit/' + entry.getId(),
        deleteUrl: '/delete/' + entry.getId(),
        prevBody: prevBody,
        restBody: restBody,
        needExpose: needExpose,
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
        .listen(entry, hash5.model.Entry.EventType.TEXT_CHANGED, this.handleTextChanged_)
        .listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_);

    entry.getTextParser().triggerDisplay(this);

    //var dlg = this.getParent().getDragHandler();
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

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.Entry.prototype.handleClick_ = function(e)
{
    var tagName = e.target.nodeName;

    if(tagName != goog.dom.TagName.A && tagName != goog.dom.TagName.I) {
        this.dispatchEvent(goog.ui.Component.EventType.ACTION);
        this.getElementByClass('action-edit').click();
    }

    if(goog.dom.classes.has(e.target, 'see_more_link')) {
        goog.dom.classes.add(this.getElement(), 'text_exposed');
        e.preventDefault();
    }
};