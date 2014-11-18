goog.provide('hash5.testing.AsyncTestCase');

goog.require('goog.testing.AsyncTestCase');
goog.require('hash5.controller.UserController');
goog.require('goog.events.EventHandler');


/**
 * @fileoverview Utility class and functions to create async test cases
 * @see  hash5.testing.AsyncTestCase.createAndInstallWithAuthUser
 */

// enable testmode
hash5.isTestMode = true;

/**
 * A test case that is capable of running tests the contain asynchronous logic.
 * @param {string=} opt_name A descriptive name for the test case.
 * @extends {goog.testing.AsyncTestCase}
 * @constructor
 */
hash5.testing.AsyncTestCase = function(opt_name) {
  goog.base(this, opt_name);

  /**
   * @type {boolean}
   */
  this.hasLogin_ = false;

  this.eventHandler_ = null;
};
goog.inherits(hash5.testing.AsyncTestCase, goog.testing.AsyncTestCase);

/**
 * will be called by closure test runner. Makes sure that user is logged in.
 * @override
 */
hash5.testing.AsyncTestCase.prototype.runTests = function()
{
    if(!this.hasLogin_) {
        this.login_();
    } else {
        if(this.eventHandler_) {
            this.eventHandler_.dispose();
        }

        goog.base(this, 'runTests');
    }
};

/**
 * creates new test user and starts login
 */
hash5.testing.AsyncTestCase.prototype.login_ = function()
{
    var userController = hash5.controller.UserController.getInstance();
    this.eventHandler_ = new goog.events.EventHandler(this);

    // check if user is already logged in
    userController.loadUserSettings(goog.bind(function(isLoggedIn) {
        if(isLoggedIn) {
            this.handleLoggedIn_();
        } else {
            // register new testuser and login

            var testUserName = 'testUser' + Date.now();
            var testUserMail = 'testUser' + Date.now() + '@testProv.de';
            var testPassword = 'testPass';

            this.eventHandler_.listen(userController, hash5.controller.UserController.EventType.LOGIN, this.handleLoggedIn_);
            this.eventHandler_.listen(userController, hash5.controller.UserController.EventType.REGISTERED, function(){
                userController.login(testUserName, testPassword);
            });

            userController.register(testUserName, testPassword, testUserMail);
        }
    }, this));

};

hash5.testing.AsyncTestCase.prototype.handleLoggedIn_ = function()
{
    console.log("testUser login was successfull");
    this.hasLogin_ = true;
    this.runTests();
};



/**
 * Preferred way of creating an AsyncTestCase. Creates one and initializes it
 * with the G_testRunner.
 * @param {string=} opt_name A descriptive name for the test case.
 * @return {!goog.testing.AsyncTestCase} The created AsyncTestCase.
 */
hash5.testing.AsyncTestCase.createAndInstall = function(opt_name)
{
    var asyncTestCase = new goog.testing.AsyncTestCase(opt_name);
    goog.testing.TestCase.initializeTestRunner(asyncTestCase);
    return asyncTestCase;
};

/**
 * Preferred way of creating an AsyncTestCase with valid and authentificated user.
 * Creates one and initializes it with the G_testRunner.
 * @param {string=} opt_name A descriptive name for the test case.
 * @return {!goog.testing.AsyncTestCase} The created AsyncTestCase.
 */
hash5.testing.AsyncTestCase.createAndInstallWithAuthUser = function(opt_name)
{
    var asyncTestCase = new hash5.testing.AsyncTestCase(opt_name);
    goog.testing.TestCase.initializeTestRunner(asyncTestCase);
    return asyncTestCase;
};