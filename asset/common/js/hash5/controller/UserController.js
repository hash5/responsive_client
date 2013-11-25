goog.provide('hash5.controller.UserController');
goog.provide('hash5.controller.UserController.EventType');

goog.require('goog.net.XhrIo');

goog.require('hash5.controller.BaseController');

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
};
goog.inherits(hash5.controller.UserController, hash5.controller.BaseController);
goog.addSingletonGetter(hash5.controller.UserController);


hash5.controller.UserController.prototype.initialize = function(config)
{
    this.loadUserSettings(function(settings){
        console.log(settings);
    });

};

hash5.controller.UserController.prototype.loadUserSettings = function(callback)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, goog.bind(this.handleUserSettingsLoaded_, this, callback), false, this);
    xhr.send('/usersettings');
};

/**
 * @param  {goog.events.Event} e
 */
hash5.controller.UserController.prototype.handleUserSettingsLoaded_ = function(callback, e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
        // TODO set usersettings
        var userConfig = xhr.getResponseJson();

        if(callback)
        {
            callback(userConfig);
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
 *  login for user
 *  hash5.controller.UserController.EventType will be dispatch as result
 *
 * @param  {string} username
 * @param  {string} password
 */
hash5.controller.UserController.prototype.login = function(username, password)
{
    var xhr = new goog.net.XhrIo();
    xhr.listen(goog.net.EventType.COMPLETE, this.handleLogin_, false, this);
    xhr.send('/login', 'post', 'user=' + username + '&pass=' + password);
};


/**
 * @param  {goog.events.Event} e
 *
 * @private
 */
hash5.controller.UserController.prototype.handleLogin_ = function(e)
{
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);

    if(xhr.isSuccess())
    {
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

    // TODO set current user!

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
        this.dispatchEvent(hash5.controller.UserController.EventType.LOGIN);
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
