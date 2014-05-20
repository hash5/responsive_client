goog.provide('hash5.ui.MessageBox');
goog.provide('hash5.ui.MessageBox.Type');

goog.require('goog.ui.Component');

goog.require('hash5.templates.ui.MessageBox');
goog.require('hash5.ui.Overlay');


/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.MessageBox = function()
{
    goog.base(this);

};
goog.inherits(hash5.ui.MessageBox, goog.ui.Component);

/** @inheritDoc */
hash5.ui.MessageBox.prototype.createDom = function()
{
  var el = soy.renderAsFragment(hash5.templates.ui.MessageBox.box);
  this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.MessageBox.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(true, hash5.ui.Overlay.Level.FOREGROUND);
    this.getHandler().listen(overlay, goog.ui.Component.EventType.CLOSE, this.close);

    var closeBtn = this.getElementByClass('btn-close'),
        okBtn = this.getElementByClass('btn-ok');
    this.getHandler()
        .listen(closeBtn, goog.events.EventType.CLICK, this.close)
        .listen(okBtn, goog.events.EventType.CLICK, this.close);
};

/**
 * sets message text and title
 * @param  {string} title
 * @param  {string} msgText
 */
hash5.ui.MessageBox.prototype.setMessageText = function(title, msgText)
{
    this.getElementByClass('message-title').innerHTML = title;
    this.getElementByClass('message-text').innerHTML = msgText;
};

/**
 * sets message type
 * @param  {hash5.ui.MessageBox.Type} type
 */
hash5.ui.MessageBox.prototype.setType = function(type)
{
    goog.dom.classes.add(this.getElement(), type);
};

/**
 * closes and disposes the message
 */
hash5.ui.MessageBox.prototype.close = function()
{
    this.dispatchEvent(goog.ui.Component.EventType.CLOSE);
    hash5.ui.Overlay.getInstance().setVisible(false);
    this.dispose();
};


/**
 * shows simple info message
 * @param  {string} title
 * @param  {string} msgText
 * @return {hash5.ui.MessageBox}
 */
hash5.ui.MessageBox.info = function(title, msgText)
{
    var msg = new hash5.ui.MessageBox();
    msg.render(document.body);
    msg.setMessageText(title, msgText);
    msg.setType(hash5.ui.MessageBox.Type.INFO);

    return msg;
};

/**
 * shows simple warn message
 * @param  {string} title
 * @param  {string} msgText
 * @return {hash5.ui.MessageBox}
 */
hash5.ui.MessageBox.warn = function(title, msgText)
{
    var msg = new hash5.ui.MessageBox();
    msg.render(document.body);
    msg.setMessageText(title, msgText);
    msg.setType(hash5.ui.MessageBox.Type.WARN);

    return msg;
};

/**
 * message types
 * @enum {string}
 */
hash5.ui.MessageBox.Type = {
    WARN: 'warn',
    INFO: 'info'
};