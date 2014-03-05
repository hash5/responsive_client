goog.provide('hash5.ui.LoginForm');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.validation.RequiredFieldValidator');
goog.require('hash5.forms.DefaultErrorProvider');

goog.require('hash5.ui.RegisterForm');
goog.require('hash5.templates.ui.LoginForm');

/**
 * Loginform
 * After successful login hash5.controller.UserController.EventType.LOGIN will be dispatch from UserController
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.LoginForm = function()
{
    goog.base(this);

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    /** @desc username */
    var MSG_USERNAME1 = goog.getMsg('Username');
    /** @desc password */
    var MSG_PASSWORD1 = goog.getMsg('Password');
    this.form_.addFormItem(MSG_USERNAME1, 'textbox', {fieldName: 'username'});
    this.form_.addFormItem(MSG_PASSWORD1, 'textbox', {fieldName: 'password', password: true});

    /** @desc required msg forusername */
    var MSG_USERNAME_REQ1 = goog.getMsg('Please insert your username.');
    /** @desc required msg for password */
    var MSG_PASSWORD_REQ1 = goog.getMsg('Please insert your password.');
    this.form_.validation = new hash5.validation.FormValidation([
        new hash5.validation.RequiredFieldValidator("username", MSG_USERNAME_REQ1),
        new hash5.validation.RequiredFieldValidator("password", MSG_PASSWORD_REQ1)
    ]);
};
goog.inherits(hash5.ui.LoginForm, goog.ui.Component);

/** @inheritDoc */
hash5.ui.LoginForm.prototype.createDom = function()
{
    var el = soy.renderAsFragment(hash5.templates.ui.LoginForm.login);
    this.decorateInternal(/** @type {Element} */ (el));

    this.form_.render(this.getElementByClass('form-wrapper'));
};

/** @inheritDoc */
hash5.ui.LoginForm.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    // set form validations and errorProvider
    this.form_.errorProvider = new hash5.forms.DefaultErrorProvider();
    this.form_.errorProvider.render(this.getElement());

    // register handlers
    var loginBtn = this.getElementByClass('btn-login');
    var registerBtn = this.getElementByClass('register-link');
    var userController = hash5.controller.UserController.getInstance();
    this.getHandler()
        .listen(loginBtn, goog.events.EventType.CLICK, this.handleLoginClick_)
        .listen(registerBtn, goog.events.EventType.CLICK, this.handleRegBtnClick_)

        .listen(this.form_, goog.events.EventType.SUBMIT, this.handleLoginClick_)
        .listen(this.form_.validation, hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE, this.handleValidated_)

        .listen(userController, hash5.controller.UserController.EventType.LOGIN, this.handleLoggedIn_)
        .listenOnce(userController, hash5.controller.UserController.EventType.UNAUTHORIZED, this.handleWrongLogIn_);
};

/**
 * login button clicked
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.LoginForm.prototype.handleLoginClick_ = function(e)
{
    // validate from
    this.form_.validate();
};


/**
 * @param  {goog.events.Event} e
 * @private
 */
hash5.ui.LoginForm.prototype.handleValidated_ = function(e)
{
    var result = /** @type {hash5.validation.FormValidationResult} */ (e.result);

    if (result.isValid()) {
        var data = this.form_.getData();

        var userController = hash5.controller.UserController.getInstance();
        userController.login(data['username'], data['password']);
    }
};

/**
 * handle valid login and disposes loginForm
 *
 * @param  {goog.events.Event} e
 * @private
 */
hash5.ui.LoginForm.prototype.handleLoggedIn_ = function(e)
{
    this.dispose();
};

/**
 * handle invalid login
 *
 * @param  {goog.events.Event} e
 * @private
 */
hash5.ui.LoginForm.prototype.handleWrongLogIn_ = function(e)
{
    /** @desc wrong password msg */
    var MSG_WRONG_PASSWORD = goog.getMsg('The email or password you entered is incorrect.');

    this.form_.errorProvider
      .displayError(this.form_.getControlByName('username').getElement(), MSG_WRONG_PASSWORD);
};


/**
 * register button clicked
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.LoginForm.prototype.handleRegBtnClick_ = function(e)
{
    var regForm = new hash5.ui.RegisterForm();
    regForm.render(document.body);

    this.dispose();
};