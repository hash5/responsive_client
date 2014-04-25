goog.provide('hash5.module.files.HelperTile');

goog.require('hash5.ui.editor.HelperTile');
goog.require('monin.ui.FileUploaderFactory');

/**
 * @param {hash5.module.calendar.File=} file
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.files.HelperTile = function(file)
{
    goog.base(this);

    /**
     * @type {hash5.module.calendar.File}
     * @private
     */
    this.file_ = file || null;

    /**
     * @type {monin.ui.FileUploader}
     * @private
     */
    this.uploader_ = new monin.ui.FileUploaderFactory().getInstance();

    // Adding listener for file select
    this.getHandler().listen(this.uploader_, 'select', this.uploadFiles_);
    this.getHandler().listen(this.uploader_, 'drop', this.uploadFiles_);
    // Adding listener for upload progress
    this.getHandler().listen(this.uploader_, 'progress', function(e) {
      this.updateProgress(e.progress);
    });

    this.getHandler().listen(this.uploader_, 'complete', this.handleUploaded_);

    /**
     * @type {boolean}
     * @private
     */
    this.isUploading_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.hasUploaded_ = false;

    this.filename_ = '';

    // This is only for HTML5 Upload able browsers
    if (this.uploader_ instanceof monin.ui.FileUploaderHtml5)
    {
        this.uploader_.setDropTarget(document.body);
    }
};
goog.inherits(hash5.module.files.HelperTile, hash5.ui.editor.HelperTile);


/** @inheritDoc */
hash5.module.files.HelperTile.prototype.createDom = function()
{
    goog.base(this, 'createDom');

    var domHelper = this.getDomHelper(),
        el = domHelper.createDom('div', undefined, [
            domHelper.createDom('button', 'btn primary enabled upload-btn', 'Bild hochladen'),
            domHelper.createDom('div', 'progress', [
                domHelper.createDom('div', 'progress-bar'),
                domHelper.createDom('div', 'progress-bar-status')
            ])
        ]);

    this.getContentElement().appendChild(el);
};

/** @inheritDoc */
hash5.module.files.HelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    goog.dom.classes.add(this.getElement(), 'file-tile');

    this.uploader_.decorate(this.getElementByClass('upload-btn'));
    this.uploader_.setMultiple(false);
};


hash5.module.files.HelperTile.prototype.updateProgress = function(progress)
{
    var pbar = this.getElementByClass('progress-bar');
    pbar.style.width = progress * 100 + '%';
    this.setStatus(Math.round(progress * 100) + '%');
};

hash5.module.files.HelperTile.prototype.setStatus = function(statusText)
{
    this.getElementByClass('progress-bar-status').innerHTML = statusText;
};

hash5.module.files.HelperTile.prototype.uploadFiles_ = function(e)
{
  if (this.isUploading_)
  {
      return;
  }

  this.isUploading_ = true;
  this.updateProgress(0);
  this.uploader_.send('/files', e.files);
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.files.HelperTile.prototype.hasUploaded = function(e)
{
    console.log(e);
    this.updateProgress(1);
    this.setStatus('Bild wurde hinzugefügt!');
    this.isUploading_ = false;
    this.hasUploaded_ = true;
    this.filename_ = e.data['filename'];
};