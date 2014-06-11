goog.provide('hash5.ui.search.SearchOptionsHelper');

goog.require('goog.ui.Component');

goog.require('hash5.templates.Searchfield');
goog.require('hash5.forms.Form');
goog.require('hash5.forms.Textbox');
goog.require('hash5.ui.search.DefaultSearchOptionsHelper');
goog.require('hash5.ui.search.EventType');
goog.require('hash5.ui.search.FilterChangeEvent');
goog.require('hash5.ds.SearchOptions');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.search.SearchOptionsHelper = function()
{
    goog.base(this);

    /**
     * @type {hash5.forms.Form}
     * @private
     */
    this.form_ = new hash5.forms.Form();

    /**
     * @type {boolean}
     * @private
     */
    this.visiblity_ = false;

};
goog.inherits(hash5.ui.search.SearchOptionsHelper, goog.ui.Component);
goog.addSingletonGetter(hash5.ui.search.SearchOptionsHelper);

/** @inheritDoc */
hash5.ui.search.SearchOptionsHelper.prototype.createDom = function()
{
    var el = goog.soy.renderAsFragment(hash5.templates.Searchfield.searchOptionsHelper);
    this.decorateInternal(/** @type {Element} */ (el));
};


/** @inheritDoc */
hash5.ui.search.SearchOptionsHelper.prototype.getContentElement = function()
{
    return this.getElementByClass('form-wrapper');
};

/** @inheritDoc */
hash5.ui.search.SearchOptionsHelper.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    this.addChild(this.form_, true);

    var defaultOptionsHelpers = new hash5.ui.search.DefaultSearchOptionsHelper();
    defaultOptionsHelpers.init();
};

/**
 * returns current form values
 * @return {Object}
 */
hash5.ui.search.SearchOptionsHelper.prototype.getValues = function()
{
    return this.form_.getData()
};


/**
 * changes values for given controls
 * @param {Object} values2Change
 */
hash5.ui.search.SearchOptionsHelper.prototype.setValues = function(values2Change)
{
    this.form_.reset();

    for(var itemKey in values2Change) {
        var control = this.form_.getControlByName(itemKey);
        control.setValue(values2Change[itemKey]);
    }
};

/**
 * sets visiblity for this control. If visible is not defined, control will be toggled.
 * @param {boolean=} visible
 */
hash5.ui.search.SearchOptionsHelper.prototype.setVisibility = function(visible)
{
    if(goog.isDef(visible)) {
        goog.dom.classes.enable(this.getElement(), 'visible', visible);
    } else {
        goog.dom.classes.toggle(this.getElement(), 'visible');
    }

    this.visiblity_ = goog.dom.classes.has(this.getElement(), 'visible');
};


/**
 * adds new form item to search option filters
 *
 * @param {string} label
 * @param {string} className
 * @param {Object=} controlConfig
 * @return {hash5.forms.IControl} generated control
 */
hash5.ui.search.SearchOptionsHelper.prototype.addFormItem = function(label, className, controlConfig)
{
    return /** @type {hash5.forms.IControl} */ (this.form_.addFormItem(label, className, controlConfig).getControl());
};