goog.provide('hash5.ui.OverlayLoginForm');

goog.require('hash5.ui.LoginForm');
goog.require('hash5.ui.Overlay');

/**
 * OverlayLoginForm
 * Same as LoginForm but also shows Overlay when entering document
 * and registration will be disabled
 *
 * @constructor
 * @extends {hash5.ui.LoginForm}
 */
hash5.ui.OverlayLoginForm = function()
{
    goog.base(this);
};
goog.inherits(hash5.ui.OverlayLoginForm, hash5.ui.LoginForm);


/** @inheritDoc */
hash5.ui.OverlayLoginForm.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(true, hash5.ui.Overlay.Level.FOREGROUND, false);

    var registerPart = this.getElementByClass('register-wrapper');
    goog.dom.classes.add(registerPart, 'hidden');
};

/** @inheritDoc */
hash5.ui.OverlayLoginForm.prototype.handleLoggedIn_ = function(e)
{
    goog.base(this, 'handleLoggedIn_', e);

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(false);
};