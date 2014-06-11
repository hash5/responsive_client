goog.provide('hash5.view.Settings');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Select');
goog.require('hash5.ui.Overlay');

goog.require('hash5.templates.Settings');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.view.Settings = function()
{
    goog.base(this);


    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();
};
goog.inherits(hash5.view.Settings, goog.ui.Component);

/** @inheritDoc */
hash5.view.Settings.prototype.createDom = function()
{
    var userController = hash5.controller.UserController.getInstance();

    var data = {
        serverVersion: userController.getUserSettings('serverVersion')
    };

    var el = goog.soy.renderAsFragment(hash5.templates.Settings.wrapper, data);
    this.decorateInternal(/** @type {Element} */ (el));

    this.addChild(this.form_);
    this.form_.render(this.getElementByClass('form-wrapper'));
};

/** @inheritDoc */
hash5.view.Settings.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(true, hash5.ui.Overlay.Level.FOREGROUND);
    this.getHandler().listen(overlay, goog.ui.Component.EventType.CLOSE, this.close);

    var saveBtn = this.getElementByClass('btn-save');
    var closeBtn = this.getElementByClass('btn-cancel');
    this.getHandler()
        .listen(saveBtn, goog.events.EventType.CLICK, this.handleSaveClick_)
        .listen(closeBtn, goog.events.EventType.CLICK, this.close);

    this.createForm_();
};

/**
 * creates from for settings
 *
 * @private
 */
hash5.view.Settings.prototype.createForm_ = function()
{
    /** @desc username */
    var MSG_LANGUAGE = goog.getMsg('Language');
    var formItem = this.form_.addFormItem(MSG_LANGUAGE, 'select', {
        fieldName: 'language',
        options: [
            {text: 'Deutsch', model: 'de'},
            {text: 'English', model: 'en'}
        ]
    });
    var userController = hash5.controller.UserController.getInstance();
    var curLang = userController.getUserSettings('locale', 'en');
    formItem.getControl().setValue(curLang);
};


/**
 * handle save btn click
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.view.Settings.prototype.handleSaveClick_ = function(e)
{
    var data = this.form_.getData();

    var userController = hash5.controller.UserController.getInstance();
    var oldLang = userController.getUserSettings('locale', 'en');
    var newLang = data['language'];
    if(oldLang != newLang)
    {
        userController.setUserSetting('locale', newLang);
        userController.saveUserSetting(function(){
            // TODO check for unsaved stuff...
            document.location.reload();
        });
    }


    this.close();
};


/**
 * closes and disposes the layer
 */
hash5.view.Settings.prototype.close = function()
{
    hash5.ui.Overlay.getInstance().setVisible(false);
    this.dispose();
};