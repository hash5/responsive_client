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
};

/** @inheritDoc */
hash5.ui.editor.HelperTile.prototype.getContentElement = function()
{
  return this.getElementByClass('helper-tile-content');
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
    this.beforeClose_();
    this.dispatchEvent(goog.ui.Component.EventType.CLOSE);
    this.dispose();
};

/**
 * will be called before tile will be removed. Can be overridden from subclasses
 * @protected
 */
hash5.ui.editor.HelperTile.prototype.beforeClose_ = function()
{
};

/**
 * @param {hash5.ui.editor.EditorComponent} comp
 */
hash5.ui.editor.HelperTile.prototype.setComponent = function(comp)
{
    this.comp_ = comp;

    comp.registerHelperTile(this);
};

/**
 * @return {hash5.ui.editor.EditorComponent}
 */
hash5.ui.editor.HelperTile.prototype.getComponent = function()
{
    return this.comp_;
};