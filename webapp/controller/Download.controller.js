sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/BusyDialog",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter"
], function (Controller, JSONModel, Filter, FilterOperator, BusyDialog, MessageToast, Sorter) {
	"use strict";
	
	return Controller.extend("gitTest.GitTest.controller.Download", {
		
		onInit: function () {
			
			this._busyDialog = new BusyDialog();
		},
		
		onGoDownloadAll: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DownloadAll");
		},
		
		onGoPerPersonDownload: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DownloadPerPerson");
		},
		
		onGoPerPersonalDownload: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DownloadPerPersonal");
		},
		
		onGoEmpJobRelationshipsDownload: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DownloadEmpJobRelationships");
		},
		
		onNavBack: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		}
	});
});