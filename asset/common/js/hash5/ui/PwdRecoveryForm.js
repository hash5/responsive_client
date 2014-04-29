goog.provide('hash5.ui.PwdRecoveryForm');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.validation.RequiredFieldValidator');
goog.require('hash5.validation.EqualityValidator');
goog.require('hash5.validation.EmailValidator');
goog.require('hash5.forms.DefaultErrorProvider');

goog.require('hash5.templates.ui.LoginForm');

/**
 * Password Recovery Form
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.PwdRecoveryForm = function()
{
    goog.base(this);

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    /** @desc username */
    var MSG_REC_USERNAME = goog.getMsg('Username');
    /** @desc email field */
    var MSG_REC_EMAIL = goog.getMsg('Email address');

    this.form_.addFormItem(MSG_REC_USERNAME, 'textbox', {fieldName: 'username'});
    this.form_.addFormItem(MSG_REC_EMAIL, 'textbox', {fieldName: 'email'});

    /** @desc required msg forusername */
    var MSG_REC_USERNAME_REQ = goog.getMsg('Please insert your username.');
    /** @desc error msg for not equal passwords */
    var MSG_REC_INVALID_EMAIL = goog.getMsg('Please insert a valid email address.');

    this.form_.validation = new hash5.validation.FormValidation([
        new hash5.validation.RequiredFieldValidator('username', MSG_REC_USERNAME_REQ),
        new hash5.validation.RequiredFieldValidator('email', MSG_REC_INVALID_EMAIL),
        new hash5.validation.EmailValidator('email', MSG_REC_INVALID_EMAIL)
    ]);
};
goog.inherits(hash5.ui.PwdRecoveryForm, goog.ui.Component);

/** @inheritDoc */
hash5.ui.PwdRecoveryForm.prototype.createDom = function()
{
    var el = soy.renderAsFragment(hash5.templates.ui.LoginForm.pwdRecovery);
    this.decorateInternal(/** @type {Element} */ (el));

    this.form_.render(this.getElementByClass('form-wrapper'));
};

/** @inheritDoc */
hash5.ui.PwdRecoveryForm.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    // set form validations and errorProvider
    this.form_.errorProvider = new hash5.forms.DefaultErrorProvider();
    this.form_.errorProvider.render(this.getElement());

    // register handlers
    var recBtn = this.getElementByClass('btn-rec');
    var userController = hash5.controller.UserController.getInstance();
    var cancelBtn = this.getElementByClass('cancel-rec');
    this.getHandler()
        .listen(recBtn, goog.events.EventType.CLICK, this.handleRecBtnClick_)
        .listen(this.form_, goog.events.EventType.SUBMIT, this.handleRecBtnClick_)
        .listen(cancelBtn, goog.events.EventType.CLICK, this.close)

        .listen(this.form_.validation, hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE, this.handleValidation_);
};

/**
 * rex button clicked
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.PwdRecoveryForm.prototype.handleRecBtnClick_ = function(e)
{
    // validate form
    this.form_.validate();
};

/**
 * @param  {hash5.validation.FormValidationEvent} e
 * @private
 */
hash5.ui.PwdRecoveryForm.prototype.handleValidation_ = function(e)
{
    var result = /** @type {hash5.validation.FormValidationResult} */ (e.result);

    if (result.isValid()) {
      var data = this.form_.getData();

      var userController = hash5.controller.UserController.getInstance();
      userController.resetPassword(data['username'].trim(), data['email'].trim(), this.handleRec_, this);
    }
};

/**
 * @param  {boolean} success
 * @private
 */
hash5.ui.PwdRecoveryForm.prototype.handleRec_ = function(success)
{
    if(!success) {
        /** @desc pwd rec success msg title */
        var MSG_REC_SUCESS_TITLE = goog.getMsg('EMail send');
        /** @desc pwd rec success msg */
        var MSG_REC_SUCESS = goog.getMsg("We've sent password reset instructions to your e-mail address");
        hash5.ui.MessageBox.info(MSG_REC_SUCESS_TITLE, MSG_REC_SUCESS);
        this.close();
    } else {
        /** @desc user name + email invalid error msg */
        var MSG_INVALID_USER = goog.getMsg('Sorry but we could not find your account.');
        this.form_.errorProvider
          .displayError(this.form_.getControlByName('username').getElement(), MSG_INVALID_USER);
    }
};


/**
 * handle cancel
 *
 * @param  {goog.events.BrowserEvent=} e
 */
hash5.ui.PwdRecoveryForm.prototype.close = function(e)
{
    var loginForm = new hash5.ui.LoginForm();
    loginForm.render(document.body);
    this.dispose();

    if(e) {
        e.preventDefault();
    }
};
