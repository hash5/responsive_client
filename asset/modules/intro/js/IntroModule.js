goog.provide('hash5.module.IntroModule');


goog.require('hash5.module.intro.initData');
goog.require('hash5.controller.UserController');
goog.require('hash5.model.Entry');
goog.require('hash5.module.intro.IntroLayer');
goog.require('hash5.ui.PageSidebar');
goog.require('hash5.api');

/**
 *
 * @constructor
 * @extends {hash5.module.BaseModule}
 */
hash5.module.IntroModule = function()
{
    goog.base(this);
};
goog.inherits(hash5.module.IntroModule, hash5.module.BaseModule);


/**
 * @param {hash5.App} context The module context.
 */
hash5.module.IntroModule.prototype.initialize = function(context)
{
};

/**
 * sets up some example data
 */
hash5.module.IntroModule.prototype.showIntroTour = function()
{
    var introLayer = new hash5.module.intro.IntroLayer();
    introLayer.render(document.body);
};

/**
 * sets up some example data
 */
hash5.module.IntroModule.prototype.prepareUserAccount = function()
{
    var userController = hash5.controller.UserController.getInstance();

    var dataReadyCallback = function() {
        userController.setUserSetting('respWebclientInit', true);
        userController.saveUserSetting();

        // show some lists
        var initData = hash5.module.intro.initData;
        for(var i = 0; i < initData['open-lists'].length; i++) {
            var query = initData['open-lists'][i];
            var entries = hash5.api.searchEntries(query);
            hash5.api.showEntryCollection(entries, query);
        }
    };


    if(userController.hasRegistered()) {
        this.createExmpData_(userController, dataReadyCallback, this);
    } else {
        dataReadyCallback();
    }

    this.showIntroTour();
};

/**
 * creates example entries and searchtree entries
 * @param  {hash5.controller.UserController} userController
 * @param {Function} callback finsihed callback
 * @param {*} handler scope for callback
 */
hash5.module.IntroModule.prototype.createExmpData_ = function(userController, callback, handler)
{
    var initData = hash5.module.intro.initData;

    // init searchtree
    userController.setUserSetting('searchtree', initData['searchtree']);
    hash5.ui.PageSidebar.getInstance().getSearchTree().reloadSearchTree();


    // create example entries
    var exmpEntries = initData['entries'],
        unsavedEntries = exmpEntries.length;

    var savedCallback = function() {
        unsavedEntries--;

        if(unsavedEntries <= 0) {
            callback.call(handler);
        }
    };

    goog.array.forEach(exmpEntries, function(text){
        var entry = new hash5.model.Entry();
        entry.setText(text);
        entry.save(savedCallback);
    });
};

hash5.module.setLoaded(hash5.module.Modules.INTRO, hash5.module.IntroModule);