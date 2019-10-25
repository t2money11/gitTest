sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/BusyDialog",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter",
	"sap/m/Token"
], function (Controller, JSONModel, Filter, FilterOperator, BusyDialog, MessageToast, Sorter, Token, UserInfo) {
	"use strict";

	return Controller.extend("gitTest.GitTest.controller.DownloadEmpJobRelationships", {

		onInit: function () {

			this._busyDialog = new BusyDialog();
			var oMultiInput = this.getView().byId("multiInput");
			oMultiInput.setTokens([
				new Token({
					text: "5100010",
					key: "5100010"
				}),
				new Token({
					text: "5100011",
					key: "5100011"
				}),
				new Token({
					text: "5100020",
					key: "5100020"
				})
			]);

			// add validator
			oMultiInput.addValidator(function (args) {
				var text = args.text;
				return new Token({
					key: text,
					text: text
				});
			});
		},

		onDownload: function () {

			var loginUser = this.getOwnerComponent().getModel("loginUser").getProperty("/name");
			loginUser = "5100014";
			
			var tokens = this.getView().byId("multiInput").getTokens();
			var userArray = [];
			$.each(tokens, function (index, token) {
				userArray.push(token.getText());
			});
			var userArrayString = userArray.join(",");
			
			window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=EmpJobRelationships", "_self");
		},

		onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Download");
		}
	});
});