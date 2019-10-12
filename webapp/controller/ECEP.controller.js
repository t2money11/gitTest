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
	
	var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy/MM/dd" });

	return Controller.extend("gitTest.GitTest.controller.ECEP", {
		
		/**
		 * 日付フォーマット
		 */
		safeDateFormat:function(date){
			if(date){
				return dateFormat.format(date);
			}
			return "";
		},
		
		onInit: function () {
			
			this._busyDialog = new BusyDialog();
		},
		
		onPerPersonalRefresh: function () {
			
			var _this = this;
			_this._busyDialog.open();
			
			var filters = [];
			filters.push(new Filter("personIdExternal", FilterOperator.EQ, "5100010"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/PerPersonal", 
				{
					urlParameters : {
						fromDate : "1990-01-01"
					},
					filters: filters,
					sorters : [
						new Sorter("startDate", true)
					],
					success: function(data){
						var results = data.results;
						for(var i = 0; i < results.length; i++){
							results[i].startDate = _this.safeDateFormat(results[i].startDate);
						}
						_this.getOwnerComponent().setModel(new JSONModel(results), "PerPersonalModels");
						_this._busyDialog.close();
					},
					error: function(e) {
						_this._busyDialog.close();
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},
		
		onBackground_Test4ECEPRefresh: function () {
			
			var _this = this;
			_this._busyDialog.open();
			
			var filters = [];
			filters.push(new Filter("userId", FilterOperator.EQ, "5100010"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/Background_Test4ECEP", 
				{
					urlParameters : {
						fromDate : "1990-01-01"
					},
					filters: filters,
					success: function(data){
						var results = data.results;
						_this.getOwnerComponent().setModel(new JSONModel(results), "Background_Test4ECEPModels");
						_this._busyDialog.close();
					},
					error: function(e) {
						_this._busyDialog.close();
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},
		
		clearBackground_Test4ECEP: function(){
			
			var _this = this;
			var filters = [];
			
			_this._busyDialog = new BusyDialog();
			_this._busyDialog.open();
			
			filters = [];
			filters.push(new Filter("userId", FilterOperator.EQ, "5100010"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/Background_Test4ECEP", 
				{
					filters: filters,
					success: function(data){
						_this.addBatchOperation(null, data.results);
					},
					error: function(e) {
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},
		
		historyDataTransferEC2EP: function(){
			
			var _this = this;
			var filters = [];
			var andFilters;
			var andFiltersList = [];
			var orFilters;
			var upsertBackground_Test4ECEPModel;
			var upsertBackground_Test4ECEPModelList = [];
			var fromPerPersonalMode;
			var fromPerPersonalModelList = [];
			
			_this._busyDialog = new BusyDialog();
			_this._busyDialog.open();
			
			filters = [];
			filters.push(new Filter("personIdExternal", FilterOperator.EQ, "5100010"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/PerPersonal", 
				{
					urlParameters : {
						toDate: "2019-10-12"
					},
					filters : filters,
					sorters : [
						new Sorter("startDate", true)
					],
					success: function(data){
						var results = data.results;
						//console.log("*****length: " + results.length);
						if(results.length > 1){
							results = results.slice(1);
							for(var i = 0; i < results.length; i++){
								fromPerPersonalMode = {};
								fromPerPersonalMode.personIdExternal = results[i].personIdExternal;
								fromPerPersonalMode.startDate = _this.safeDateFormat(results[i].startDate);
								fromPerPersonalMode.firstName = results[i].firstName;
								fromPerPersonalMode.lastName = results[i].lastName;
								
								fromPerPersonalModelList.push(fromPerPersonalMode);
							}
						}
						//console.log("*****" + JSON.stringify(fromPerPersonalModelList));
						//get Background_Test4ECEP
						//try filters like (a=1 and b=2) or (a=3 and b=4) or (a=5 and b=6)...
						if(fromPerPersonalModelList.length > 0){
							for(var j = 0; j < fromPerPersonalModelList.length; j++){
								fromPerPersonalMode = fromPerPersonalModelList[j];
								andFilters = new Filter({
									filters : [
										new Filter("userId", FilterOperator.EQ, fromPerPersonalMode.personIdExternal),
										//can add more and condition here
									],
									and: true
								});
								andFiltersList.push(andFilters);
							}
							orFilters = new Filter({
								filters : andFiltersList,
								and: false
							});
							filters = [];
							filters.push(orFilters);
							dataModel.read(
								"/Background_Test4ECEP", 
								{
									filters: filters,
									success: function(data1){
										results = data1.results;
										for(var k = 0; k < fromPerPersonalModelList.length; k++){       
											fromPerPersonalMode = fromPerPersonalModelList[k];
											upsertBackground_Test4ECEPModel = {};
											//if already exists
											for(var l = 0; l < results.length; l++){
												if(results[l].fromTableName == "PerPersonal"
													&& results[l].colValue1 == fromPerPersonalMode.startDate){
													upsertBackground_Test4ECEPModel.backgroundElementId = results[l].backgroundElementId;
													break;
												}
											}
											upsertBackground_Test4ECEPModel.fromTableName = "PerPersonal";
											upsertBackground_Test4ECEPModel.userId = fromPerPersonalMode.personIdExternal;
											upsertBackground_Test4ECEPModel.colName1 = "startDate";
											upsertBackground_Test4ECEPModel.colValue1 = fromPerPersonalMode.startDate;
											upsertBackground_Test4ECEPModel.colName2 = "firstName";
											upsertBackground_Test4ECEPModel.colValue2 = fromPerPersonalMode.firstName;
											upsertBackground_Test4ECEPModel.colName3 = "lastName";
											upsertBackground_Test4ECEPModel.colValue3 = fromPerPersonalMode.lastName;
											// __metadata
											if(upsertBackground_Test4ECEPModel.backgroundElementId){
												upsertBackground_Test4ECEPModel.__metadata = {
													"uri": "Background_Test4ECEP(userId='" + upsertBackground_Test4ECEPModel.userId + "', backgroundElementId=" + upsertBackground_Test4ECEPModel.backgroundElementId + ")",
													"type": "SFOData.Background_Test4ECEP"
												};
											}else{
												upsertBackground_Test4ECEPModel.__metadata = {
													"uri": "Background_Test4ECEP",
													"type": "SFOData.Background_Test4ECEP"
												};
											}
											
											upsertBackground_Test4ECEPModelList.push(upsertBackground_Test4ECEPModel);
										}
										//console.log("length: " + results.length);
										//console.log("####" + JSON.stringify(upsertBackground_Test4ECEPModelList));
										
										//call batch
										_this.addBatchOperation(upsertBackground_Test4ECEPModelList);
									},
									error: function(e1) {
										MessageToast.show("Get Data ERROR: " + e1.message);
									}
								}
							);
						}else{
							
							_this._busyDialog.close();
						}
					},
					error: function(e) {
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},
		
		addBatchOperation: function(upsertBackground_Test4ECEPModelList, deleteBackground_Test4ECEPModelList){
			
			var _this = this;
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.setUseBatch(true);
			dataModel.setDeferredGroups(["updateGroup"]);
			var executeBatchFlag = false;
			if(upsertBackground_Test4ECEPModelList && upsertBackground_Test4ECEPModelList.length > 0){
				executeBatchFlag = true;
				dataModel.create(
					"/Background_Test4ECEP/upsert", upsertBackground_Test4ECEPModelList, 
					{
						groupId:"updateGroup"
					}
				);
			}
			if (deleteBackground_Test4ECEPModelList && deleteBackground_Test4ECEPModelList.length > 0) {
				executeBatchFlag = true;
				for(var index in deleteBackground_Test4ECEPModelList){
					dataModel.remove(
						"/Background_Test4ECEP(userId='" + deleteBackground_Test4ECEPModelList[index].userId + "', backgroundElementId=" + deleteBackground_Test4ECEPModelList[index].backgroundElementId + ")",
						{
							groupId:"updateGroup"
						}
					);
				}
			}
			
			if(executeBatchFlag){
				dataModel.attachBatchRequestCompleted(function(e){
		            dataModel.setUseBatch(false);
		            _this.getView().byId("historyDataTransferEC2EP").setBusy(false);
		            _this.onBackground_Test4ECEPRefresh();
				});
				dataModel.attachBatchRequestFailed(function(e){
					
		            dataModel.setUseBatch(false);
		            _this.getView().byId("historyDataTransferEC2EP").setBusy(false);
		            _this._busyDialog.close();
		            
		            MessageToast.show("バッチ更新処理は失敗しました: " + e.message);
				});
				dataModel.submitChanges({
					groupId: "updateGroup"
			    });
			} else {
				dataModel.setUseBatch(false);
	            _this.getView().byId("historyDataTransferEC2EP").setBusy(false);
	            _this._busyDialog.close();
	            
	            MessageToast.show("更新対象はありません。" );
			}
		},
		
		onNavBack: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		}
	});
});