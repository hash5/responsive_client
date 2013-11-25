goog.provide('hash5.controller.MainPanelController');

goog.require('hash5.controller.BaseController');
goog.require('hash5.controller.UserController');

goog.require('hash5.ds.DataSource');
goog.require('hash5.model.Entry');

/**
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.MainPanelController = function()
{
    goog.base(this);

}
goog.inherits(hash5.controller.MainPanelController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.MainPanelController);

/**
 * @param  {Object} config
 */
hash5.controller.MainPanelController.prototype.initialize = function(config)
{
    this.getHandler().listen(hash5.controller.UserController.getInstance(), hash5.controller.UserController.EventType.LOGIN, this.handleLogin_);
}



/**
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.controller.MainPanelController.prototype.handleLogin_ = function(e)
{
    var entry = new hash5.model.Entry();
    entry.setText('test eintrag');

    var ds = new hash5.ds.DataSource();
    //ds.save(entry);
    ds.all(function(){

    });
}
