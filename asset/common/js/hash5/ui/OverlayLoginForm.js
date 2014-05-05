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

    goog.dom.classes.add(this.getElementByClass('register-wrapper'), 'hidden');
    goog.dom.classes.add(this.getElementByClass('passw-rec-link'), 'hidden');
    var stayLoggedInEl = this.form_.getFormItemByName('stay-signed-in').getElement()
    goog.dom.classes.add(stayLoggedInEl, 'hidden');
};

/** @inheritDoc */
hash5.ui.OverlayLoginForm.prototype.handleLoggedIn_ = function(e)
{
    goog.base(this, 'handleLoggedIn_', e);

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(false);
};