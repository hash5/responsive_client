goog.provide('hash5.controller.UserController');
goog.provide('hash5.controller.UserController.EventType');

goog.require('goog.net.XhrIo');

goog.require('hash5.controller.BaseController');
goog.require('hash5.model.User');

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
    if(goog.isDef(config['user-settings']))
    {
        this.setUserSettings(config['user-settings']);
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);

        callback.call(handler, true);
    }
    else
    {
        this.loadUserSettings(function(isLoggedIn){
            if(isLoggedIn)
            {
                this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
            }

            callback.call(handler, isLoggedIn);
        }, this);
    }
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

    if(!locale)
    {
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
 * @param {string=} defaultVal
 */
hash5.controller.UserController.prototype.getUserSettings = function(key, defaultVal)
{
    var value = this.userSettings_[key];

    if(goog.isDef(value))
    {
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
    xhr.send('/usersettings');
};

/**
 * @param {Function} callback
 * @param {*} handler
 * @param  {goog.events.Event} e
 */
hash5.controller.UserController.prototype.handleUserSettingsLoaded_ = function(callback, handler, e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
        var userSettings = xhr.getResponseJson() || {};
        this.setUserSettings(userSettings);

        // TODO set real user data!
        if(!this.currentUser_)
        {
            this.currentUser_ = new hash5.model.User("");
        }
    }
    else if(xhr.getStatus() == goog.net.HttpStatus.UNAUTHORIZED)
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
    }
    else
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.ERROR);
    }

    if(goog.isFunction(callback))
    {
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

    if(callback)
    {
        xhr.listen(goog.net.EventType.COMPLETE, callback, false, handler);
    }

    xhr.send('/usersettings', 'POST', 'settings=' + JSON.stringify(this.userSettings_));
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
 */
hash5.controller.UserController.prototype.login = function(username, password)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, function(e){
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);

        if(xhr.isSuccess())
        {
            this.currentUser_ = new hash5.model.User(username);

            this.loadUserSettings(function(){
                this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
            }, this);
        }
        else if(xhr.getStatus() == goog.net.HttpStatus.UNAUTHORIZED)
        {
            this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
        }
        else
        {
            this.dispatchEvent(hash5.controller.UserController.EventType.ERROR);
        }

    }, false, this);
    xhr.send('/login', 'post', 'user=' + username + '&pass=' + password);
};

/**
 * loggs out user
 *  hash5.controller.UserController.EventType will be dispatch as result
 */
hash5.controller.UserController.prototype.logout = function()
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleLoggedOut_, false, this);
    xhr.send('/logout');
};

/**
 * @param  {goog.events.Event} e
 * @private
 */
hash5.controller.UserController.prototype.handleLoggedOut_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
        document.location.reload();
    }
    else
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.ERROR);
    }
};

/**
 * register user
 * hash5.controller.UserController.EventType will be dispatch as result
 *
 * @param  {string} username
 * @param  {string} password
 */
hash5.controller.UserController.prototype.register = function(username, password)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleRegistered_, false, this);
    xhr.send('/register?user=' + username + '&pass=' + password, 'get');
};

/**
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.controller.UserController.prototype.handleRegistered_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.REGISTERED);
    }
    else if(xhr.getStatus() == goog.net.HttpStatus.CONFLICT)
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.CONFLICT);
    }
    else
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.ERROR);
    }
};


/**
 * @enum {string}
 */
hash5.controller.UserController.EventType = {
    LOGIN: goog.events.getUniqueId('login'),
    LOGOUT: goog.events.getUniqueId('logout'),
    UNAUTHORIZED: goog.events.getUniqueId('unauthorized'),
    REGISTERED: goog.events.getUniqueId('registered'),
    CONFLICT: goog.events.getUniqueId('conflict'),
    ERROR: goog.events.getUniqueId('error')
};
