goog.provide('hash5.view.BaseView');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.view.BaseView = function()
{
    goog.base(this);

};
goog.inherits(hash5.view.BaseView, goog.ui.Component);

/** @inheritDoc */
hash5.view.BaseView.prototype.createDom = function()
{

};

/** @inheritDoc */
hash5.view.BaseView.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.view.BaseView.prototype.handleSaveBtnClicked_ = function(e)
{

};
