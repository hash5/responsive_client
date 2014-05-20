goog.provide('hash5.Pages');

goog.require('hash5.modules.pages.PasswordRecovery');

/**
 * @fileoverview Pages Module provides Pages for PasswortRecovery.
 * Core-JS is not loaded! This Module is sepaerated.
 */

/**
 * @param  {Object} config
 */
hash5.pageBootstrap = function(config){

    // print js errors in popup if ?debug is in url
    if(/debug/gi.test(document.location.search)) {
        window.onerror = function(message, url, lineNumber) {
          alert(message);
          alert(url + lineNumber);
          return true;
        };
    }

    switch(config['page']){
        case 'resetpw':
            var page = new hash5.modules.pages.PasswordRecovery();
            page.render(goog.dom.getElement('page'));
            break;
    }
};

goog.exportSymbol('hash5.pageBootstrap', hash5.pageBootstrap);
