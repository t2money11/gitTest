sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"gitTest/GitTest/model/models",
	"./controller/CreateUpdateUserInfo"
], function (UIComponent, Device, models, CreateUpdateUserInfo) {
	"use strict";

	return UIComponent.extend("gitTest.GitTest.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createLoginUserInfoModel(), "loginUser");
			
			this._createUpdateUserInfo = new CreateUpdateUserInfo(this.getRootControl());
		},
		
		exit : function() {
			this._createUpdateUserInfo.destroy();
			delete this._createUpdateUserInfo;
		},
		
		getCreateUpdateUserInfo : function () {
			return this._createUpdateUserInfo;
		},

		openCreateUpdateUserInfo : function () {
			this._createUpdateUserInfo.open();
		}
	});
});