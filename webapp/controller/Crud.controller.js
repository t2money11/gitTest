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

	var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
		pattern: "yyyy/MM/dd"
	});
	var dateTimeFormat = sap.ui.core.format.DateFormat.getDateInstance({
		pattern: "yyyy/MM/dd HH:mm:ss"
	});

	return Controller.extend("gitTest.GitTest.controller.Crud", {

		/**
		 * ローカルのタイムゾーンをUTCに変換し、時間の時は元のままで保留する
		 */
		convertLocalDateToUTCDate: function (date) {
			return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
		},

		/**
		 * 日付フォーマット
		 */
		safeDateFormat: function (date) {
			if (date) {
				return dateFormat.format(date);
			}
			return "";
		},

		/**
		 * 時間フォーマット
		 */
		safeDateTimeFormat: function (dateTime) {
			if (dateTime) {
				return dateTimeFormat.format(dateTime);
			}
			return "";
		},

		onInit: function () {

			this._busyDialog = new BusyDialog();
		},

		onUserInfoCreate: function () {
			this.getOwnerComponent().getCreateUpdateUserInfo().setController(this);
			this.getOwnerComponent().openCreateUpdateUserInfo();
		},

		onUserInfoRefresh: function () {

			var _this = this;
			_this._busyDialog.open();

			var dataModel = _this.getOwnerComponent().getModel("TEST_SCHEMA");
			dataModel.read(
				"/USERINFO", {
					success: function (data) {
						var results = data.results;
						_this.getOwnerComponent().setModel(new JSONModel(results), "USERINFO");
						_this._busyDialog.close();
					},
					error: function (e) {
						_this._busyDialog.close();
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},

		//削除一件/複数件
		onUserInfoDelete: function () {

			var _this = this;

			var listTable = _this.getView().byId("UserInfo");
			var selectedIndexList = listTable.getSelectedIndices();
			if (selectedIndexList.length === 0) {
				MessageToast.show("削除対象はありません。");
				return;
			}

			var deleteModelList = [];
			for (var index in selectedIndexList) {
				var deleteModel = {};
				deleteModel.ID = listTable.getCellControl(selectedIndexList[index], 0, false).getValue();
				deleteModelList.push(deleteModel);
			}

			_this._busyDialog.open();

			_this._DeleteUserInfoBatch(deleteModelList);
		},

		//delete batch
		_DeleteUserInfoBatch: function (deleteModelList) {

			var _this = this;
			var dataModel = _this.getOwnerComponent().getModel("TEST_SCHEMA");
			dataModel.setUseBatch(true);
			dataModel.setDeferredGroups(["updateGroup"]);
			var executeBatchFlag = false;

			if (deleteModelList && deleteModelList.length > 0) {
				executeBatchFlag = true;
				for (var index in deleteModelList) {
					dataModel.remove(
						"/USERINFO(ID='" + deleteModelList[index].ID + "')", {
							groupId: "updateGroup",
							success: function (data) {
								_this._busyDialog.close();
								debugger;
								console.log("deleteDataModelS");
								_this.onUserInfoRefresh();
							},
							error: function (e) {
								_this._busyDialog.close();
								debugger;
								console.log("deleteDataModelF");
							}
						}
					);
				}
			}

			if (executeBatchFlag) {
				dataModel.attachBatchRequestCompleted(function (e) {
					debugger;
					dataModel.setUseBatch(false);
					_this.onUserInfoRefresh();
				});
				dataModel.attachBatchRequestFailed(function (e) {
					debugger;
					dataModel.setUseBatch(false);
					_this._busyDialog.close();

					MessageToast.show("バッチ更新処理は失敗しました: " + e.message);
				});
				dataModel.submitChanges({
					groupId: "updateGroup"
				});
			} else {
				dataModel.setUseBatch(false);
				_this._busyDialog.close();

				MessageToast.show("削除対象はありません。");
			}
		},

		//更新複数件(no rollback)
		onUserInfoUpdateMultiNoRollback: function () {

			var _this = this;

			var listTable = _this.getView().byId("UserInfo");
			var selectedIndexList = listTable.getSelectedIndices();
			if (selectedIndexList.length <= 1) {
				MessageToast.show("更新対象複数件を選択してください。");
				return;
			}

			var dataModel = _this.getOwnerComponent().getModel("TEST_SCHEMA");
			dataModel.setUseBatch(true);
			dataModel.setDeferredGroups(["group1"]);
			for (var index in selectedIndexList) {
				var entry = {};
				entry.ID = listTable.getCellControl(selectedIndexList[index], 0, false).getValue();
				entry.Name = listTable.getCellControl(selectedIndexList[index], 1, false).getValue();
				entry.Location = listTable.getCellControl(selectedIndexList[index], 2, false).getValue();
				var success = function (arg1) {
					return function (evt) {
						_this._busyDialog.close();
						console.log("success id: " + arg1 + "");
					}
				};
				var error = function (arg1) {
					return function (evt) {
						_this._busyDialog.close();
						console.log("error id: " + arg1 + ", message" + evt.message);
					}
				};
				dataModel.update("/USERINFO(ID='" + entry.ID + "')", entry, {
					method: "PUT",
					changeSetId: "changeset1",
					groupId: "group1",
					success: success(entry.ID),
					error: error(entry.ID)
				});
			}
			var mParameter = {

				groupId: "group1",
				success: function (innerdata) {
					//This success handler will only be called if batch support is enabled. 
					//If multiple batch groups are submitted the handlers will be called for every batch group.
					console.log("mParameterS");
				},
				error: function (oError) {
					console.log("mParameterF");
				}
			};
			dataModel.attachBatchRequestCompleted(function (e) {
				debugger;
				dataModel.setUseBatch(false);
				_this.onUserInfoRefresh();
			});
			dataModel.attachBatchRequestFailed(function (e) {
				debugger;
				dataModel.setUseBatch(false);
				_this._busyDialog.close();

				MessageToast.show("バッチ更新処理は失敗しました: " + e.message);
			});
			dataModel.submitChanges(mParameter);
		},

		//更新複数件(rollback)
		onUserInfoUpdateMultiRollback: function () {

			var _this = this;

			var listTable = _this.getView().byId("UserInfo");
			var selectedIndexList = listTable.getSelectedIndices();
			if (selectedIndexList.length <= 1) {
				MessageToast.show("更新対象複数件を選択してください。");
				return;
			}

			var dataModel = _this.getOwnerComponent().getModel("TEST_SCHEMA");
			dataModel.setUseBatch(true);
			var aDeferredGroups = dataModel.getDeferredGroups();
			aDeferredGroups = aDeferredGroups.concat(["group1"]);
			dataModel.setDeferredGroups(aDeferredGroups);
			var success = function (arg1) {
				return function (oContent, evt) {
					_this._busyDialog.close();
					console.log("success id: " + arg1 + "");
				}
			};
			var error = function (arg1) {
				return function (evt) {
					_this._busyDialog.close();
					console.log("error id: " + arg1 + ", message: " + evt.message);
				}
			};
			for (var index in selectedIndexList) {
				var entry = {};
				entry.ID = listTable.getCellControl(selectedIndexList[index], 0, false).getValue();
				entry.Name = listTable.getCellControl(selectedIndexList[index], 1, false).getValue();
				entry.Location = listTable.getCellControl(selectedIndexList[index], 2, false).getValue();
				
				var entry1 = {};
				entry1.ID = listTable.getCellControl(selectedIndexList[index], 0, false).getValue();
				entry1.Name = listTable.getCellControl(selectedIndexList[index], 1, false).getValue();
				
				dataModel.update("/EMPINFO(ID='" + entry.ID + "')", entry1, {
					method: "PUT",
					changeSetId: "changeset1",
					groupId: "group1",
					success: success(entry1.ID),
					error: error(entry1.ID)
				});
				dataModel.update("/USERINFO(ID='" + entry.ID + "')", entry, {
					method: "PUT",
					changeSetId: "changeset1",
					groupId: "group1",
					success: success(entry.ID),
					error: error(entry.ID)
				});
			}
			var mParameter = {
				groupId: "group1",
				success: function (odata, resp) {
					//This success handler will only be called if batch support is enabled. 
					//If multiple batch groups are submitted the handlers will be called for every batch group.
					console.log("mParameterS");
				},
				error: function (odata, resp) {
					console.log("mParameterF");
				}
			};
			var successFunc = function (arg1) {
				debugger;
				_this.onUserInfoRefresh();
				console.log("s");
			}
			var errorFunc = function (arg1) {
				debugger;
				_this.onUserInfoRefresh();
				console.log("f");
			}
			debugger;
			//dataModel.attachBatchRequestCompleted(successFunc);
			//dataModel.attachBatchRequestFailed(errorFunc);
			dataModel.submitChanges({aDeferredGroups, success: successFunc, error: errorFunc});
			
			
			_this._busyDialog.close();
		},
		
		//更新一件
		onUserInfoUpdate: function () {

			var _this = this;

			var listTable = _this.getView().byId("UserInfo");
			var selectedIndexList = listTable.getSelectedIndices();
			if (selectedIndexList.length !== 1) {
				MessageToast.show("更新対象一件を選択してください。");
				return;
			}

			var dataModel = _this.getOwnerComponent().getModel("TEST_SCHEMA");
			dataModel.setUseBatch(false);
			var entry = {};
			entry.ID = listTable.getCellControl(selectedIndexList[0], 0, false).getValue();
			entry.Name = listTable.getCellControl(selectedIndexList[0], 1, false).getValue();
			entry.Location = listTable.getCellControl(selectedIndexList[0], 2, false).getValue();
			_this._busyDialog.open();

			var success = function (arg1) {
				return function (evt) {
					_this._busyDialog.close();
				};
			};
			dataModel.update("/USERINFO(ID='" + entry.ID + "')", entry, {
				method: "PUT",
				success: success(entry.ID),
				error: function (e) {
					_this._busyDialog.close();
					MessageToast.show("更新失敗。");
				}
			});
		},

		//マージ一件
		onUserInfoMerge: function () {

			var _this = this;

			var listTable = _this.getView().byId("UserInfo");
			var selectedIndexList = listTable.getSelectedIndices();
			if (selectedIndexList.length !== 1) {
				MessageToast.show("マージ対象一件を選択してください。");
				return;
			}

			var dataModel = _this.getOwnerComponent().getModel("TEST_SCHEMA");
			dataModel.setUseBatch(false);
			var entry = {};
			var id = listTable.getCellControl(selectedIndexList[0], 0, false).getValue();
			var name = listTable.getCellControl(selectedIndexList[0], 1, false).getValue();
			var location = listTable.getCellControl(selectedIndexList[0], 2, false).getValue();
			if (id) {
				entry.ID = id;
			}
			if (name) {
				entry.Name = name;
			}
			if (location) {
				entry.Location = location;
			}
			_this._busyDialog.open();
			dataModel.update("/USERINFO(ID='" + entry.ID + "')", entry, {
				method: "Merge",
				success: function (data) {
					_this._busyDialog.close();
					MessageToast.show("マージ成功。");
					_this.onUserInfoRefresh();
				},
				error: function (e) {
					_this._busyDialog.close();
					MessageToast.show("マージ失敗。");
				}
			});
		},

		onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		}
	});
});