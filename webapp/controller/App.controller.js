sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("gitTest.GitTest.controller.App", {
		onInit: function () {
			
			var searchData = new sap.ui.view({
				id: "searchData",
				type: sap.ui.core.mvc.ViewType.XML,
				viewName: "gitTest.GitTest.view.SearchData"
			});
			
			var detail = new sap.ui.view({
				id: "detail",
				type: sap.ui.core.mvc.ViewType.XML,
				viewName: "gitTest.GitTest.view.Detail"
			});
			
			this.getView().byId("app").addPage(searchData);
			this.getView().byId("app").addPage(detail);
		}
	});
});