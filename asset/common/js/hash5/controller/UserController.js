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


hash5.controller.UserController.prototype.initialize = function(config)
{
    if(goog.isDef(config['user-settings']))
    {
        this.setUserSettings(config['user-settings']);
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
    }
    else
    {
        this.loadUserSettings();
    }

};

/**
 * stores the userSettings in the controller
 *
 * @param {*} userSettings
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
 * returns userSettings for specific key
 *
 * @param {string} key
 */
hash5.controller.UserController.prototype.getUserSettings = function(key)
{
    return this.userSettings_[key];
};

hash5.controller.UserController.prototype.loadUserSettings = function()
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleUserSettingsLoaded_, false, this);
    xhr.send('/usersettings');
};

/**
 * @param  {goog.events.Event} e
 */
hash5.controller.UserController.prototype.handleUserSettingsLoaded_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN); // TODO eventDispatch?

        var userSettings = xhr.getResponseJson();
        this.setUserSettings(userSettings);
    }
    else if(xhr.getStatus() == goog.net.HttpStatus.UNAUTHORIZED)
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
    }
    else
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.ERROR);
    }

};

/**
 * saves the userSettings at server
 *
 */
hash5.controller.UserController.prototype.saveUserSetting = function()
{
    var xhr = new goog.net.XhrIo();
    xhr.send('/usersettings', 'POST', 'settings=' + JSON.stringify(this.userSettings_));
};

/**
 * returns current logged in user
 *
 * @return {hash5.model.User}
 */
hash5.controller.UserController.prototype.getCurrentUser = function()
{

            console.log(this);
    return this.currentUser_;
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
            this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
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
 *
 * @private
 */
hash5.controller.UserController.prototype.handleLoggedOut_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.UNAUTHORIZED);
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
