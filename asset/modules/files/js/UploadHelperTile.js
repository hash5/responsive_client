goog.provide('hash5.module.files.UploadHelperTile');

goog.require('hash5.ui.editor.HelperTile');
goog.require('monin.ui.FileUploaderFactory');
goog.require('hash5.module.files.Template');

/**
 * UploadHelperTile to upload files
 *
 * @constructor
 * @extends {hash5.ui.editor.HelperTile}
 */
hash5.module.files.UploadHelperTile = function()
{
    goog.base(this);

    /**
     * @type {monin.ui.FileUploader}
     * @private
     */
    this.uploader_ = new monin.ui.FileUploaderFactory().getInstance();

    // Adding listener for file select
    this.getHandler()
      .listen(this.uploader_, monin.ui.FileUploader.EventType.SELECT, this.uploadFiles_)
      .listen(this.uploader_, goog.events.FileDropHandler.EventType.DROP, this.uploadFiles_)
      // Adding listener for upload progress
      .listen(this.uploader_, monin.ui.FileUploader.EventType.PROGRESS, function(e) {
        this.updateProgress(e.progress);
      })
      .listen(this.uploader_, monin.ui.FileUploader.EventType.COMPLETE, this.handleUploaded_);

    // This is only for HTML5 Upload able browsers
    if (this.uploader_ instanceof monin.ui.FileUploaderHtml5)
    {
        this.uploader_.setDropTarget(document.body);
    }

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
};
goog.inherits(hash5.module.files.UploadHelperTile, hash5.ui.editor.HelperTile);


/** @inheritDoc */
hash5.module.files.UploadHelperTile.prototype.createDom = function()
{
    goog.base(this, 'createDom');

    var el = goog.soy.renderAsFragment(hash5.module.files.Template.uploadHelperTile);
    this.getContentElement().appendChild(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.module.files.UploadHelperTile.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.uploader_.decorate(this.getElementByClass('upload-btn'));
    this.uploader_.setMultiple(false);
};


/**
 * @param  {number} progress
 */
hash5.module.files.UploadHelperTile.prototype.updateProgress = function(progress)
{
    var pbar = this.getElementByClass('progress-bar');
    pbar.style.width = progress * 100 + '%';
    this.setStatus(Math.round(progress * 100) + '%');
};

/**
 * @param {string} statusText
 */
hash5.module.files.UploadHelperTile.prototype.setStatus = function(statusText)
{
    this.getElementByClass('progress-bar-status').innerHTML = statusText;
};


/**
 * @param {goog.events.Event} e
 */
hash5.module.files.UploadHelperTile.prototype.uploadFiles_ = function(e)
{
  console.log("da");
  if (this.isUploading_) {
      return;
  }

  goog.dom.classes.remove(this.getElementByClass('progress'), 'hidden');
  goog.dom.classes.add(this.getElementByClass('upload-form'), 'hidden');

  this.isUploading_ = true;
  this.updateProgress(0);
  this.uploader_.send('/files', e.files);

  this.showPreview_(e.files);
};

/**
 * provide preview image for uploading images
 * @param  {Array.<monin.ui.FileUploader.File>} files
 * @private
 */
hash5.module.files.UploadHelperTile.prototype.showPreview_ = function(files)
{
  var thumbHolder = this.getElementByClass('thumbs');

  for (var i = 0, f; f = files[i]; i++) {
    var orgFile = f.original;

    // only process image files
    if (!orgFile.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
              '" title="', escape(theFile.name), '"/>'].join('');
        thumbHolder.appendChild(span);
      };
    })(orgFile);
    reader.readAsDataURL(orgFile);
  }
};

/**
 * @param {goog.events.Event} e
 */
hash5.module.files.UploadHelperTile.prototype.handleUploaded_ = function(e)
{
    var responseData = e.data,
      file = responseData[0];

    /*var exampleResponse = [
      {
        "_id": "535e0bbecc0d81700984def0",
        "filename": "asdf.pdf",
        "contentType": "binary/octet-stream",
        "length": 44831,
        "metadata": {
          "owner": "532ff3cc669c3c940cc603cd",
          "access": []
        },
        "md5": "8362d0d9b2b37df5a0bff7d2b3f4f80f",
        "uploadName": "file0",
        "url": "http://dev.hash5.com:8080/files/535e0bbecc0d81700984def0"
      }
    ]; */

    this.updateProgress(1);
    //var MSG_UPLOAD_SUCCESS = goog.getMsg('Image was uploaded succesfully!');
    //this.setStatus(MSG_UPLOAD_SUCCESS);

    this.isUploading_ = false;
    this.hasUploaded_ = true;

    this.dispatchEvent({
        type: hash5.ui.editor.EventType.CHANGED_TAG,
        tagName: '',
        value: file['url']
    });

    // reparsing will remove this tile and insert a preview tile
};