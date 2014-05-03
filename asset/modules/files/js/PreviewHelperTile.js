goog.provide('hash5.module.files.PreviewHelperTile');

goog.require('hash5.ui.editor.HelperTile');
goog.require('hash5.module.files.Template');

/**
 * PreviewHelperTile to upload files
 *
 * @param {hash5.module.files.File} file
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.files.PreviewHelperTile = function(file)
{
    goog.base(this);

    /**
     * @type {hash5.module.files.File}
     * @private
     */
    this.file_ = file;
};
goog.inherits(hash5.module.files.PreviewHelperTile, hash5.ui.editor.HelperTile);


/** @inheritDoc */
hash5.module.files.PreviewHelperTile.prototype.createDom = function()
{
    goog.base(this, 'createDom');

    var data = {
        url: this.file_.getUrl()
    };

    var el = goog.soy.renderAsFragment(hash5.module.files.Template.previewHelperTile, data);
    this.getContentElement().appendChild(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.module.files.PreviewHelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    goog.dom.classes.add(this.getElement(), 'file-tile');
};

/** @inheritDoc */
hash5.module.files.PreviewHelperTile.prototype.beforeClose_ = function()
{
    var url = this.file_.getUrl(),
        entryText = this.getComponent().getEditor().getEntryText(),
        startIndex = entryText.indexOf(url),
        indices = [startIndex, startIndex + url.length];

    this.dispatchEvent({
        type: hash5.ui.editor.EventType.CHANGED_TAG,
        tagName: '',
        value: url,
        removeTag: true,
        indices: indices
    });
};