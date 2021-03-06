goog.provide('hash5.ui.RegisterForm');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.validation.RequiredFieldValidator');
goog.require('hash5.validation.EqualityValidator');
goog.require('hash5.validation.EmailValidator');
goog.require('hash5.forms.DefaultErrorProvider');

goog.require('hash5.templates.ui.LoginForm');

/**
 * RegisterForm
 * After successful registration hash5.ui.LoginForm will be shown
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.RegisterForm = function()
{
    goog.base(this);

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    /** @desc username */
    var MSG_USERNAME = goog.getMsg('Username');
    /** @desc password */
    var MSG_PASSWORD = goog.getMsg('Password');
    /** @desc password repeat */
    var MSG_PASSWORD_REPEAT = goog.getMsg('Confirm your password');
    /** @desc email field */
    var MSG_EMAIL = goog.getMsg('Email address');

    this.form_.addFormItem(MSG_USERNAME, 'textbox', {fieldName: 'username'});
    this.form_.addFormItem(MSG_PASSWORD, 'textbox', {fieldName: 'password', password: true});
    this.form_.addFormItem(MSG_PASSWORD_REPEAT, 'textbox', {fieldName: 'password-repeat', password: true});
    this.form_.addFormItem(MSG_EMAIL, 'textbox', {fieldName: 'email'});

    /** @desc required msg forusername */
    var MSG_USERNAME_REQ = goog.getMsg('Please insert your username.');
    /** @desc required msg for password */
    var MSG_PASSWORD_REQ = goog.getMsg('Please insert your password.');
    /** @desc error msg for not equal passwords */
    var MSG_PASSWORD_DISMATCH = goog.getMsg('These passwords don\'t match.');
    /** @desc error msg for not equal passwords */
    var MSG_INVALID_EMAIL = goog.getMsg('Please insert a valid email address.');

    this.form_.validation = new hash5.validation.FormValidation([
        new hash5.validation.RequiredFieldValidator('username', MSG_USERNAME_REQ),
        new hash5.validation.RequiredFieldValidator('password', MSG_PASSWORD_REQ),
        new hash5.validation.EqualityValidator('password-repeat', MSG_PASSWORD_DISMATCH, 'password'),
        new hash5.validation.RequiredFieldValidator('email', MSG_INVALID_EMAIL),
        new hash5.validation.EmailValidator('email', MSG_INVALID_EMAIL)
    ]);
};
goog.inherits(hash5.ui.RegisterForm, goog.ui.Component);

/** @inheritDoc */
hash5.ui.RegisterForm.prototype.createDom = function()
{
    var el = soy.renderAsFragment(hash5.templates.ui.LoginForm.register);
    this.decorateInternal(/** @type {Element} */ (el));

    this.form_.render(this.getElementByClass('form-wrapper'));
};

/** @inheritDoc */
hash5.ui.RegisterForm.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    // set form validations and errorProvider
    this.form_.errorProvider = new hash5.forms.DefaultErrorProvider();
    this.form_.errorProvider.render(this.getElement());

    // register handlers
    var registerBtn = this.getElementByClass('btn-register');
    var userController = hash5.controller.UserController.getInstance();
    var cancelBtn = this.getElementByClass('cancel-register');
    this.getHandler()
        .listen(registerBtn, goog.events.EventType.CLICK, this.handleRegBtnClick_)
        .listen(this.form_, goog.events.EventType.SUBMIT, this.handleRegBtnClick_)
        .listen(cancelBtn, goog.events.EventType.CLICK, this.handleClose_)

        .listen(this.form_.validation, hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE, this.handleValidation_)
        .listen(userController, hash5.controller.UserController.EventType.REGISTERED, this.handleRegistered_)
        .listen(userController, hash5.controller.UserController.EventType.CONFLICT, this.handleRegisterConflict_)
        .listen(userController, hash5.controller.UserController.EventType.LOGIN, this.handleLoggedIn_);
};

/**
 * registration button clicked
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.RegisterForm.prototype.handleRegBtnClick_ = function(e)
{
    // validate form
    this.form_.validate();
};

/**
 * @param  {hash5.validation.FormValidationEvent} e
 * @private
 */
hash5.ui.RegisterForm.prototype.handleValidation_ = function(e)
{
    var result = /** @type {hash5.validation.FormValidationResult} */ (e.result);

    if (result.isValid()) {
      var data = this.form_.getData();

      var userController = hash5.controller.UserController.getInstance();
      userController.register(data['username'].trim(), data['password'].trim(), data['email'].trim());
    }
};

/**
 * @param  {goog.events.Event} e
 * @private
 */
hash5.ui.RegisterForm.prototype.handleRegistered_ = function(e)
{
    var data = this.form_.getData();
    var userController = hash5.controller.UserController.getInstance();
    userController.login(data['username'].trim(), data['password'].trim());
};

/**
 * @param  {goog.events.Event} e
 * @private
 */
hash5.ui.RegisterForm.prototype.handleLoggedIn_ = function(e)
{
    this.dispose();
};

/**
 * handle cancel
 * closes dialog and shows loginform
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.RegisterForm.prototype.handleClose_ = function(e)
{
    var loginForm = new hash5.ui.LoginForm();
    loginForm.render(document.body);
    this.dispose();

    e.preventDefault();
};

/**
 * handle registration error
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.RegisterForm.prototype.handleRegisterConflict_ = function(e)
{
    /** @desc user name conflict error msg */
    var MSG_USER_CONFLICT = goog.getMsg('Someone already has that username.');
    this.form_.errorProvider
      .displayError(this.form_.getControlByName('username').getElement(), MSG_USER_CONFLICT);
};
