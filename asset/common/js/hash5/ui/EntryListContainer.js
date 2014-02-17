goog.provide('hash5.ui.EntryListContainer');

goog.require('goog.ui.Component');

goog.require('hash5.ui.EntryList');
goog.require('hash5.ui.QuickCreateEntry');
goog.require('hash5.templates.ui.EntryListContainer');


/**
 * @param {hash5.model.EntryCollection} entryCollection
 * @param {string=} title
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.EntryListContainer = function(entryCollection, title)
{
    goog.base(this);

    /**
     * @type {hash5.ui.EntryList}
     * @private
     */
    this.entryList_ = new hash5.ui.EntryList(entryCollection);


    /**
     * @type {hash5.ui.QuickCreateEntry}
     * @private
     */
    this.quickCreateEntry_ = new hash5.ui.QuickCreateEntry(entryCollection.getSearchPattern());

    /**
     * @type {string}
     * @private
     */
    this.title_ = title || entryCollection.getSearchPattern();
};
goog.inherits(hash5.ui.EntryListContainer, goog.ui.Component);

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.createDom = function()
{
    var data = {
        title: this.title_
    };

    var el = goog.soy.renderAsFragment(hash5.templates.ui.EntryListContainer.container, data);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.addChild(this.quickCreateEntry_, true);
    this.addChild(this.entryList_, true);
};

/** @inheritDoc */
hash5.ui.EntryListContainer.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElementByClass('entry-list-actions-btn'), goog.events.EventType.CLICK, this.toggleActionmenu)
        .listen(this.getElementByClass('entry-list-actions'), goog.events.EventType.CLICK, this.handleActionClick_);

};

/**
 * @param {goog.events.BrowserEvent=} e
 */
hash5.ui.EntryListContainer.prototype.toggleActionmenu = function(e)
{
    var actions = this.getElementByClass('entry-list-actions');

    goog.dom.classes.toggle(actions, 'visible');

    if(goog.dom.classes.has(actions, 'visible'))
    {
        this.getHandler().listen(document.body, goog.events.EventType.CLICK, this.toggleActionmenu, true);
    }
    else
    {
        this.getHandler().unlisten(document.body, goog.events.EventType.CLICK, this.toggleActionmenu, true);
    }
};


/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.EntryListContainer.prototype.handleActionClick_ = function(e)
{
    var actionClass = e.target.className;

    switch(actionClass){
        case 'action-close':
            this.getParent().removeChild(this);
            this.dispose();
            break;
        case 'action-save':
            break;
        case 'action-delete':
            break;
    }
};
