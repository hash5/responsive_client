// This file was autogenerated by closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../common/js/hash5/App.js', ['hash5.App'], ['goog.debug.FancyWindow', 'goog.dom.ViewportSizeMonitor', 'goog.labs.userAgent.device', 'goog.module.ModuleLoader', 'goog.module.ModuleManager', 'hash5.controller.UserController', 'hash5.module', 'hash5.module.LoaderModule', 'hash5.ui.LoginForm']);
goog.addDependency('../../../common/js/hash5/Router.js', ['hash5.Route', 'hash5.Router'], ['goog.History', 'goog.array', 'goog.dom', 'goog.dom.classes', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.history.Html5History']);
goog.addDependency('../../../common/js/hash5/api.js', ['hash5.api', 'hash5.api.layout', 'hash5.api.search'], ['hash5.controller.EditorController', 'hash5.ds.DataSource']);
goog.addDependency('../../../common/js/hash5/controller/BaseController.js', ['hash5.controller.BaseController'], ['goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/controller/EditorController.js', ['hash5.controller.EditorController'], ['hash5.controller.BaseController', 'hash5.ui.editor.EntryEditor']);
goog.addDependency('../../../common/js/hash5/controller/ErrorController.js', ['hash5.controller.ErrorController', 'hash5.controller.ErrorEvent'], ['hash5.controller.BaseController', 'hash5.ui.MessageBox']);
goog.addDependency('../../../common/js/hash5/controller/MainPanelController.js', ['hash5.controller.MainPanelController'], ['hash5.controller.BaseController', 'hash5.view.ListView']);
goog.addDependency('../../../common/js/hash5/controller/SearchController.js', ['hash5.controller.SearchController'], ['hash5.ui.search.EventType', 'hash5.ui.search.FilterChangeEvent', 'hash5.ui.search.SearchField', 'hash5.ui.search.TextInputChangeEvent']);
goog.addDependency('../../../common/js/hash5/controller/UndoController.js', ['hash5.controller.UndoController'], ['hash5.controller.BaseController', 'hash5.ds.EntryStore', 'hash5.layout.HeaderButtonGroup']);
goog.addDependency('../../../common/js/hash5/controller/UserController.js', ['hash5.controller.UserController', 'hash5.controller.UserController.EventType'], ['goog.net.XhrIo', 'hash5.controller.BaseController', 'hash5.controller.ErrorController', 'hash5.model.User', 'hash5.ui.OverlayLoginForm']);
goog.addDependency('../../../common/js/hash5/ds/ConnectionManager.js', ['hash5.ds.ConnectionManager'], ['goog.Uri.QueryData', 'goog.events.EventTarget', 'goog.net.XhrManager', 'goog.structs.Map', 'hash5.ds.Request']);
goog.addDependency('../../../common/js/hash5/ds/DataSource.js', ['hash5.ds.DataSource'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'hash5.ds.ConnectionManager', 'hash5.ds.Options', 'hash5.model.EntryCollection']);
goog.addDependency('../../../common/js/hash5/ds/EntryStore.js', ['hash5.ds.EntryStore'], ['goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/ds/Options.js', ['hash5.ds.DefaultOptions', 'hash5.ds.Options', 'hash5.ds.options.SortField', 'hash5.ds.options.SortOrder'], []);
goog.addDependency('../../../common/js/hash5/ds/Recommondations.js', ['hash5.ds.Recommondations'], ['goog.Uri.QueryData', 'goog.net.XhrManager']);
goog.addDependency('../../../common/js/hash5/ds/Request.js', ['hash5.ds.Request'], ['goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/ds/SearchOptions.js', ['hash5.ds.SearchOptions'], []);
goog.addDependency('../../../common/js/hash5/ds/Store.js', ['hash5.ds.Store'], []);
goog.addDependency('../../../common/js/hash5/forms/AbstractControl.js', ['hash5.forms.AbstractControl'], ['goog.dom.classes', 'goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/forms/Checkbox.js', ['hash5.forms.Checkbox'], ['goog.dom.dataset', 'goog.ui.Checkbox', 'hash5.forms.IControl']);
goog.addDependency('../../../common/js/hash5/forms/ControlFactory.js', ['hash5.forms.ControlFactory'], ['hash5.forms.Checkbox', 'hash5.forms.Textarea', 'hash5.forms.Textbox']);
goog.addDependency('../../../common/js/hash5/forms/DatePicker.js', ['hash5.forms.DatePicker'], ['goog.async.Delay', 'goog.events.KeyCodes', 'goog.ui.Control', 'goog.ui.registry', 'hash5.forms.DatePickerRenderer', 'hash5.forms.IControl']);
goog.addDependency('../../../common/js/hash5/forms/DefaultErrorProvider.js', ['hash5.forms.DefaultErrorProvider'], ['goog.Timer', 'goog.dom', 'goog.dom.classes', 'goog.ui.Component', 'hash5.forms.IErrorProvider', 'hash5.forms.Textbox']);
goog.addDependency('../../../common/js/hash5/forms/Form.js', ['hash5.forms.Form'], ['goog.structs.Map', 'goog.ui.Component', 'goog.ui.registry', 'hash5.forms.FormItem', 'hash5.validation.FormValidation']);
goog.addDependency('../../../common/js/hash5/forms/FormItem.js', ['hash5.forms.FormItem'], ['goog.ui.Component', 'goog.ui.registry']);
goog.addDependency('../../../common/js/hash5/forms/IControl.js', ['hash5.forms.IControl'], []);
goog.addDependency('../../../common/js/hash5/forms/IErrorProvider.js', ['hash5.forms.IErrorProvider'], []);
goog.addDependency('../../../common/js/hash5/forms/Select.js', ['hash5.forms.Select'], ['goog.dom.dataset', 'goog.ui.Option', 'goog.ui.Select']);
goog.addDependency('../../../common/js/hash5/forms/Textarea.js', ['hash5.forms.Textarea'], ['goog.ui.Control', 'goog.ui.Textarea', 'goog.ui.registry', 'hash5.forms.IControl']);
goog.addDependency('../../../common/js/hash5/forms/Textbox.js', ['hash5.forms.Textbox'], ['goog.async.Delay', 'goog.events.KeyCodes', 'goog.ui.Control', 'goog.ui.registry', 'hash5.forms.IControl', 'hash5.forms.TextboxRenderer']);
goog.addDependency('../../../common/js/hash5/forms/TextboxRenderer.js', ['hash5.forms.TextboxRenderer'], ['goog.ui.ControlRenderer']);
goog.addDependency('../../../common/js/hash5/forms/TooltipErrorProvider.js', ['hash5.forms.TooltipErrorProvider'], ['hash5.forms.IErrorProvider']);
goog.addDependency('../../../common/js/hash5/fx/CssClassAnimation.js', ['hash5.fx.CssClassAnimation', 'hash5.fx.CssClassAnimation.Animations'], []);
goog.addDependency('../../../common/js/hash5/layout/Header.js', ['hash5.layout.Header'], ['goog.ui.Component', 'goog.ui.registry', 'hash5.layout.HeaderButton', 'hash5.layout.HeaderButtonGroup', 'hash5.ui.ConnectionStatus', 'hash5.ui.PageSidebar', 'hash5.ui.search.SearchField', 'hash5.view.Settings']);
goog.addDependency('../../../common/js/hash5/layout/HeaderButton.js', ['hash5.layout.HeaderButton'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/layout/HeaderButtonGroup.js', ['hash5.layout.HeaderButtonGroup'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/model/BaseModel.js', ['hash5.model.BaseModel', 'hash5.model.EventType'], ['goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/model/Collection.js', ['hash5.model.Collection', 'hash5.model.Collection.ChangeEvent', 'hash5.model.Collection.EventType', 'hash5.model.Collection.MoveEvent'], ['goog.array', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/model/Entry.js', ['hash5.model.Entry', 'hash5.model.Entry.EventType'], ['goog.date.DateTime', 'hash5.ds.DataSource', 'hash5.ds.EntryStore', 'hash5.model.BaseModel', 'hash5.parsing.EntryTextParser', 'hash5.parsing.Parser']);
goog.addDependency('../../../common/js/hash5/model/EntryCollection.js', ['hash5.model.EntryCollection'], ['goog.events.EventHandler', 'goog.net.EventType', 'hash5.model.Collection']);
goog.addDependency('../../../common/js/hash5/model/User.js', ['hash5.model.User'], ['hash5.model.BaseModel']);
goog.addDependency('../../../common/js/hash5/model/Usersettings.js', ['hash5.model.Usersettings'], ['hash5.model.BaseModel']);
goog.addDependency('../../../common/js/hash5/module/BaseModule.js', ['hash5.module.BaseModule'], ['goog.module.BaseModule']);
goog.addDependency('../../../common/js/hash5/module/CoreModule.js', ['hash5.module.CoreModule'], ['goog.module.ModuleManager', 'hash5.Router', 'hash5.api', 'hash5.controller.EditorController', 'hash5.controller.MainPanelController', 'hash5.controller.SearchController', 'hash5.controller.UndoController', 'hash5.layout.Header', 'hash5.module.BaseModule', 'hash5.module.LinksModule', 'hash5.module.RecommondationModule', 'hash5.ui.PageSidebar', 'hash5.ui.UiDecorator', 'hash5.ui.editor.EntryEditor']);
goog.addDependency('../../../common/js/hash5/module/LoaderModule.js', ['hash5.module.LoaderModule'], ['hash5.controller.ErrorController', 'hash5.module.BaseModule']);
goog.addDependency('../../../common/js/hash5/module/module.js', ['hash5.module'], []);
goog.addDependency('../../../common/js/hash5/module/recommend/AutoComplete.js', ['hash5.module.recommend.AutoComplete'], ['goog.ui.ac.AutoComplete', 'goog.ui.ac.InputHandler', 'goog.ui.ac.Renderer', 'hash5.ds.Recommondations', 'hash5.module.recommend.AutoCompleteInputHandler']);
goog.addDependency('../../../common/js/hash5/module/recommend/AutoCompleteInputHandler.js', ['hash5.module.recommend.AutoCompleteInputHandler'], ['goog.ui.ac.InputHandler']);
goog.addDependency('../../../common/js/hash5/module/recommend/EditorComponent.js', ['hash5.module.recommend.EditorComponent'], ['hash5.module.recommend.AutoComplete', 'hash5.ui.editor.EditorComponent']);
goog.addDependency('../../../common/js/hash5/module/recommend/RecommondationModule.js', ['hash5.module.RecommondationModule'], ['hash5.api', 'hash5.module.BaseModule', 'hash5.module.recommend.EditorComponent']);
goog.addDependency('../../../common/js/hash5/parsing/ComplexTag.js', ['hash5.parsing.ComplexTag'], []);
goog.addDependency('../../../common/js/hash5/parsing/EntryTextParser.js', ['hash5.parsing.EntryTextParser', 'hash5.parsing.EntryTextParser.DisplayEvent', 'hash5.parsing.EntryTextParser.EventType'], ['goog.events.EventTarget', 'hash5.ds.EntryStore']);
goog.addDependency('../../../common/js/hash5/parsing/ISubParser.js', ['hash5.parsing.ISubParser'], []);
goog.addDependency('../../../common/js/hash5/parsing/Parser.js', ['hash5.parsing.Parser'], ['goog.events.EventType', 'hash5.parsing.ComplexTag', 'hash5.parsing.ISubParser']);
goog.addDependency('../../../common/js/hash5/storage/AppData.js', ['hash5.storage.AppData'], ['goog.storage.ExpiringStorage', 'goog.storage.mechanism.mechanismfactory']);
goog.addDependency('../../../common/js/hash5/style/Style.js', ['hash5.style'], []);
goog.addDependency('../../../common/js/hash5/ui/ConnectionStatus.js', ['hash5.ui.ConnectionStatus'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/ui/Entry.js', ['hash5.ui.Entry'], ['goog.date.relative', 'goog.ui.Component', 'hash5.model.Entry', 'hash5.templates.ui.Entry', 'hash5.utils']);
goog.addDependency('../../../common/js/hash5/ui/EntryList.js', ['hash5.ui.EntryList'], ['goog.fx.DragListGroup', 'goog.ui.Component', 'hash5.model.Collection.EventType', 'hash5.ui.Entry']);
goog.addDependency('../../../common/js/hash5/ui/EntryListContainer.js', ['hash5.ui.EntryListContainer'], ['goog.ui.Component', 'hash5.templates.ui.EntryListContainer', 'hash5.ui.EntryList', 'hash5.ui.QuickCreateEntry']);
goog.addDependency('../../../common/js/hash5/ui/ListSwitcher.js', ['hash5.ui.ListSwitcher'], ['goog.ui.Component', 'hash5.templates.ListView']);
goog.addDependency('../../../common/js/hash5/ui/LoginForm.js', ['hash5.ui.LoginForm'], ['goog.ui.Component', 'hash5.forms.Checkbox', 'hash5.forms.DefaultErrorProvider', 'hash5.forms.Form', 'hash5.forms.Textbox', 'hash5.templates.ui.LoginForm', 'hash5.ui.PwdRecoveryForm', 'hash5.ui.RegisterForm', 'hash5.validation.RequiredFieldValidator']);
goog.addDependency('../../../common/js/hash5/ui/MessageBox.js', ['hash5.ui.MessageBox', 'hash5.ui.MessageBox.Type'], ['goog.ui.Component', 'hash5.templates.ui.MessageBox', 'hash5.ui.Overlay']);
goog.addDependency('../../../common/js/hash5/ui/Overlay.js', ['hash5.ui.Overlay'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/ui/OverlayLoginForm.js', ['hash5.ui.OverlayLoginForm'], ['hash5.ui.LoginForm', 'hash5.ui.Overlay']);
goog.addDependency('../../../common/js/hash5/ui/PageSidebar.js', ['hash5.ui.PageSidebar'], ['goog.ui.Component', 'goog.ui.registry', 'hash5.ui.Overlay', 'hash5.ui.st.SearchTree']);
goog.addDependency('../../../common/js/hash5/ui/PwdRecoveryForm.js', ['hash5.ui.PwdRecoveryForm'], ['goog.ui.Component', 'hash5.forms.DefaultErrorProvider', 'hash5.forms.Form', 'hash5.forms.Textbox', 'hash5.templates.ui.LoginForm', 'hash5.validation.EmailValidator', 'hash5.validation.EqualityValidator', 'hash5.validation.RequiredFieldValidator']);
goog.addDependency('../../../common/js/hash5/ui/QuickCreateEntry.js', ['hash5.ui.QuickCreateEntry'], ['goog.events.KeyCodes', 'goog.ui.Component', 'hash5.forms.Textarea']);
goog.addDependency('../../../common/js/hash5/ui/RegisterForm.js', ['hash5.ui.RegisterForm'], ['goog.ui.Component', 'hash5.forms.DefaultErrorProvider', 'hash5.forms.Form', 'hash5.forms.Textbox', 'hash5.templates.ui.LoginForm', 'hash5.validation.EmailValidator', 'hash5.validation.EqualityValidator', 'hash5.validation.RequiredFieldValidator']);
goog.addDependency('../../../common/js/hash5/ui/UiDecorator.js', ['hash5.ui.UiDecorator'], ['goog.dom', 'goog.dom.classes', 'goog.ui.registry']);
goog.addDependency('../../../common/js/hash5/ui/editor/AutoSaver.js', ['hash5.ui.editor.AutoSaver'], ['hash5.templates.ui.EntryEditor']);
goog.addDependency('../../../common/js/hash5/ui/editor/ChangedTagEvent.js', ['hash5.ui.editor.ChangedTagEvent', 'hash5.ui.editor.EventType'], ['goog.events.Event']);
goog.addDependency('../../../common/js/hash5/ui/editor/EditorComponent.js', ['hash5.ui.editor.EditorComponent'], ['hash5.ui.editor.EventType']);
goog.addDependency('../../../common/js/hash5/ui/editor/EntryEditor.js', ['hash5.ui.editor.EntryEditor', 'hash5.ui.editor.EntryEditor.EventType'], ['goog.ui.Component', 'hash5.forms.Textarea', 'hash5.templates.ui.EntryEditor', 'hash5.ui.editor.AutoSaver', 'hash5.ui.editor.History']);
goog.addDependency('../../../common/js/hash5/ui/editor/HelperTile.js', ['hash5.ui.editor.HelperTile'], ['goog.ui.Component', 'hash5.templates.ui.EntryEditor']);
goog.addDependency('../../../common/js/hash5/ui/editor/Histroy.js', ['hash5.ui.editor.History'], ['hash5.templates.ui.EntryEditor']);
goog.addDependency('../../../common/js/hash5/ui/search/DefaultSearchOptionsHelper.js', ['hash5.ui.search.DefaultSearchOptionsHelper'], ['hash5.ui.search.EventType']);
goog.addDependency('../../../common/js/hash5/ui/search/Events.js', ['hash5.ui.search.EventType', 'hash5.ui.search.FilterChangeEvent', 'hash5.ui.search.TextInputChangeEvent'], ['goog.events.Event']);
goog.addDependency('../../../common/js/hash5/ui/search/SearchField.js', ['hash5.ui.search.SearchField'], ['goog.ui.Component', 'goog.ui.ac.AutoComplete', 'goog.ui.ac.InputHandler', 'goog.ui.ac.Renderer', 'hash5.forms.Textbox', 'hash5.templates.Searchfield', 'hash5.ui.search.SearchOptionsHelper']);
goog.addDependency('../../../common/js/hash5/ui/search/SearchOptionsHelper.js', ['hash5.ui.search.SearchOptionsHelper'], ['goog.ui.Component', 'hash5.ds.SearchOptions', 'hash5.forms.Form', 'hash5.forms.Textbox', 'hash5.templates.Searchfield', 'hash5.ui.search.DefaultSearchOptionsHelper', 'hash5.ui.search.EventType', 'hash5.ui.search.FilterChangeEvent']);
goog.addDependency('../../../common/js/hash5/ui/st/FolderNode.js', ['hash5.ui.st.FolderNode'], ['hash5.templates.SearchTree', 'hash5.ui.st.Node']);
goog.addDependency('../../../common/js/hash5/ui/st/Node.js', ['hash5.ui.st.Node'], []);
goog.addDependency('../../../common/js/hash5/ui/st/SearchNode.js', ['hash5.ui.st.SearchNode'], ['hash5.templates.SearchTree', 'hash5.ui.st.Node']);
goog.addDependency('../../../common/js/hash5/ui/st/SearchTree.js', ['hash5.ui.st.SearchTree'], ['hash5.templates.SearchTree', 'hash5.ui.st.FolderNode', 'hash5.ui.st.SearchNode', 'hash5.ui.st.SearchTreeDragHandler']);
goog.addDependency('../../../common/js/hash5/ui/st/SearchTreeDragHandler.js', ['hash5.ui.st.SearchTreeDragHandler'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'goog.fx.DragDropGroup']);
goog.addDependency('../../../common/js/hash5/utils.js', ['hash5.utils'], []);
goog.addDependency('../../../common/js/hash5/validation/EmailValidator.js', ['hash5.validation.EmailValidator'], ['goog.format.EmailAddress', 'hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/EqualityValidator.js', ['hash5.validation.EqualityValidator'], ['hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/FormValidation.js', ['hash5.validation.FormValidation', 'hash5.validation.FormValidationError', 'hash5.validation.FormValidationEvent'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'hash5.validation.FormValidationResult']);
goog.addDependency('../../../common/js/hash5/validation/FormValidationResult.js', ['hash5.validation.FormValidationResult'], []);
goog.addDependency('../../../common/js/hash5/validation/RegexValidator.js', ['hash5.validation.RegexValidator'], ['hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/RequiredFieldValidator.js', ['hash5.validation.RequiredFieldValidator'], ['hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/Validator.js', ['hash5.validation.Validator', 'hash5.validation.Validator.EventType'], []);
goog.addDependency('../../../common/js/hash5/view/BaseView.js', ['hash5.view.BaseView'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/view/ListView.js', ['hash5.view.ListView', 'hash5.view.ListView.EventType'], ['goog.fx.DragListGroup', 'goog.fx.easing', 'hash5.fx.CssClassAnimation', 'hash5.storage.AppData', 'hash5.style', 'hash5.templates.ListView', 'hash5.ui.EntryListContainer', 'hash5.ui.ListSwitcher', 'hash5.ui.PageSidebar', 'hash5.view.BaseView', 'monin.fx.WindowScroll']);
goog.addDependency('../../../common/js/hash5/view/Settings.js', ['hash5.view.Settings'], ['goog.ui.Component', 'hash5.forms.Form', 'hash5.forms.Select', 'hash5.templates.Settings', 'hash5.ui.Overlay']);
goog.addDependency('../../../common/js/monin/fx/Animation.js', ['monin.fx.Animation'], ['goog.fx.Animation']);
goog.addDependency('../../../common/js/monin/fx/WindowScroll.js', ['monin.fx.WindowScroll'], ['monin.fx.dom.PredefinedEffect']);
goog.addDependency('../../../common/js/monin/fx/dom.js', ['monin.fx.dom.PredefinedEffect', 'monin.fx.dom.Slide', 'monin.fx.dom.SlideFrom'], ['goog.style.bidi', 'monin.fx.Animation']);
goog.addDependency('../../../common/js/monin/fx/easing.js', ['monin.fx.easing'], []);
goog.addDependency('../../../common/js/monin/ui/FileUploader.js', ['monin.ui.FileUploader', 'monin.ui.FileUploader.EventType', 'monin.ui.FileUploader.File'], ['goog.json', 'goog.ui.Component']);
goog.addDependency('../../../common/js/monin/ui/FileUploaderFactory.js', ['monin.ui.FileUploaderFactory'], ['goog.userAgent', 'monin.ui.FileUploaderHtml4', 'monin.ui.FileUploaderHtml5']);
goog.addDependency('../../../common/js/monin/ui/FileUploaderHtml4.js', ['monin.ui.FileUploaderHtml4'], ['goog.Uri', 'goog.dom.classes', 'goog.json', 'goog.structs.Map', 'goog.style', 'goog.ui.Component', 'goog.ui.media.FlashObject', 'monin.ui.FileUploader', 'monin.ui.FileUploader.EventType']);
goog.addDependency('../../../common/js/monin/ui/FileUploaderHtml5.js', ['monin.ui.FileUploaderHtml5'], ['goog.events.FileDropHandler', 'goog.json', 'goog.ui.Component', 'monin.ui.FileUploader']);
goog.addDependency('../../../modules/calendar/js/CalendarModule.js', ['hash5.module.CalendarModule'], ['hash5.api', 'hash5.module.BaseModule', 'hash5.module.calendar.EditorComponent', 'hash5.module.calendar.SearchOptionsHelper']);
goog.addDependency('../../../modules/calendar/js/CalendarParser.js', ['hash5.module.calendar.CalendarParser'], ['hash5.module.calendar.DateUtils', 'hash5.module.calendar.Duration', 'hash5.module.calendar.Event', 'hash5.parsing.ISubParser']);
goog.addDependency('../../../modules/calendar/js/DateTime.js', ['hash5.module.calendar.DateTime'], ['goog.date.DateTime']);
goog.addDependency('../../../modules/calendar/js/DateUtils.js', ['hash5.module.calendar.DateUtils'], ['goog.i18n.DateTimeParse', 'hash5.module.calendar.DateTime']);
goog.addDependency('../../../modules/calendar/js/Duration.js', ['hash5.module.calendar.Duration', 'hash5.module.calendar.Duration.Types'], []);
goog.addDependency('../../../modules/calendar/js/EditorComponent.js', ['hash5.module.calendar.EditorComponent'], ['hash5.module.calendar.CalendarParser', 'hash5.module.calendar.ui.HelperTile']);
goog.addDependency('../../../modules/calendar/js/Event.js', ['hash5.module.calendar.Event'], ['hash5.module.calendar.DateTime', 'hash5.module.calendar.Duration', 'hash5.ui.editor.EventType']);
goog.addDependency('../../../modules/calendar/js/SearchOptionsHelper.js', ['hash5.module.calendar.SearchOptionsHelper'], []);
goog.addDependency('../../../modules/calendar/js/ui/DatePicker.js', ['hash5.module.calendar.ui.DatePicker', 'hash5.module.calendar.ui.DatePicker.SelectionMode', 'hash5.module.calendar.ui.DatePickerEvent'], ['goog.date', 'goog.date.Date', 'goog.date.DateRange', 'goog.date.Interval', 'goog.dom', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeSymbols', 'goog.ui.Component']);
goog.addDependency('../../../modules/calendar/js/ui/DatePickerInput.js', ['hash5.module.calendar.ui.DatePickerInput'], ['goog.ui.InputDatePicker', 'hash5.forms.Textbox']);
goog.addDependency('../../../modules/calendar/js/ui/ExcludeHelper.js', ['hash5.module.calendar.ui.ExcludeHelper'], []);
goog.addDependency('../../../modules/calendar/js/ui/HelperTile.js', ['hash5.module.calendar.ui.HelperTile'], ['goog.date.Interval', 'hash5.forms.Checkbox', 'hash5.forms.Form', 'hash5.forms.Select', 'hash5.forms.Textbox', 'hash5.module.calendar.DateUtils', 'hash5.module.calendar.ui.DatePickerInput', 'hash5.module.calendar.ui.ExcludeHelper', 'hash5.ui.editor.HelperTile']);
goog.addDependency('../../../modules/files/js/EditorComponent.js', ['hash5.module.files.EditorComponent'], ['hash5.module.files.FileParser', 'hash5.module.files.PreviewHelperTile', 'hash5.module.files.UploadHelperTile']);
goog.addDependency('../../../modules/files/js/File.js', ['hash5.module.files.File'], []);
goog.addDependency('../../../modules/files/js/FileParser.js', ['hash5.module.files.FileParser'], ['hash5.module.files.File', 'hash5.parsing.ISubParser']);
goog.addDependency('../../../modules/files/js/FilesModule.js', ['hash5.module.FilesModule'], ['hash5.api', 'hash5.ds.EntryStore', 'hash5.module.BaseModule', 'hash5.module.files.EditorComponent']);
goog.addDependency('../../../modules/files/js/PreviewHelperTile.js', ['hash5.module.files.PreviewHelperTile'], ['goog.format', 'hash5.module.files.Template', 'hash5.ui.editor.HelperTile']);
goog.addDependency('../../../modules/files/js/UploadHelperTile.js', ['hash5.module.files.UploadHelperTile'], ['hash5.module.files.Template', 'hash5.ui.editor.HelperTile', 'monin.ui.FileUploaderFactory']);
goog.addDependency('../../../modules/geo5/js/EditorComponent.js', ['hash5.module.geo5.EditorComponent'], ['hash5.module.geo5.Geo5Parser', 'hash5.module.geo5.HelperTile']);
goog.addDependency('../../../modules/geo5/js/Geo5Module.js', ['hash5.module.Geo5Module'], ['goog.net.jsloader', 'hash5.api', 'hash5.module.BaseModule', 'hash5.module.geo5.EditorComponent']);
goog.addDependency('../../../modules/geo5/js/Geo5Parser.js', ['hash5.module.geo5.Geo5Parser'], ['hash5.api', 'hash5.module.geo5.LatLng', 'hash5.parsing.ISubParser']);
goog.addDependency('../../../modules/geo5/js/HelperTile.js', ['hash5.module.geo5.HelperTile'], ['goog.date.Interval', 'hash5.ui.editor.HelperTile']);
goog.addDependency('../../../modules/geo5/js/LatLng.js', ['hash5.module.geo5.LatLng'], []);
goog.addDependency('../../../modules/intro/js/IntroLayer.js', ['hash5.module.intro.IntroLayer'], ['goog.ui.Component', 'hash5.module.intro.IntroTour', 'hash5.module.intro.Template', 'hash5.ui.Overlay']);
goog.addDependency('../../../modules/intro/js/IntroModule.js', ['hash5.module.IntroModule'], ['hash5.api', 'hash5.controller.UserController', 'hash5.model.Entry', 'hash5.module.intro.IntroLayer', 'hash5.module.intro.initData', 'hash5.ui.PageSidebar']);
goog.addDependency('../../../modules/intro/js/IntroTour.js', ['hash5.module.intro.IntroTour'], ['goog.Timer', 'goog.events.EventHandler', 'hash5.module.intro.Tooltip', 'hash5.module.intro.TooltipAction', 'hash5.module.intro.initData']);
goog.addDependency('../../../modules/intro/js/ToolTip.js', ['hash5.module.intro.Tooltip', 'hash5.module.intro.Tooltip.Direction'], ['goog.array', 'goog.dom.classes', 'goog.fx.easing', 'goog.math.Coordinate', 'goog.style', 'goog.ui.Component', 'monin.fx.dom.Slide']);
goog.addDependency('../../../modules/intro/js/TooltipAction.js', ['hash5.module.intro.TooltipAction'], ['goog.ui.Component']);
goog.addDependency('../../../modules/intro/js/initData.js', ['hash5.module.intro.initData', 'hash5.module.intro.initData_de', 'hash5.module.intro.initData_en'], ['hash5.module.intro.Tooltip.Direction']);
goog.addDependency('../../../modules/links/js/ImagePreview.js', ['hash5.module.links.ImagePreview'], ['goog.ui.Component']);
goog.addDependency('../../../modules/links/js/LinkParser.js', ['hash5.module.links.LinkParser'], ['hash5.parsing.ISubParser']);
goog.addDependency('../../../modules/links/js/LinksModule.js', ['hash5.module.LinksModule'], ['goog.Uri', 'hash5.ds.EntryStore', 'hash5.module.links.ImagePreview', 'hash5.module.links.LinkParser']);
goog.addDependency('../../../modules/pages/js/Pages.js', ['hash5.Pages'], ['hash5.modules.pages.PasswordRecovery']);
goog.addDependency('../../../modules/pages/js/PasswordRecovery.js', ['hash5.modules.pages.PasswordRecovery'], ['goog.Uri', 'goog.net.XhrIo', 'goog.ui.Component', 'hash5.forms.DefaultErrorProvider', 'hash5.forms.Form', 'hash5.forms.Textbox', 'hash5.modules.pages.templates.PasswordRecovery', 'hash5.ui.MessageBox', 'hash5.validation.EqualityValidator', 'hash5.validation.FormValidation', 'hash5.validation.RequiredFieldValidator']);
goog.addDependency('../../../third-party/soyutils_usegoog.js', ['soy', 'soy.StringBuilder', 'soy.esc', 'soydata', 'soydata.SanitizedHtml', 'soydata.SanitizedHtmlAttribute', 'soydata.SanitizedJs', 'soydata.SanitizedJsStrChars', 'soydata.SanitizedUri', 'soydata.VERY_UNSAFE'], ['goog.asserts', 'goog.dom.DomHelper', 'goog.format', 'goog.i18n.BidiFormatter', 'goog.i18n.bidi', 'goog.soy', 'goog.soy.data.SanitizedContentKind', 'goog.string', 'goog.string.StringBuffer']);
