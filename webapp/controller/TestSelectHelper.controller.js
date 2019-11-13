sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/BusyDialog",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter",
	'sap/m/SearchField',
	'sap/ui/model/type/String',
	"./SelectHelper",
	"sap/m/Token"
], function (Controller, JSONModel, Filter, FilterOperator, BusyDialog, MessageToast, Sorter, SearchField, typeString, SelectHelper, Token) {
	"use strict";

	var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
		pattern: "yyyy/MM/dd"
	});
	var dateTimeFormat = sap.ui.core.format.DateFormat.getDateInstance({
		pattern: "yyyy/MM/dd HH:mm:ss"
	});

	return Controller.extend("gitTest.GitTest.controller.TestSelectHelper", {

		onInit: function () {
			
			// add validator
			var oMultiInput = this.getView().byId("userInfo");
			oMultiInput.addValidator(function (args) {
				var text = args.text;
				return new Token({
					key: text,
					text: text
				});
			});
			
			this.getView().setModel(this.getOwnerComponent().getModel("TEST_SCHEMA"));
			
			this.fields = [{
				label: "ID",
				key: "ID",
				searchable: true,
				iskey: true
			}, {
				label: "Name",
				key: "Name",
				searchable: true,
				iskey: true
			}, {
				label: "Location",
				key: "Location",
				searchable: true,
				width: "10rem"
			}];
			
			this.valuehelp = new SelectHelper(this.getView().getModel(), this.getView().byId("userInfo"), this.fields, "USERINFO");
		},
		
		onValueHelpRequest: function () {
			var me = this;
			this.valuehelp.openValueHelp("/USERINFO",
				function (selection, ctx) {
					var oView = this.getView();
					for (var index in selection) {
						
						console.log("Selection text: " + selection[index].getText());
						console.log("Selection key: " + selection[index].getKey());
					}     

				},
				function (ctx) {
					console.log("cancel");
				}, this);
		},

		onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		}
	});
});