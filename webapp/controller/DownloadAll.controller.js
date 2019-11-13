sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/BusyDialog",
	"sap/m/MessageToast",
	"sap/ui/model/Sorter",
	"sap/m/Token"
], function (Controller, JSONModel, Filter, FilterOperator, BusyDialog, MessageToast, Sorter, Token) {
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
			if (this.getView().byId("EmpJob").getSelected()) {
				entityArray.push("EmpJob");
			}
			if (this.getView().byId("EmpCompensation").getSelected()) {
				entityArray.push("EmpCompensation");
			}
			if (this.getView().byId("SelfReport").getSelected()) {
				entityArray.push("SelfReport");
			}
			var entityArrayString = entityArray.join(",");
			alert("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" +
				userArrayString + "&entity=" + entityArrayString);
			window.open("https://sapserverz3pthbmpqp.ap1.hana.ondemand.com/retire-demo/download?loginUser=" + loginUser + "&userArray=" +
				userArrayString + "&entity=" + entityArrayString, "_self");

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

		openText: function () {

			var inputXmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n  <startup tenantid=\"48903fd1-c7f2-42ec-8d10-c8199c1fec2d\">\n    <application sysid=\"3adfd3a4-718f-4b9c-ac93-72efbcdf17f1\">\n      <property name=\"module_name\" type=\"Ws\">User</property>\n      <property name=\"saas_user\">1700010</property>\n    </application>\n    <processing>\n      <template type=\"Name\">ECPY UserProfileInfo</template>\n      <modus>local</modus>\n      <editor>true</editor>\n      <role>HR</role>\n    </processing>\n    <standarddata>\n        <data>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00001</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０１</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０１</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.1</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00002</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０２</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０２</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.2</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00003</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０３</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０３</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.3</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00004</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０４</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０４</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.4</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00005</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０６</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０６</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.6</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00006</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０７</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０７</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.7</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00007</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０８</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０８</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.8</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00008</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト０９</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子０９</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.9</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00009</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト１０</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子１０</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.10</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00010</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト１１</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子１１</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.11</property>\n          </object>\n          <object name=\"ECPY User Profile Information\" boid=\"a342770d-f67d-433b-aefb-62ee4e0b2bdb\">\n            <property name=\"Userid\" propid=\"c9db430b-ee3c-4b93-b2de-adb028363935\">ECPY00011</property>\n            <property name=\"Last Name\" propid=\"7583eb07-c650-49a7-bc4c-07b96d0fe1d3\">テスト１２</property>\n            <property name=\"First Name\" propid=\"894eb335-6235-427a-94cf-9a5057a4de83\">花子１２</property>\n            <property name=\"DateOfBirth\" propid=\"99319667-52c3-4926-bac7-1fb3c7351efa\">1980.1.12</property>\n          </object>\n        </data>\n    </standarddata>\n  </startup>\n"
			this._sendformPost(inputXmlStr);
			inputXmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n  <startup tenantid=\"48903fd1-c7f2-42ec-8d10-c8199c1fec2d\">\n    <application sysid=\"3adfd3a4-718f-4b9c-ac93-72efbcdf17f1\">\n      <property name=\"module_name\" type=\"Ws\">User</property>\n      <property name=\"saas_user\">1700010</property>\n    </application>\n    <processing>\n      <template type=\"Name\">UserProfile-2</template>\n      <modus>local</modus>\n      <editor>true</editor>\n      <role>HR</role>\n    </processing>\n    <query type=\"value\">\n      <input>\n        <value column=\"userId\">itpw1-a050bl</value>\n      </input>\n    </query>\n    <standarddata>\n        <data>\n          <object name=\"System\" boid=\"317ec1cb-f8af-48dc-8ac0-523868b52ae6\">\n            <property name=\"closestStation\" propid=\"f9a9eb05-9fa4-4f40-aef8-c943ef5f483e\">東京都丸の内線池袋駅</property>\n            <property name=\"minsOfCommute\" propid=\"f86c2703-4a0f-442d-a3cc-b57a7eee37f0\">75</property>\n            <property name=\"Number1\" propid=\"033c90d6-c58c-4aea-832d-81a679592086\">3.3455</property>\n            <property name=\"Number2\" propid=\"da21e38e-0efa-40d7-b148-48e8383fe17e\">12600</property>\n            <property name=\"Number3\" propid=\"2c179c68-ded1-4f85-9ad5-37b213b9cee4\">-3</property>\n          </object>\n\n<object uniqueid=\"86ff1157-39e5-48d0-ba5e-b7fd3ecbcf47\" name=\"SFSF Education Background\" boid=\"1e65c2dd-30f1-4150-8782-7bf6509906ab\">\n<property name=\"Major\" propid=\"68c1c9a2-84c7-4174-89de-7527bf9c0c87\">中国文化</property>\n<property name=\"School\" propid=\"2c31ac15-f84a-4351-b668-bafe38ec8ed5\">中央大学</property>\n</object>\n\n<object uniqueid=\"18cc9319-4347-4528-a520-b081cb081251\" name=\"SFSF Education Background\" boid=\"1e65c2dd-30f1-4150-8782-7bf6509906ab\">\n<property name=\"Major\" propid=\"68c1c9a2-84c7-4174-89de-7527bf9c0c87\">Computer</property>\n<property name=\"School\" propid=\"2c31ac15-f84a-4351-b668-bafe38ec8ed5\">東京大学</property>\n</object>\n<object name=\"SFSF Education Background\" boid=\"1e65c2dd-30f1-4150-8782-7bf6509906ab\">\n<property name=\"Major\" propid=\"68c1c9a2-84c7-4174-89de-7527bf9c0c87\">Computer</property>\n<property name=\"School\" propid=\"2c31ac15-f84a-4351-b668-bafe38ec8ed5\">東京工業大学</property>\n</object>\n<object name=\"SFSF Education Background\" boid=\"1e65c2dd-30f1-4150-8782-7bf6509906ab\">\n<property name=\"Major\" propid=\"68c1c9a2-84c7-4174-89de-7527bf9c0c87\">Computer</property>\n<property name=\"School\" propid=\"2c31ac15-f84a-4351-b668-bafe38ec8ed5\">京都大学</property>\n</object>\n<object name=\"SFSF Education Background\" boid=\"1e65c2dd-30f1-4150-8782-7bf6509906ab\">\n<property name=\"Major\" propid=\"68c1c9a2-84c7-4174-89de-7527bf9c0c87\">Computer</property>\n<property name=\"School\" propid=\"2c31ac15-f84a-4351-b668-bafe38ec8ed5\">京都工業大学</property>\n</object>\n<object name=\"SFSF Education Background\" boid=\"1e65c2dd-30f1-4150-8782-7bf6509906ab\">\n<property name=\"Major\" propid=\"68c1c9a2-84c7-4174-89de-7527bf9c0c87\">Computer</property>\n<property name=\"School\" propid=\"2c31ac15-f84a-4351-b668-bafe38ec8ed5\">慶応義塾大学</property>\n</object>\n\n        </data>\n    </standarddata>\n  </startup>";
			this._sendformPost(inputXmlStr);
		},
		
		_sendformPost: function (inpputXmlStr) {

			var mapForm;
			var mapInput;
			
			mapForm = document.createElement("form");
			mapForm.target = "_blank";
			mapForm.method = "POST"; // or "post" if appropriate
			mapForm.action = "https://cctest.sf51.cloud.opentext.com/c4ApplicationServer/servlet/webclientstartup?webmode=web_correspondence_standard";
			mapInput = document.createElement("input");
			mapInput.type = "hidden";
			mapInput.name = "comrequest";
			mapInput.value = inpputXmlStr;
			mapForm.appendChild(mapInput);
			document.body.appendChild(mapForm);
			//window.open("123", MapName, "status=0,title=0,height=600,width=800,scrollbars=1");
			mapForm.submit();
		},

		onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Download");
		}
	});
});