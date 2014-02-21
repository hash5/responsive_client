goog.provide('hash5.ui.editor.HelperTile');


goog.require('goog.ui.Component');
goog.require('hash5.templates.ui.EntryEditor');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.editor.HelperTile = function()
{
    goog.base(this);

    /**
     * @type {hash5.ui.editor.EditorComponent}
     */
    this.comp_ = null;
};
goog.inherits(hash5.ui.editor.HelperTile, goog.ui.Component);

/** @inheritDoc */
hash5.ui.editor.HelperTile.prototype.createDom = function()
{
    var data = {
        title: this.comp_.getTitle(),
        icon: this.comp_.getIcon()
    };

    var el = goog.soy.renderAsFragment(hash5.templates.ui.EntryEditor.helperTile, data);
    this.decorateInternal(/** @type {Element} */ (el));

    //var subDom = this.createInnerDom();
    //this.getElementByClass('helper-tile-content').appendChild(subDom);
};

/** @inheritDoc */
hash5.ui.editor.HelperTile.prototype.getContentElement = function()
{
  return this.getElementByClass('helper-tile-content');
};

/**
 * this method should be overriden from subclasses to create custom inner html
 *
 * @return {Element}
 */
hash5.ui.editor.HelperTile.prototype.createInnerDom = function()
{
    // TODO remove?
    return this.getDomHelper().createElement('div');
};

/** @inheritDoc */
hash5.ui.editor.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.getHandler()
        .listen(this.getElementByClass('remove-btn'), goog.events.EventType.CLICK, this.handleRemoveBtn_);
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.HelperTile.prototype.handleRemoveBtn_ = function(e)
{
    this.dispatchEvent(goog.ui.Component.EventType.CLOSE);
    this.dispose();
};

/**
 * @param {hash5.ui.editor.EditorComponent} comp
 */
hash5.ui.editor.HelperTile.prototype.setComponent = function(comp)
{
    this.comp_ = comp;
};