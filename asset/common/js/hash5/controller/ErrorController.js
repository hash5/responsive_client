goog.provide('hash5.controller.ErrorController');
goog.provide('hash5.controller.ErrorEvent');

goog.require('hash5.controller.BaseController');
goog.require('hash5.ui.MessageBox');

/**
 * this controller tracks error and logs them
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.ErrorController = function()
{
    goog.base(this);
};
goog.inherits(hash5.controller.ErrorController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.ErrorController);

/**
 * @param  {Object} config
 */
hash5.controller.ErrorController.prototype.initialize = function(config)
{
    var userController = hash5.controller.UserController.getInstance();
    this.getHandler().listen(userController, hash5.controller.ErrorController.EventType.ERROR, this.handleError_);

    // overwrite error handler set in App.js
    if(/debug/gi.test(document.location.search)) {
        window.onerror = function(message, url, lineNumber) {
            var strMessage = message + '<br />' + url + lineNumber;
            hash5.ui.MessageBox.warn('js error', strMessage);
            return true;
        };
    }
};


/**
 * handles error and shows MessageBox
 *
 * @param  {hash5.controller.ErrorController.ErrorEvent} e
 */
hash5.controller.ErrorController.prototype.handleError_ = function(e)
{
    /** @desc error message box title */
    var MSG_ERROR_MESSAGE_TITLE = goog.getMsg('Error');
    /** @desc error message box title */
    var MSG_DEFAULT_ERROR_MESSAGE = goog.getMsg('An uncaught exception was raised.');

    var message = MSG_DEFAULT_ERROR_MESSAGE + '<br />';

    var errTypes = hash5.controller.ErrorController.ErrorType;
    switch(e.errType) {
        case errTypes.NO_CONNECTION:
            message = 'No connection to server!';
            break;
        case errTypes.XHR_ERROR:
            message = 'Error on connection server: <br />';
            if(e.xhr) {
                message += goog.net.ErrorCode.getDebugMessage(e.xhr.getLastErrorCode());
            }
            break;
    }

    if(e.errMsg) {
        message = e.errMsg;
    }

    hash5.ui.MessageBox.warn(MSG_ERROR_MESSAGE_TITLE, message);
};


/**
 * @enum {string}
 */
hash5.controller.ErrorController.EventType = {
    ERROR: goog.events.getUniqueId('error')
};

/**
 * @enum {string}
 */
hash5.controller.ErrorController.ErrorType = {
    NO_CONNECTION: 'no_connection',
    XHR_ERROR: 'xhr_error'
};



/**
 * Event to trigger error
 *
 * @param {string} type Event Type.
 * @param {goog.events.EventTarget} opt_target Reference to the object that is the target of
 *     this event. It has to implement the {@code EventTarget} interface
 *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
 * @constructor
 * @extends {goog.events.Event}
 */
hash5.controller.ErrorController.ErrorEvent = function(type, opt_target)
{
    goog.base(this, type, opt_target);

    /**
     * error message
     * @type {string}
     */
    this.errMsg = '';

    /**
     * error type
     * @type {hash5.controller.ErrorController.ErrorType|undefined}
     */
    this.errType = undefined;

    /**
     * xhr for errors on ajax request
     * @type {goog.net.XhrIo|undefined}
     */
    this.xhr = null;
};
goog.inherits(hash5.controller.ErrorController.ErrorEvent, goog.events.Event);