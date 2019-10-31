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

	return Controller.extend("gitTest.GitTest.controller.DownloadAll", {

		onInit: function () {

			this._busyDialog = new BusyDialog();
			var oMultiInput = this.getView().byId("multiInput");
			oMultiInput.setTokens([
				new Token({
					text: "5100011",
					key: "5100011"
				}),
				new Token({
					text: "5100014",
					key: "5100014"
				}),
				new Token({
					text: "5100015",
					key: "5100015"
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
			loginUser = loginUser + "@SFPART039292" + ":cde3$RFV";
			loginUser = "5100011@SFPART039292:cde3$RFV";
			console.log(loginUser);
			
			var tokens = this.getView().byId("multiInput").getTokens();
			var userArray = [];
			$.each(tokens, function (index, token) {
				userArray.push(token.getText());
			});
			var userArrayString = userArray.join(",");
			
			var entityArray = [];
			if(this.getView().byId("EmpJob").getSelected()){
				entityArray.push("EmpJob");
			}
			if(this.getView().byId("EmpCompensation").getSelected()){
				entityArray.push("EmpCompensation");
			}
			if(this.getView().byId("SelfReport").getSelected()){
				entityArray.push("SelfReport");
			}
			var entityArrayString = entityArray.join(",");
			alert("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=" + entityArrayString);
			window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=" + entityArrayString, "_self");
				
			//var radioButtonGroup = this.getView().byId("radioButtonGroup");
			//var selectedIndex = radioButtonGroup.getSelectedIndex();
		
		/*	switch (selectedIndex) {
			case 0:
				//console.log(loginUser);
				//console.log(userArrayString);
			//	window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=EmpJob", "_blank");
			//	window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=EmpCompensation", "_blank");
				//sap.m.URLHelper.redirect("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=EmpJob", true) 
				//sap.m.URLHelper.redirect("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=EmpCompensation", true) 
				break;
			case 1:
				window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=EmpCompensation", "_self");
				break;
			case 2:
				window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" + userArrayString + "&entity=SelfReport", "_self");
				break;
			default:
			}
			*/
		},

		onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Download");
		}
	});
});