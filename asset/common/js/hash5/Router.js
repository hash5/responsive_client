goog.provide('hash5.Router');
goog.provide('hash5.Route');

goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.History');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.history.Html5History');

/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hash5.Router = function()
{
    goog.base(this);

   /**
    * @type {goog.events.EventHandler}
    * @private
    */
    this.eh_ = new goog.events.EventHandler(this);
    this.eh_.listen(goog.dom.getDocument(), goog.events.EventType.CLICK, this.handleClick_);

    /**
     * @type {goog.History|goog.history.Html5History}
     * @private
     */
    this.history_ = null;

    /**
     * flag used to prevent navigate event when manually replacing url
     *
     * @type {boolean}
     * @private
     */
    this.isReplacing_ = false;

    /**
     * registered routes
     *
     * @type {Array.<hash5.Route>}
     * @private
     */
    this.routes_ = [];

    /**
     * current url
     *
     * @type {string}
     * @private
     */
    this.url_ = '';
};
goog.inherits(hash5.Router, goog.events.EventTarget);
goog.addSingletonGetter(hash5.Router);

/**
* Initializes browser history manager
*/
hash5.Router.prototype.initialize = function(config)
{
    this.history_ = goog.history.Html5History.isSupported() ?
        new goog.history.Html5History() : new goog.History();

    // TODO enable if server supports url-rewriting
    /*
    if (this.history_.setUseFragment)
    {
        this.history_.setUseFragment(false);
    }
    else
    {
        var token = this.history_.getToken();
        this.navigate('');
        this.navigate(token);
    }
    */
    if(this.history_.setPathPrefix)
    {
      this.history_.setPathPrefix(config['path_prefix']);
    }
    this.history_.setEnabled(true);

    this.eh_.listen(this.history_, goog.history.EventType.NAVIGATE,
        this.handleHistory_);
};

/**
* Handles every click event on page and checks if url is linked
*
* @param {!goog.events.BrowserEvent} e The event.
* @private
*/
hash5.Router.prototype.handleClick_ = function(e)
{
    if (e.button != 0)
    {
        return;
    }

    // getting link element from event
    var link = e.target.href ?
        e.target :
        goog.dom.getAncestor(e.target, function(el) {
            if (el.href)
            {
                return true;
            }
            return false;
      });

    if (!link || !link.href)
    {
        return;
    }

    // Static/extern urls
    if (link.rel.toLowerCase() == 'redirect' || link.target.toLowerCase() == '_blank')
    {
        return;
    }

    e.preventDefault();

    var path = goog.uri.utils.getPath(link.href) || '';

    this.navigate(path);
};

/**
* Handles history
*
* @param {!goog.history.Event} e The event
* @private
*/
hash5.Router.prototype.handleHistory_ = function(e)
{
    if (this.isReplacing_)
    {
        return;
    }

    var token = e.token;

    // alow to navigate to the same url twice
    //if (token != this.url_)
    //{
        var route = goog.array.find(this.routes_, function(route) {
            return route.runIfMatches(token);
        }, this);

        if(route)
        {
            if(route.changeUrl)
            {
                this.dispatchEvent(hash5.Router.EventType.NAVIGATE);
                this.setUrl(token);
            }
            else
            {
                this.setUrl(this.url_, true);
            }
        }
    //}
};

/**
 * define route as string or regex. /:abc/ will pass "abc" through as an
 * argument. *abc/def will pass through all after the * as an argument
 *
 * @param {string|RegExp} regex to watch for.
 * @param {function(string, ...[string])} callback should take in the token and any captured strings.
 * @param {Object=} handler Object in whose context the function is to be
 *     called (the global scope if none).
 * @param {boolean=} changeUrl iff set to false, url in browser will not be changed
 */
hash5.Router.prototype.addRoute = function(regex, callback, handler, changeUrl) {

  if (goog.isString(regex))
  {
    regex = new RegExp('^' + goog.string.regExpEscape(regex)
            .replace(/\\:\w+/g, '(\\w+)')
            .replace(/\\\*/g, '(.*)')
            .replace(/\\\[/g, '(')
            .replace(/\\\]/g, ')?')
            .replace(/\\\{/g, '(?:')
            .replace(/\\\}/g, ')?') + '$');
  }

  var route = new hash5.Route(regex, callback, handler);

  if(goog.isDef(changeUrl))
  {
    route.changeUrl = changeUrl;
  }

  this.routes_.push(route);
};


/**
* Navigates to a url
*
* @param {string} path Page url
*/
hash5.Router.prototype.navigate = function(path)
{
    if (path.substr(0, 1) == '/')
    {
        path = path.substr(1);
    }

    if(path == this.history_.getToken())
    {
      this.replaceToken_('');
    }
    this.history_.setToken(path);
};

/**
 * replaces shown url without handling navigate event
 *
 * @param {string} token
 * @private
 */
hash5.Router.prototype.replaceToken_ = function(token)
{
    if (token.substr(0, 1) == '/')
    {
        token = token.substr(1);
    }

    this.isReplacing_ = true;
    this.history_.setToken(token);
    this.isReplacing_ = false;
};


/**
 * sets the current url-state.
 * if updateBrowser is set to true, browser url will be
 * replaced.
 *
 * @param {string} url
 * @param {boolean=} updateBrowser
 */
hash5.Router.prototype.setUrl = function(url, updateBrowser)
{
    this.url_ = url;

    if (updateBrowser)
    {
        this.replaceToken_(url);
    }
};

/**
 * @enum {string}
 */
hash5.Router.EventType = {
    NAVIGATE : 'navigate'
};


/**
 * @param {RegExp} pattern regex pattern to match route
 * @param {function(string, ...[string])} callback should take in the token and any captured strings.
 * @param {*=} handler opt callback context handler
 * @constructor
 */
hash5.Route = function(pattern, callback, handler)
{
    /**
     * @type {RegExp}
     */
    this.pattern = pattern;

    /**
     * @type {Function}
     */
    this.callback = callback;

    /**
     * context handler
     *
     * @type {*}
     */
    this.handler = handler;

    /**
     * @type {boolean}
     */
    this.changeUrl = true;
};

/**
 * calls callback function if route matches
 *
 * @param  {string}  token current naviagtion token to check for
 * @return {boolean} true if route matches
 */
hash5.Route.prototype.runIfMatches = function(token) {
  var args = this.pattern.exec(token);

  if (args) {
    this.callback.apply(this.handler, args);

    return true;
  }

  return false;
};