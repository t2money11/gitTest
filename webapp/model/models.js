sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createLoginUserInfoModel: function() {
			var userModel = new JSONModel();
			userModel.loadData("/services/userapi/currentUser", null, false);
			return userModel;
		},
		createLoginUserInfoModel2: function() {
			var userModel = new JSONModel();
			userModel.loadData("/services/userapi/attributes",{"multiValuesAsArrays":true}, false);
			return userModel;
		}
	};
});