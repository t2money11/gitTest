sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("gitTest.GitTest.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gitTest.GitTest.view.SearchData
		 */
		onInit: function () {
		},

		goChart: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Chart");
		},
		
		goECEP: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ECEP");
		},
		
		goDownload: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Download");
		},

		onHover: function () {
			MessageBox.show("Hovered!", {
				icon: MessageBox.Icon.INFORMATION,
				title: "My message box title",
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) { }
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf gitTest.GitTest.view.SearchData
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf gitTest.GitTest.view.SearchData
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf gitTest.GitTest.view.SearchData
		 */
		//	onExit: function() {
		//
		//	}

	});

});