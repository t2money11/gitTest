sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast"
], function (ManagedObject, Fragment, MessageToast) {
	"use strict";

	return ManagedObject.extend("gitTest.GitTest.controller.CreateUpdateUserInfo", {

		constructor: function (oView) {
			this._oView = oView;
		},

		setController: function (oController) {
			this._oController = oController;
		},

		exit: function () {
			delete this._oView;
			delete this._oController;
		},

		open: function () {
			var oView = this._oView;
			var oController = this._oController;

			// create dialog lazily
			if (!oView.byId("createUpdateUserInfo")) {
				var oFragmentController = {
					onCancel: function () {
						oView.byId("ID").setValue("");
						oView.byId("Name").setValue("");
						oView.byId("Location").setValue("");
						oView.byId("createUpdateUserInfo").close();
					},
					onSave: function () {
						var dataModel = oController.getOwnerComponent().getModel("TEST_SCHEMA");
						dataModel.setUseBatch(false);

						var entry = {};
						entry.ID = oView.byId("ID").getValue();
						entry.Name = oView.byId("Name").getValue();
						entry.Location = oView.byId("Location").getValue();
						oController._busyDialog.open();
						dataModel.create("/USERINFO", entry, {
							method: "POST",
							success: function (data) {
								oController._busyDialog.close();
								oView.byId("createUpdateUserInfo").close();
								MessageToast.show("新規成功。");
								oController.onUserInfoRefresh();
							},
							error: function (e) {
								oController._busyDialog.close();
								MessageToast.show("新規失敗。");
							}
						});
						//sap.ui.controller(_controllerName).onSave();
					}
				};
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "gitTest.GitTest.view.CreateUpdateUserInfo",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				oView.byId("createUpdateUserInfo").open();
			}
		}

	});

});