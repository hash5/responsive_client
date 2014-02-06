goog.provide('hash5.ui.LoginForm');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.validation.RequiredFieldValidator');
goog.require('hash5.validation.EqualityValidator');
goog.require('hash5.forms.DefaultErrorProvider');

goog.require('hash5.templates.ui.LoginForm');

/**
 * Loginform with switch for registration form
 * After successful login hash5.controller.UserController.EventType.LOGIN will be dispatch from UserController
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.LoginForm = function()
{
    goog.base(this);

    /**
     * @type {Element}
     * @private
     */
    this.loginBtn_ = null;

    /**
     * @type {Element}
     * @private
     */
    this.toggleViewBtn_ = null;

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    /** @desc username */
    var MSG_USERNAME = goog.getMsg('Username');
    /** @desc password */
    var MSG_PASSWORD = goog.getMsg('Passwort');
    this.form_.addFormItem(MSG_USERNAME, 'textbox', {fieldName: 'username'});
    this.form_.addFormItem(MSG_PASSWORD, 'textbox', {fieldName: 'password', password: true});

    /**
     * validations used for login-form
     *
     * @type {hash5.validation.FormValidation}
     * @private
     */
    this.loginFormValidation_ = new hash5.validation.FormValidation([
        new hash5.validation.RequiredFieldValidator("username", "Bitte gebe deinen Usernamen ein."),
        new hash5.validation.RequiredFieldValidator("password", "Bitte gebe dein Passwort ein.")
    ]);

    /**
     * validations used for register-form
     *
     * @type {hash5.validation.FormValidation}
     * @private
     */
    this.registerFormValidation_ = new hash5.validation.FormValidation([
        new hash5.validation.RequiredFieldValidator("username", "Bitte gebe deinen Usernamen ein."),
        new hash5.validation.RequiredFieldValidator("password", "Bitte gebe dein Passwort ein."),
        new hash5.validation.EqualityValidator("password-repeat", "Die Passwörter stimmen nicht überein!", "password")
    ]);
};
goog.inherits(hash5.ui.LoginForm, goog.ui.Component);

/** @inheritDoc */
hash5.ui.LoginForm.prototype.createDom = function()
{
    var el = soy.renderAsFragment(hash5.templates.ui.LoginForm.wrapper);
    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.LoginForm.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.form_.render(this.getElementByClass('form-wrapper'));

    this.loginBtn_ = this.getElementByClass('btn-login');
    this.registerBtn_ = this.getElementByClass('btn-register');
};

/** @inheritDoc */
hash5.ui.LoginForm.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    // set form validations and errorProvider
    this.form_.validation = this.loginFormValidation_;
    this.form_.errorProvider = new hash5.forms.DefaultErrorProvider();
    this.form_.errorProvider.render(this.getElement());

    // set buttons click handlers
    this.getHandler()
        .listen(this.loginBtn_, goog.events.EventType.CLICK, this.handleLoginClick_)
        .listen(this.registerBtn_, goog.events.EventType.CLICK, this.handleRegBtnClick_)

        .listen(hash5.controller.UserController.getInstance(), hash5.controller.UserController.EventType.LOGIN, this.handleLoggedIn_);

    // set form submit handler (will be called when pressing ENTER)
    this.getHandler().listen(this.form_, goog.events.EventType.SUBMIT, function(e){
      if(goog.dom.classes.has(this.getElement(), 'registration-view')){
        this.handleRegBtnClick_(e);
      }else{
        this.handleLoginClick_(e);
      }
    });
};

/**
 * login button clicked
 *
 * @param  {goog.events.BrowserEvent} e
 *
 * @private
 */
hash5.ui.LoginForm.prototype.handleLoginClick_ = function(e)
{
    // listen for validation complete
    this.getHandler().listenOnce(this.form_.validation, hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE, function(e) {
        if (e.result.isValid()) {
            var data = this.form_.getData();

            var userController = hash5.controller.UserController.getInstance();
            this.getHandler()
                .listenOnce(userController, hash5.controller.UserController.EventType.UNAUTHORIZED, this.handleWrongLogIn_);

            userController.login(data['username'], data['password']);
        }
    });

    // validate from
    this.form_.validate();
};

/**
 * handle valid login
 *
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.ui.LoginForm.prototype.handleLoggedIn_ = function(e)
{
    this.setVisible(false);
};

/**
 * handle invalid login
 *
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.ui.LoginForm.prototype.handleWrongLogIn_ = function(e)
{
    this.form_.errorProvider.displayError(this.form_.getControlByName('username').getElement(), 'Benutzername und Passwort stimmen nicht.');
};

/**
 * registration button clicked
 *
 * @param  {goog.events.BrowserEvent} e
 *
 * @private
 */
hash5.ui.LoginForm.prototype.handleRegBtnClick_ = function(e)
{
    if(!goog.dom.classes.has(this.getElement(), 'registration-view'))
    {
        goog.dom.classes.add(this.getElement(), 'registration-view');
        this.form_.validation = this.registerFormValidation_;
        this.form_.errorProvider.setVisible(false);
    }
    else
    {
      // listen for validation complete
      this.getHandler().listenOnce(this.form_.validation, hash5.validation.FormValidation.EventType.VALIDATION_COMPLETE, function(e) {
        if (e.result.isValid()) {
          var data = this.form_.getData();

          var userController = hash5.controller.UserController.getInstance();
          this.getHandler()
              .listenOnce(userController, hash5.controller.UserController.EventType.REGISTERED, this.handleRegistered_)
              .listenOnce(userController, hash5.controller.UserController.EventType.CONFLICT, this.handleRegisterConflict_);

          userController.register(data['username'], data['password']);
        }
      });

      // validate form
      this.form_.validate();

    }
};

/**
 * handle successful registration
 *
 * @param  {goog.events.BrowserEvent} e
 *
 * @private
 */
hash5.ui.LoginForm.prototype.handleRegistered_ = function(e)
{
    goog.dom.classes.remove(this.getElement(), 'registration-view');
    this.form_.validation = this.loginFormValidation_;
};

/**
 * handle registration error
 *
 * @param  {goog.events.BrowserEvent} e
 *
 * @private
 */
hash5.ui.LoginForm.prototype.handleRegisterConflict_ = function(e)
{
    this.form_.errorProvider.displayError(this.form_.getControlByName('username').getElement(), 'Benutzername ist schon vorhanden.');
};


/**
 * sets the visibility of the login form
 *
 * @param {boolean} isVisible
 */
hash5.ui.LoginForm.prototype.setVisible = function(isVisible)
{
    goog.dom.classes.enable(this.getElement(), 'hidden', !isVisible);
};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'login-form',
    function() {
      return new hash5.ui.LoginForm();
    }
);
