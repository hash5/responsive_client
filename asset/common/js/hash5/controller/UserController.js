goog.provide('hash5.controller.UserController');
goog.provide('hash5.controller.UserController.EventType');

goog.require('goog.net.XhrIo');

goog.require('hash5.controller.BaseController');
goog.require('hash5.controller.ErrorController');
goog.require('hash5.model.User');
goog.require('hash5.ui.OverlayLoginForm');
goog.require('hash5.ds.ConnectionManager');

// TODO use connectionmanager...

/**
 *
 * @constructor
 * @extends {hash5.controller.BaseController}
 */
hash5.controller.UserController = function()
{
    goog.base(this);

    /**
     * @type {hash5.model.User}
     * @private
     */
    this.currentUser_ = null;

    /**
     * @type {Object}
     * @private
     */
    this.userSettings_ = {};

    /**
     * true if the user was fresg registered
     * @type {boolean}
     * @private
     */
    this.registeredUser_ = false;
};
goog.inherits(hash5.controller.UserController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.UserController);

/**
 * initizialze UserController. if user-settings are set in config, this are used. Otherwise
 * settings are loaded from server. hash5.controller.UserController.EventType.LOGIN event is dispatched
 * if user is allready logged in
 *
 * @param  {Object} config
 * @param {Function=} callback called after userSettings are loaded. boolean param will signal if
 *                             user is logged in or not
 * @param {*=} handler handler context for callback
 */
hash5.controller.UserController.prototype.initialize = function(config, callback, handler)
{
    if(goog.isDef(config['user-settings'])) {
        this.setUserSettings(config['user-settings']);
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);

        callback.call(handler, true);
    } else {
        this.loadUserSettings(function(isLoggedIn) {
            if(isLoggedIn) {
                this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
            }

            callback.call(handler, isLoggedIn);
        }, this);
    }

    var connManager = hash5.ds.ConnectionManager.getInstance();
    goog.events.listen(connManager, hash5.ds.ConnectionManager.EventType.UNAUTHORIZED, this.handleUnauthorized_, false, this);
};

/**
 * stores the userSettings in the controller
 *
 * @param {Object} userSettings
 */
hash5.controller.UserController.prototype.setUserSettings = function(userSettings)
{
    this.userSettings_ = userSettings;
};

/**
 * stores the userSettings for the specified key
 *
 * @param {string} key
 * @param {*} userSetting
 */
hash5.controller.UserController.prototype.setUserSetting = function(key, userSetting)
{
    this.userSettings_[key] = userSetting;
};

/**
 * returns locale code for current user
 * if no locale is set in ussersettings, browser code is read and stored on server
 *
 * @return {string} user locale
 */
hash5.controller.UserController.prototype.getUserLocale = function()
{
    var locale = this.userSettings_['locale'];

    if(!locale) {
        locale = goog.LOCALE;
        this.userSettings_['locale'] = locale;
        this.saveUserSetting();
    }

    return locale;
};

/**
 * returns userSettings for specific key
 *
 * @param {string} key
 * @param {*=} defaultVal
 * @return {*}
 */
hash5.controller.UserController.prototype.getUserSettings = function(key, defaultVal)
{
    var value = this.userSettings_[key];

    if(goog.isDef(value)) {
        return value;
    }

    return defaultVal;
};

/**
 * returns the search tree
 * @return {!Array}
 */
hash5.controller.UserController.prototype.getSearchTree = function()
{
    return this.userSettings_['searchtree'] || [];
};


/**
 * saves searchtree at userSettings and sends them to the server
 *
 * @param {Array} tree
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.controller.UserController.prototype.saveSearchTree = function(tree, callback, handler)
{
    this.userSettings_['searchtree'] = tree;

    this.saveUserSetting(callback, handler);
};


/**
 * loads usersettings
 *
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.controller.UserController.prototype.loadUserSettings = function(callback, handler)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, goog.bind(this.handleUserSettingsLoaded_, this, callback, handler));
    var apiPrefix = hash5.App.getInstance().getApiPrefix();
    xhr.send(apiPrefix + '/usersettings');
};

/**
 * @param {Function} callback
 * @param {*} handler
 * @param  {goog.events.Event} e
 */
hash5.controller.UserController.prototype.handleUserSettingsLoaded_ = function(callback, handler, e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess()) {
        var userSettings = xhr.getResponseJson() || {};
        this.setUserSettings(userSettings);

        // set current user data
        if(!this.currentUser_) {
            var userName = userSettings['user'] && userSettings['user']['name'];
            this.currentUser_ = new hash5.model.User(userName);
        }
    } else if(xhr.getStatus() == goog.net.HttpStatus.UNAUTHORIZED) {
        this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
    } else {
        this.dispatchEvent({
            type: hash5.controller.ErrorController.EventType.ERROR,
            errType: hash5.controller.ErrorController.ErrorType.XHR_ERROR,
            xhr: xhr
        });
    }

    if(goog.isFunction(callback)) {
        callback.call(handler, xhr.isSuccess());
    }

};

/**
 * saves the userSettings to server
 *
 * @param {Function=} callback
 * @param {*=} handler
 */
hash5.controller.UserController.prototype.saveUserSetting = function(callback, handler)
{
    var xhr = new goog.net.XhrIo();

    if(callback) {
        xhr.listen(goog.net.EventType.COMPLETE, callback, false, handler);
    }
    var apiPrefix = hash5.App.getInstance().getApiPrefix();
    xhr.send(apiPrefix + '/usersettings', 'POST', 'settings=' + JSON.stringify(this.userSettings_));
};

