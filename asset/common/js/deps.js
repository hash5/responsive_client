// This file was autogenerated by closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../common/js/hash5/App.js', ['hash5.App'], ['goog.dom.ViewportSizeMonitor', 'hash5.api', 'hash5.controller.MainPanelController', 'hash5.controller.UserController', 'hash5.ui.EntryEditor', 'hash5.ui.LoginForm', 'hash5.ui.PageHeader', 'hash5.ui.PageSidebar', 'hash5.ui.SearchField', 'hash5.ui.UiDecorator']);
goog.addDependency('../../../common/js/hash5/api.js', ['hash5.api', 'hash5.api.layout'], ['hash5.ds.DataSource']);
goog.addDependency('../../../common/js/hash5/controller/BaseController.js', ['hash5.controller.BaseController'], ['goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/controller/MainPanelController.js', ['hash5.controller.MainPanelController'], ['hash5.controller.BaseController', 'hash5.ui.SearchField', 'hash5.view.ListView']);
goog.addDependency('../../../common/js/hash5/controller/UserController.js', ['hash5.controller.UserController', 'hash5.controller.UserController.EventType'], ['goog.net.XhrIo', 'hash5.controller.BaseController', 'hash5.model.User']);
goog.addDependency('../../../common/js/hash5/ds/DataSource.js', ['hash5.ds.DataSource'], ['goog.Uri.QueryData', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.net.XhrManager', 'hash5.model.Entry', 'hash5.model.EntryCollection']);
goog.addDependency('../../../common/js/hash5/ds/Store.js', ['hash5.ds.Store'], []);
goog.addDependency('../../../common/js/hash5/forms/AbstractControl.js', ['hash5.forms.AbstractControl'], ['goog.dom.classes', 'goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/forms/Checkbox.js', ['hash5.forms.Checkbox'], ['goog.dom.dataset', 'goog.ui.Checkbox', 'hash5.forms.IControl']);
goog.addDependency('../../../common/js/hash5/forms/ControlFactory.js', ['hash5.forms.ControlFactory'], ['hash5.forms.Checkbox', 'hash5.forms.Textarea', 'hash5.forms.Textbox']);
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
goog.addDependency('../../../common/js/hash5/model/BaseModel.js', ['hash5.model.BaseModel'], ['goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/model/Collection.js', ['hash5.model.Collection', 'hash5.model.Collection.ChangeEvent', 'hash5.model.Collection.EventType', 'hash5.model.Collection.MoveEvent'], ['goog.array', 'goog.events', 'goog.events.EventTarget']);
goog.addDependency('../../../common/js/hash5/model/Entry.js', ['hash5.model.Entry'], ['goog.date.DateTime', 'hash5.ds.Store', 'hash5.model.BaseModel']);
goog.addDependency('../../../common/js/hash5/model/EntryCollection.js', ['hash5.model.EntryCollection'], ['goog.net.EventType', 'hash5.model.Collection']);
goog.addDependency('../../../common/js/hash5/model/User.js', ['hash5.model.User'], ['hash5.model.BaseModel']);
goog.addDependency('../../../common/js/hash5/model/Usersettings.js', ['hash5.model.Usersettings'], ['hash5.model.BaseModel']);
goog.addDependency('../../../common/js/hash5/ui/Entry.js', ['hash5.ui.Entry'], ['goog.date.relative', 'goog.ui.Component', 'hash5.model.Entry']);
goog.addDependency('../../../common/js/hash5/ui/EntryEditor.js', ['hash5.ui.EntryEditor'], ['goog.events.KeyCodes', 'goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/ui/EntryList.js', ['hash5.ui.EntryList'], ['goog.ui.Component', 'hash5.model.Collection.EventType', 'hash5.ui.Entry']);
goog.addDependency('../../../common/js/hash5/ui/EntryListContainer.js', ['hash5.ui.EntryListContainer'], ['goog.ui.Component', 'hash5.ui.EntryList', 'hash5.ui.QuickCreateEntry']);
goog.addDependency('../../../common/js/hash5/ui/LoginForm.js', ['hash5.ui.LoginForm'], ['goog.ui.Component', 'goog.ui.registry', 'hash5.forms.DefaultErrorProvider', 'hash5.forms.Form', 'hash5.forms.Textbox', 'hash5.validation.EqualityValidator', 'hash5.validation.RequiredFieldValidator']);
goog.addDependency('../../../common/js/hash5/ui/Overlay.js', ['hash5.ui.Overlay'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/ui/PageHeader.js', ['hash5.ui.PageHeader', 'hash5.ui.PageHeader.ActionBarButton'], ['goog.ui.Component', 'goog.ui.registry', 'hash5.ui.PageSidebar']);
goog.addDependency('../../../common/js/hash5/ui/PageSidebar.js', ['hash5.ui.PageSidebar'], ['goog.ui.Component', 'goog.ui.registry', 'hash5.ui.Overlay']);
goog.addDependency('../../../common/js/hash5/ui/QuickCreateEntry.js', ['hash5.ui.QuickCreateEntry'], ['goog.ui.Component', 'hash5.forms.Textbox']);
goog.addDependency('../../../common/js/hash5/ui/SearchField.js', ['hash5.ui.SearchField'], ['goog.ui.Component', 'goog.ui.registry', 'hash5.forms.Textbox']);
goog.addDependency('../../../common/js/hash5/ui/UiDecorator.js', ['hash5.ui.UiDecorator'], ['goog.dom', 'goog.dom.classes', 'goog.ui.registry']);
goog.addDependency('../../../common/js/hash5/validation/EmailValidator.js', ['hash5.validation.EmailValidator'], ['goog.format.EmailAddress', 'hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/EqualityValidator.js', ['hash5.validation.EqualityValidator'], ['hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/FormValidation.js', ['hash5.validation.FormValidation', 'hash5.validation.FormValidationError'], ['goog.events.EventHandler', 'goog.events.EventTarget', 'hash5.validation.FormValidationResult']);
goog.addDependency('../../../common/js/hash5/validation/FormValidationResult.js', ['hash5.validation.FormValidationResult'], []);
goog.addDependency('../../../common/js/hash5/validation/RegexValidator.js', ['hash5.validation.RegexValidator'], ['hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/RequiredFieldValidator.js', ['hash5.validation.RequiredFieldValidator'], ['hash5.validation.Validator']);
goog.addDependency('../../../common/js/hash5/validation/Validator.js', ['hash5.validation.Validator', 'hash5.validation.Validator.EventType'], []);
goog.addDependency('../../../common/js/hash5/view/BaseView.js', ['hash5.view.BaseView'], ['goog.ui.Component']);
goog.addDependency('../../../common/js/hash5/view/ListView.js', ['hash5.view.ListView'], ['hash5.ui.EntryListContainer', 'hash5.view.BaseView']);
