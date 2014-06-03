goog.provide('hash5.module.recommend.EditorComponent');

goog.require('hash5.ui.editor.EditorComponent');
goog.require('hash5.module.recommend.AutoComplete');


/**
 * Recommondations EditorComponent
 *
 * @param {hash5.model.Entry} model
 * @param {hash5.ui.editor.EntryEditor} editor
 *
 * @constructor
 * @extends {hash5.ui.editor.EditorComponent}
 */
hash5.module.recommend.EditorComponent = function(model, editor)
{
    goog.base(this, model, editor);

    /**
     * @type {goog.ui.ac.AutoComplete}
     * @private
     */
    this.autoComplete_ = null;

    /**
     * @type {Element}
     * @private
     */
    this.recEl_ = null;

    this.hasHelperTile_ = false;
};
goog.inherits(hash5.module.recommend.EditorComponent, hash5.ui.editor.EditorComponent);


/** @inheritDoc */
hash5.module.recommend.EditorComponent.prototype.init = function()
{
    var editor = this.getEditor();
    var entryTextInput = editor.getTextarea().getElement();
    this.autoComplete_ = hash5.module.recommend.AutoComplete.attachAutoComplete(entryTextInput);

    // create holder element
    var wrapper = goog.dom.createElement('div');
    goog.dom.append(editor.getBottomArea(), wrapper);
    this.recEl_ = wrapper;

    this.getHandler()
        .listen(editor, hash5.ui.editor.EntryEditor.EventType.TEXT_CHANGE, this.handleTextChanged_)
        .listen(this.recEl_, goog.events.EventType.CLICK, this.handleRecommondationClick_);


    this.refreshRecommondations();
};

/**
 * @param  {goog.events.Event} e
 */
hash5.module.recommend.EditorComponent.prototype.handleTextChanged_ = function(e)
{
    this.refreshRecommondations();
};

/**
 * reloads and renders recommondations for additional hastags
 */
hash5.module.recommend.EditorComponent.prototype.refreshRecommondations = function()
{
    var entryText = this.getEditor().getEntryText();

    var rec = hash5.ds.Recommondations.getInstance();
    rec.recommend(entryText, function(recs){
        this.recEl_.innerHTML = recs.reduce(function(prev, suggest){
            return prev + ' <span class="suggest">' + suggest + '</span>';
        }, '');
    }, this);
};


/**
 * handles click on recommendet hashtag
 *
 * @param  {goog.events.BrowserEvent} e
 */
hash5.module.recommend.EditorComponent.prototype.handleRecommondationClick_ = function(e)
{
    var clickedEl = /** @type {Element} */ (e.target);

    if(goog.dom.classes.has(clickedEl, 'suggest'))
    {
        var editor = this.getEditor();

        var hashTag = clickedEl.innerHTML;
        var curText = editor.getEntryText();
        editor.setEntryText(curText + ' ' + hashTag);
    }
};