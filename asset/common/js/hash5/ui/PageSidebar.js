goog.provide('hash5.ui.PageSidebar');

goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('hash5.ui.Overlay');


/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.PageSidebar = function()
{
    goog.base(this);

    /**
     * @type {boolean}
     * @private
     */
    this.isVisible_ = false;
};
goog.inherits(hash5.ui.PageSidebar, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.PageSidebar);


/** @inheritDoc */
hash5.ui.PageSidebar.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);


};

/** @inheritDoc */
hash5.ui.PageSidebar.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');


    // TODO nav link click handlers
};

/**
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.PageSidebar.prototype.handleNavLinkClicked_ = function(e)
{
    this.toggle();
};

hash5.ui.PageSidebar.prototype.toggle = function()
{
    this.isVisible_ = !this.isVisible_;

    var overlay = hash5.ui.Overlay.getInstance();
    overlay.setVisible(this.isVisible_);

    if(this.isVisible_)
    {
        this.getHandler()
            //.listenOnce(this.getElement(), goog.events.EventType.CLICK, this.toggle)
            .listenOnce(overlay, goog.ui.Component.EventType.CLOSE, this.toggle);
    }else{
        this.getHandler()
            //.unlisten(this.getElement(), goog.events.EventType.CLICK, this.toggle)
            .unlisten(overlay, goog.ui.Component.EventType.CLOSE, this.toggle);
    }

    goog.dom.classes.enable(this.getElement(), 'visible', this.isVisible_);
};


/**
 * Register this control so it can be created from markup.
 */
goog.ui.registry.setDecoratorByClassName(
    'page-sidebar',
    function() {
      return hash5.ui.PageSidebar.getInstance();
    }
);
