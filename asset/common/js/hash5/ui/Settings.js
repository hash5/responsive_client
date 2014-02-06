goog.provide('hash5.ui.Settings');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Form');
goog.require('hash5.forms.Select');

goog.require('hash5.templates.ui.Settings');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.Settings = function()
{
    goog.base(this);


    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();
};
goog.inherits(hash5.ui.Settings, goog.ui.Component);

/** @inheritDoc */
hash5.ui.Settings.prototype.createDom = function()
{
  var el = soy.renderAsFragment(hash5.templates.ui.Settings.wrapper);
  this.decorateInternal(el);

  this.addChild(this.form_);
  this.form_.render(this.getElementByClass('form-wrapper'));
};

/** @inheritDoc */
hash5.ui.Settings.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(true);
    this.getHandler().listen(overlay, goog.ui.Component.EventType.CLOSE, this.close);

    var saveBtn = this.getElementByClass('btn-save');
    var closeBtn = this.getElementByClass('btn-save');
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
hash5.ui.Settings.prototype.createForm_ = function()
{


    /** @desc username */
    var MSG_LANGUAGE = goog.getMsg('Sprache');
    var formItem = this.form_.addFormItem(MSG_LANGUAGE, 'select', {
        fieldName: 'language',
        options: [
            {text: 'Deutsch', model: 'de'},
            {text: 'English', model: 'en'}
        ]
    });
    var curLang = hash5.controller.UserController.getInstance().getUserSettings('locale', 'en');
    formItem.getControl().setValue(curLang);

};


/**
 * handle save btn click
 *
 * @param  {goog.events.BrowserEvent} e
 * @private
 */
hash5.ui.Settings.prototype.handleSaveClick_ = function(e)
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
hash5.ui.Settings.prototype.close = function()
{
    this.dispose();
};