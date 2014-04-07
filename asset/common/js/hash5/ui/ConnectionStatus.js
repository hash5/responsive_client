goog.provide('hash5.ui.ConnectionStatus');

goog.require('goog.ui.Component');

/**
 * shows current connection state (offline, online)
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.ConnectionStatus = function()
{
    goog.base(this);


};
goog.inherits(hash5.ui.ConnectionStatus, goog.ui.Component);

/** @inheritDoc */
hash5.ui.ConnectionStatus.prototype.createDom = function()
{
    var domHelper = this.getDomHelper();
    /** @desc {offline info text} */
    var MSG_OFFLINE_INFO = goog.getMsg('Lost connection to server. Requests are now cached.');
    var el = domHelper.createDom('div', {'class': 'conn-status online left-tooltip', 'data-tooltip': MSG_OFFLINE_INFO});

    this.decorateInternal(el);
};

/** @inheritDoc */
hash5.ui.ConnectionStatus.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var connManager = hash5.ds.ConnectionManager.getInstance();

    this.getHandler()
        .listen(connManager,
                [hash5.ds.ConnectionManager.EventType.OFFLINE, hash5.ds.ConnectionManager.EventType.ONLINE],
                this.handleConnChange_);
};

/**
 * Handles click events
 *
 * @param {goog.events.Event} e
 * @private
 */
hash5.ui.ConnectionStatus.prototype.handleConnChange_ = function(e)
{
    var connManager = hash5.ds.ConnectionManager.getInstance();

    goog.dom.classes.enable(this.getElement(), 'online', connManager.isOnline());
};