/**
 * returns current logged in user
 *
 * @return {hash5.model.User}
 */
hash5.controller.UserController.prototype.getCurrentUser = function()
{
    return this.currentUser_;
};

/**
 * returns true if user is logged in
 *
 * @return {boolean}
 */
hash5.controller.UserController.prototype.isLoggedIn = function()
{
    return this.currentUser_ === null;
};

/**
 *  login for user
 *  hash5.controller.UserController.EventType will be dispatch as result
 *
 * @param  {string} username
 * @param  {string} password
 * @param  {boolean=} staySignedIn
 */
hash5.controller.UserController.prototype.login = function(username, password, staySignedIn)
{
    // ensure that only the same user can renew the session

    if(this.currentUser_ && this.currentUser_.getUserName() != username)
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
        return;
    }

    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e) {
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);

        if(xhr.isSuccess()) {
            this.currentUser_ = new hash5.model.User(username);

            // TODO problems after session-refreshing because then UserSettings may
            // be different!
            this.loadUserSettings(function() {
                this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
            }, this);
        } else if(xhr.getStatus() == goog.net.HttpStatus.UNAUTHORIZED) {
            this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
        } else {
            this.dispatchEvent({
                type: hash5.controller.ErrorController.EventType.ERROR,
                errType: hash5.controller.ErrorController.ErrorType.XHR_ERROR,
                xhr: xhr
            });
        }

    }, false, this);
    var apiPrefix = hash5.App.getInstance().getApiPrefix();
    // TODO set right staySignedIn param name
    var staySignedInStr = staySignedIn ? '1' : '0';
    xhr.send(apiPrefix + '/login', 'post', 'user=' + username + '&pass=' + password + '&login=' + staySignedInStr);
};

/**
 * loggs out user
 *  hash5.controller.UserController.EventType will be dispatch as result
 */
hash5.controller.UserController.prototype.logout = function()
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleLoggedOut_, false, this);
    var apiPrefix = hash5.App.getInstance().getApiPrefix();
    xhr.send(apiPrefix + '/logout');
};

/**
 * @param  {goog.events.Event} e
 * @private
 */
hash5.controller.UserController.prototype.handleLoggedOut_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess()) {
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGOUT);
        document.location.reload();
    } else {
        this.dispatchEvent({
            type: hash5.controller.ErrorController.EventType.ERROR,
            errType: hash5.controller.ErrorController.ErrorType.XHR_ERROR,
            xhr: xhr
        });
    }
};

/**
 * handles UNAUTHORIZED error from ConnectionManager
 *
 * @param  {goog.events.Event} e
 * @private
 */
hash5.controller.UserController.prototype.handleUnauthorized_ = function(e)
{
    var quickLogin = new hash5.ui.OverlayLoginForm();
    quickLogin.render(document.body);
};

/**
 * register user
 * events of type hash5.controller.UserController.EventType will be dispatch as result
 *
 * @param  {string} username
 * @param  {string} password
 * @param  {string} email
 */
hash5.controller.UserController.prototype.register = function(username, password, email)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleRegistered_, false, this);
    var apiPrefix = hash5.App.getInstance().getApiPrefix();

    var query = goog.Uri.QueryData.createFromMap({
        'user': username,
        'pass': password,
        'email': email
    }).toString()
    xhr.send(apiPrefix + '/register?' + query, 'GET');
};

/**
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.controller.UserController.prototype.handleRegistered_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess()) {
        this.registeredUser_ = true;
        this.dispatchEvent(hash5.controller.UserController.EventType.REGISTERED);
    } else if(xhr.getStatus() == goog.net.HttpStatus.CONFLICT) {
        this.dispatchEvent(hash5.controller.UserController.EventType.CONFLICT);
    } else {
        this.dispatchEvent({
            type: hash5.controller.ErrorController.EventType.ERROR,
            errType: hash5.controller.ErrorController.ErrorType.XHR_ERROR,
            xhr: xhr
        });
    }
};

/**
 * @return  {boolean}
 */
hash5.controller.UserController.prototype.hasRegistered = function()
{
    return this.registeredUser_;
};


/**
 * register user
 * events of type hash5.controller.UserController.EventType will be dispatch as result
 *
 * @param  {string} username
 * @param  {string} email
 * @param {function(boolean)} callback resultCallback, first param indicates success
 * @param {*=} handler
 */
hash5.controller.UserController.prototype.resetPassword = function(username, email, callback, handler)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var success = xhr.isSuccess();

        if(!success && xhr.getStatus() != goog.net.HttpStatus.BAD_REQUEST) {
            this.dispatchEvent({
                type: hash5.controller.ErrorController.EventType.ERROR,
                errType: hash5.controller.ErrorController.ErrorType.XHR_ERROR,
                xhr: xhr
            });
        }

        callback.call(handler, success);
    }, false, this);

    var apiPrefix = hash5.App.getInstance().getApiPrefix(),
        query = goog.Uri.QueryData.createFromMap({
            'user': username,
            'email': email
        }).toString()
    xhr.send(apiPrefix + '/resetpw?' + query, 'GET');
};

/**
 * @enum {string}
 */
hash5.controller.UserController.EventType = {
    LOGIN: goog.events.getUniqueId('login'),
    LOGOUT: goog.events.getUniqueId('logout'),
    UNAUTHORIZED: goog.events.getUniqueId('unauthorized'),
    REGISTERED: goog.events.getUniqueId('registered'),
    CONFLICT: goog.events.getUniqueId('conflict')
};
