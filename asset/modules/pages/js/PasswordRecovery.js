goog.provide('hash5.modules.pages.PasswordRecovery');

goog.require('goog.ui.Component');
goog.require('goog.net.XhrIo');
goog.require('goog.Uri');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.validation.FormValidation');
goog.require('hash5.validation.RequiredFieldValidator');
goog.require('hash5.validation.EqualityValidator');
goog.require('hash5.forms.DefaultErrorProvider');
goog.require('hash5.ui.MessageBox');

goog.require('hash5.modules.pages.templates.PasswordRecovery');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.modules.pages.PasswordRecovery = function()
{
    goog.base(this);


    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    /** @desc password */
    var MSG_PASSWORD = goog.getMsg('Password');
    /** @desc password repeat */
    var MSG_PASSWORD_REPEAT = goog.getMsg('Confirm your password');
    this.form_.addFormItem(MSG_PASSWORD, 'textbox', {fieldName: 'password', password: true});
    this.form_.addFormItem(MSG_PASSWORD_REPEAT, 'textbox', {fieldName: 'password-repeat', password: true});

    /** @desc required msg for password */
    var MSG_PASSWORD_REQ = goog.getMsg('Please insert your password.');
    /** @desc error msg for not equal passwords */
    var MSG_PASSWORD_DISMATCH = goog.getMsg('These passwords don\'t match.');

    this.form_.validation = new hash5.validation.FormValidation([
        new hash5.validation.RequiredFieldValidator('password', MSG_PASSWORD_REQ),
        new hash5.validation.EqualityValidator('password-repeat', MSG_PASSWORD_DISMATCH, 'password')
    ]);

    /**
     * @type {goog.Uri.QueryData}
     * @private
     */
    this.queryData_ = new goog.Uri(document.location.href).getQueryData();
};
goog.inherits(hash5.modules.pages.PasswordRecovery, goog.ui.Component);

/** @inheritDoc */
hash5.modules.pages.PasswordRecovery.prototype.createDom = function()
{
  var el = soy.renderAsFragment(hash5.modules.pages.templates.PasswordRecovery.wrapper);
  this.decorateInternal(/** @type {Element} */ (el));

  this.addChild(this.form_);
  this.form_.render(this.getElementByClass('form-wrapper'));
};

/** @inheritDoc */
hash5.modules.pages.PasswordRecovery.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    // set form validations and errorProvider
    this.form_.errorProvider = new hash5.forms.DefaultErrorProvider();
    this.form_.errorProvider.render(this.getElement());

    // register handlers
    var recrBtn = this.getElementByClass('btn-rec');
    this.getHandler()
        .listen(recrBtn, goog.events.EventType.CLICK, this.handleRecBtnClick_)
        .listen(this.form_, goog.events.EventType.SUBMIT, this.handleRecBtnClick_)
        .listen(this.form_.validation, hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE, this.handleValidation_);


    var qData = this.queryData_;
    if(!qData.get('code') || !qData.get('user') || qData.get('codeWrong') === 1) {
        this.showInvalidRequestError_();
    }
};


/**
 * handle save btn click
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.modules.pages.PasswordRecovery.prototype.handleRecBtnClick_ = function(e)
{
    this.form_.validate();
};

/**
 * @param  {hash5.validation.FormValidationEvent} e
 * @private
 */
hash5.modules.pages.PasswordRecovery.prototype.handleValidation_ = function(e)
{
    var result = /** @type {hash5.validation.FormValidationResult} */ (e.result);

    if (result.isValid()) {
        var formData = this.form_.getData();
        var xhr = new goog.net.XhrIo();
        xhr.listen(goog.net.EventType.COMPLETE, this.handleRequestLoaded_, false, this);

        var qData = this.queryData_,
            query = goog.Uri.QueryData.createFromMap({
                'user': qData.get('user'),
                'code': qData.get('code'),
                'pass': formData['password']
            }).toString()

            // TODO api prefix... config file?
        xhr.send('/api/resetpw?' + query, 'GET');
    }
};

/**
 * @param  {goog.events.Event} e
 * @private
 */
hash5.modules.pages.PasswordRecovery.prototype.handleRequestLoaded_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess()) {
        hash5.ui.MessageBox.info('Changed', 'We changed your password.');
    } else if (xhr.getStatus() != goog.net.HttpStatus.BAD_REQUEST) {
        this.showInvalidRequestError_();
    } else {
        var xhrError = goog.net.ErrorCode.getDebugMessage(xhr.getLastErrorCode());
        hash5.ui.MessageBox.warn('Error', 'Error on connection server: <br />' + xhrError);
    }
};

/**
 * @private
 */
hash5.modules.pages.PasswordRecovery.prototype.showInvalidRequestError_ = function()
{
    goog.dom.classes.add(this.getElement(), 'invalid-code');
};