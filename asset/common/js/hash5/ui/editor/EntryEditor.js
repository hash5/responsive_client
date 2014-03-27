goog.provide('hash5.ui.editor.EntryEditor');
goog.provide('hash5.ui.editor.EntryEditor.EventType');

goog.require('goog.ui.Component');

goog.require('hash5.forms.Textarea');
goog.require('hash5.templates.ui.EntryEditor');

// TODO check if entry is already loaded!

/**
 * @param {hash5.model.Entry} entry
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
hash5.ui.editor.EntryEditor = function(entry)
{
    goog.base(this);

    /**
     * @type {hash5.model.Entry}
     * @private
     */
    this.entry_ = entry;

    /**
     * @type {hash5.forms.Textarea}
     * @private
     */
    this.textEditor_ = new hash5.forms.Textarea('');
    this.addChild(this.textEditor_);


    /**
     * @type {hash5.parsing.Parser}
     * @private
     */
    this.parser_ = entry.getParser();
    this.parser_.setRawText(entry.getText()); // force recompilation


    /**
     * @type {Array.<hash5.ui.editor.EditorComponent>}
     * @private
     */
    this.components_ = [];
};
goog.inherits(hash5.ui.editor.EntryEditor, goog.ui.Component);

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.createDom = function()
{
    var relDate = goog.date.relative.getDateString(this.entry_.getCreatedDate());
    var data = {
        date: relDate
    };

    var el = goog.soy.renderAsFragment(hash5.templates.ui.EntryEditor.wrapper, data);
    this.decorateInternal(/** @type {Element} */ (el));
};

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.decorateInternal = function(el)
{
    goog.base(this, 'decorateInternal', el);

    this.textEditor_.render(this.getElementByClass('entry-editor-body'));
    this.textEditor_.setValue(this.entry_.getText());
};

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.enterDocument = function()
{
    goog.base(this, 'enterDocument');

    var eh = this.getHandler();

    var saveBtn = this.getElementByClass('save-btn');
    eh.listen(saveBtn, goog.events.EventType.CLICK, this.handleSaveBtnClicked_);

    var cancleBtn = this.getElementByClass('cancle-btn');
    eh.listen(cancleBtn, goog.events.EventType.CLICK, this.close);

    eh.listen(this.textEditor_, goog.events.EventType.CHANGE, this.handleTextChanged_);

    goog.array.forEach(this.components_, function(comp){
        this.initComponent_(comp);
    }, this);

    // focus on text input
    this.textEditor_.getElement().focus();
};


/**
 * registers a new EditorComponent
 * this makes it possible to modules to extend the editor
 *
 * @param {hash5.ui.editor.EditorComponent} comp
 */
hash5.ui.editor.EntryEditor.prototype.addComponent = function(comp)
{
    this.components_.push(comp);

    if(this.isInDocument())
    {
        this.initComponent_(comp);
    }
};

/**
 * initializes component
 *
 * @param {hash5.ui.editor.EditorComponent} comp
 */
hash5.ui.editor.EntryEditor.prototype.initComponent_ = function(comp)
{
    comp.init();

    if(comp.hasHelperTile())
    {
        this.addHelperBtn(comp);
    }
};

/**
 * adds new button to create helper-tiles
 *
 * @param {hash5.ui.editor.EditorComponent} comp
 */
hash5.ui.editor.EntryEditor.prototype.addHelperBtn = function(comp)
{
    var data = {
        title: comp.getTitle(),
        icon: comp.getIcon()
    };
    var btn = goog.soy.renderAsFragment(hash5.templates.ui.EntryEditor.tileBtn, data);
    var wrapper = this.getElementByClass('helper-tile-btns');
    wrapper.appendChild(btn);

    this.getHandler().listen(btn, goog.events.EventType.CLICK, function(e){
        this.addHelperTile(comp);
    });
};

/**
 * renders helpertile into the editor. If no tile is given, a new one
 * will be created from comp
 *
 * @param {hash5.ui.editor.EditorComponent} comp
 * @param {hash5.ui.editor.HelperTile=} tile
 */
hash5.ui.editor.EntryEditor.prototype.addHelperTile = function(comp, tile)
{
    tile = tile || comp.getNewHelperTile();
    tile.setComponent(comp);
    this.addChild(tile);
    tile.render(this.getElementByClass('helper-tiles'));
};


/**
 * closes the editor (will dispose whole object + dom structure)
 */
hash5.ui.editor.EntryEditor.prototype.close = function()
{
    this.dispose();
};

/** @inheritDoc */
hash5.ui.editor.EntryEditor.prototype.disposeInternal = function()
{
    goog.array.forEach(this.components_, function(comp){
        comp.dispose();
    }, this);

    goog.base(this, 'disposeInternal');
};

/**
 * handles entry text changed
 *
 * @param  {goog.events.Event} e
 */
hash5.ui.editor.EntryEditor.prototype.handleTextChanged_ = function(e)
{
    this.parser_.setRawText(this.getEntryText());
    this.dispatchEvent(hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE);
};


/**
 * handles save button click
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.ui.editor.EntryEditor.prototype.handleSaveBtnClicked_ = function(e)
{
    var entryText = this.textEditor_.getValue();

    if(entryText.length > 0)
    {
      this.entry_.setText(entryText);
      this.entry_.save();

      this.close();
    }
};

/**
 * returns the textarea
 *
 * @return {hash5.forms.Textarea}
 */
hash5.ui.editor.EntryEditor.prototype.getTextarea = function()
{
    // TODO remove this method and add cursor position to the TEXT_CHANGE event
    return this.textEditor_;
};

/**
 * @return {hash5.parsing.Parser}
 */
hash5.ui.editor.EntryEditor.prototype.getParser = function()
{
    return this.parser_;
};

/**
 * @return {hash5.model.Entry}
 */
hash5.ui.editor.EntryEditor.prototype.getEntry = function()
{
    return this.entry_;
};

/**
 * returns current entry text from the editor
 *
 * @return {string} current entryText
 */
hash5.ui.editor.EntryEditor.prototype.getEntryText = function()
{
    return this.textEditor_.getValue();
};

/**
 * sets new entry text
 *
 * @param {string} entryText
 */
hash5.ui.editor.EntryEditor.prototype.setEntryText = function(entryText)
{
    this.textEditor_.setValue(entryText);
};


/**
 * @enum {string}
 */
hash5.ui.editor.EntryEditor.EventType ={
    TEXT_CHANGE: 'editor_text_change'
}