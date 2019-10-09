sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("gitTest.GitTest.controller.ECEP", {
		
		onInit: function () {
			
		},
		
		goBack: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		}
	});
});