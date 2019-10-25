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
	var dateTimeFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy/MM/dd HH:mm:ss" });

	return Controller.extend("gitTest.GitTest.controller.ECEP", {
		
		
		/**
		 * ローカルのタイムゾーンをUTCに変換し、時間の時は元のままで保留する
		 */
		convertLocalDateToUTCDate : function (date) {
			debugger;
		    return new Date(date.getTime()-date.getTimezoneOffset()*60*1000);   
		},
		
		/**
		 * 日付フォーマット
		 */
		safeDateFormat:function(date){
			if(date){
				return dateFormat.format(date);
			}
			return "";
		},
		
		/**
		 * 時間フォーマット
		 */
		safeDateTimeFormat:function(dateTime){
			if(dateTime){
				return dateTimeFormat.format(dateTime);
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
							results[i].lastModifiedDateTime = _this.safeDateTimeFormat(results[i].lastModifiedDateTime);
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
		
		onCust_testMdfWithHistoryRefresh: function () {
			
			var _this = this;
			_this._busyDialog.open();
			
			var filters = [];
			filters.push(new Filter("externalCode", FilterOperator.EQ, "5100010"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/cust_testMdfWithHistory", 
				{
					urlParameters : {
						fromDate : "1990-01-01"
					},
					filters: filters,
					sorters : [
						new Sorter("effectiveStartDate", true)
					],
					success: function(data){
						var results = data.results;
						for(var i = 0; i < results.length; i++){
							results[i].effectiveStartDate = _this.safeDateFormat(results[i].effectiveStartDate);
						}
						_this.getOwnerComponent().setModel(new JSONModel(results), "cust_testMdfWithHistoryModels");
						_this._busyDialog.close();
					},
					error: function(e) {
						_this._busyDialog.close();
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},
		
		onPerPersonRefresh: function () {
			
			var _this = this;
			_this._busyDialog.open();
			
			var filters = [];
			filters.push(new Filter("personIdExternal", FilterOperator.EQ, "5100010"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/PerPerson", 
				{
					filters: filters,
					success: function(data){
						var results = data.results;
						_this.getOwnerComponent().setModel(new JSONModel(results), "PerPersonModels");
						_this._busyDialog.close();
					},
					error: function(e) {
						_this._busyDialog.close();
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
		},
		
		onCust_testTimeRefresh: function () {
			
			var _this = this;
			_this._busyDialog.open();
			
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/cust_testTime", 
				{
					success: function(data){
						var results = data.results;
						for(var i = 0; i < results.length; i++){
							results[i].cust_lastUpdateTime = _this.safeDateTimeFormat(results[i].cust_lastUpdateTime);
						}
						_this.getOwnerComponent().setModel(new JSONModel(results), "cust_testTimeModels");
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
		
		onDeleteBackground_Test4ECEP: function(){
			
			var _this = this;
			
			var listTable = _this.getView().byId("Background_Test4ECEP");
			var selectedIndexList = listTable.getSelectedIndices();
			if(selectedIndexList.length === 0){
				MessageToast.show("no data selected");
				return;
			}
			
			var deleteModelList = []; 
			for(var index in selectedIndexList){
				var deleteModel = {};
				deleteModel.userId = listTable.getCellControl(index, 1, false).getText();
				deleteModel.backgroundElementId = listTable.getCellControl(index, 2, false).getText();
				deleteModelList.push(deleteModel);
			}
			
			_this._busyDialog = new BusyDialog();
			_this._busyDialog.open();
			
			_this.addBatchOperation(null, deleteModelList, null);
		},
		
		historyDataTransferEC2EP1: function(){
			
			var _this = this;
			var filters = [];
			var andFilters;
			var andFiltersList = [];
			var orFilters;
			var upsertBackground_Test4ECEPModel;
			var upsertBackground_Test4ECEPModelList = [];
			var fromPerPersonalModel;
			var fromPerPersonalModellList = [];
			var upsertTestTimeModel = {};
			
			_this._busyDialog = new BusyDialog();
			_this._busyDialog.open();
			
			filters = [];
			filters.push(new Filter("cust_fromTableName", FilterOperator.EQ, "PerPersonal"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/cust_testTime", 
				{
					filters : filters,
					success: function(data0){
						var result = data0.results;
						filters = [];
						
						if(result.length > 0){
							filters.push(new Filter("lastModifiedDateTime", FilterOperator.GT, result[0].cust_lastUpdateTime));
							//filters.push(new Filter("firstName", FilterOperator.EQ, "XXX8"));
							upsertTestTimeModel.externalCode = result[0].externalCode;
						}
						upsertTestTimeModel.cust_fromTableName = "PerPersonal";
						upsertTestTimeModel.cust_lastUpdateTime = new Date();
						// __metadata
						if(upsertTestTimeModel.externalCode){
							upsertTestTimeModel.__metadata = {
								"uri": "cust_testTime(externalCode=" + upsertTestTimeModel.externalCode + ")",
								"type": "SFOData.cust_testTime"
							};
						}else{
							upsertTestTimeModel.__metadata = {
								"uri": "cust_testTime",
								"type": "SFOData.cust_testTime"
							};
						}
						filters.push(new Filter("personIdExternal", FilterOperator.EQ, "5100010"));
						andFilters = new Filter({
							filters : filters,
							and: true
						});
						dataModel.read(
							"/PerPersonal", 
							{
								urlParameters : {
									fromDate: "1900-01-01"
								},
								filters : [andFilters],
								success: function(data){
									debugger;
									var results = data.results;
									//console.log("*****length: " + results.length);
									if(results.length > 0){
										//results = results.slice(1);
										for(var i = 0; i < results.length; i++){
											fromPerPersonalModel = {};
											fromPerPersonalModel.personIdExternal = results[i].personIdExternal;
											fromPerPersonalModel.startDate = _this.safeDateFormat(results[i].startDate);
											fromPerPersonalModel.firstName = results[i].firstName;
											fromPerPersonalModel.lastName = results[i].lastName;
											
											fromPerPersonalModellList.push(fromPerPersonalModel);
										}
									}
									//console.log("*****" + JSON.stringify(fromPerPersonalModellList));
									//get Background_Test4ECEP
									//try filters like (a=1 and b=2) or (a=3 and b=4) or (a=5 and b=6)...
									if(fromPerPersonalModellList.length > 0){
										for(var j = 0; j < fromPerPersonalModellList.length; j++){
											fromPerPersonalModel = fromPerPersonalModellList[j];
											andFilters = new Filter({
												filters : [
													new Filter("userId", FilterOperator.EQ, fromPerPersonalModel.personIdExternal),
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
													for(var k = 0; k < fromPerPersonalModellList.length; k++){       
														fromPerPersonalModel = fromPerPersonalModellList[k];
														upsertBackground_Test4ECEPModel = {};
														//if already exists
														for(var l = 0; l < results.length; l++){
															if(results[l].fromTableName == "PerPersonal"
																&& results[l].colValue1 == fromPerPersonalModel.startDate){
																upsertBackground_Test4ECEPModel.backgroundElementId = results[l].backgroundElementId;
																break;
															}
														}
														upsertBackground_Test4ECEPModel.fromTableName = "PerPersonal";
														upsertBackground_Test4ECEPModel.userId = fromPerPersonalModel.personIdExternal;
														upsertBackground_Test4ECEPModel.colName1 = "startDate";
														upsertBackground_Test4ECEPModel.colValue1 = fromPerPersonalModel.startDate;
														upsertBackground_Test4ECEPModel.colName2 = "firstName";
														upsertBackground_Test4ECEPModel.colValue2 = fromPerPersonalModel.firstName;
														upsertBackground_Test4ECEPModel.colName3 = "lastName";
														upsertBackground_Test4ECEPModel.colValue3 = fromPerPersonalModel.lastName;
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
													_this.addBatchOperation(upsertBackground_Test4ECEPModelList, null, upsertTestTimeModel);
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
					error: function(e) {
						MessageToast.show("Get Data ERROR: " + e.message);
					}
				}
			);
			
			
			
		},
		
		historyDataTransferEC2EP2: function(){
			
			var _this = this;
			var filters = [];
			var andFilters;
			var andFiltersList = [];
			var orFilters;
			var upsertBackground_Test4ECEPModel;
			var upsertBackground_Test4ECEPModelList = [];
			var fromCust_testMdfWithHistoryModel;
			var fromCust_testMdfWithHistoryModellList = [];
			var upsertTestTimeModel = {};
			
			_this._busyDialog = new BusyDialog();
			_this._busyDialog.open();
			
			filters = [];
			filters.push(new Filter("cust_fromTableName", FilterOperator.EQ, "cust_testMdfWithHistory"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/cust_testTime", 
				{
					filters : filters,
					success: function(data0){
						var result = data0.results;
						filters = [];
						if(result.length > 0){
							filters.push(new Filter("lastModifiedDateTime", FilterOperator.GT, result[0].lastModifiedDateTime));
							upsertTestTimeModel.externalCode = result[0].externalCode;
						}
						upsertTestTimeModel.cust_fromTableName = "cust_testMdfWithHistory";
						upsertTestTimeModel.cust_lastUpdateTime = new Date();
						// __metadata
						if(upsertTestTimeModel.externalCode){
							upsertTestTimeModel.__metadata = {
								"uri": "cust_testTime(externalCode=" + upsertTestTimeModel.externalCode + ")",
								"type": "SFOData.cust_testTime"
							};
						}else{
							upsertTestTimeModel.__metadata = {
								"uri": "cust_testTime",
								"type": "SFOData.cust_testTime"
							};
						}
						filters.push(new Filter("externalCode", FilterOperator.EQ, "5100010"));
						dataModel.read(
							"/cust_testMdfWithHistory", 
							{
								urlParameters : {
									fromDate: "1900-01-01"
								},
								filters : filters,
								sorters : [
									new Sorter("effectiveStartDate", true)
								],
								success: function(data){
									var results = data.results;
									//console.log("*****length: " + results.length);
									if(results.length > 0){
										//results = results.slice(1);
										for(var i = 0; i < results.length; i++){
											fromCust_testMdfWithHistoryModel = {};
											fromCust_testMdfWithHistoryModel.externalCode = results[i].externalCode;
											fromCust_testMdfWithHistoryModel.effectiveStartDate = _this.safeDateFormat(results[i].effectiveStartDate);
											fromCust_testMdfWithHistoryModel.externalName = results[i].externalName;
											
											fromCust_testMdfWithHistoryModellList.push(fromCust_testMdfWithHistoryModel);
										}
									}
									//get Background_Test4ECEP
									//try filters like (a=1 and b=2) or (a=3 and b=4) or (a=5 and b=6)...
									if(fromCust_testMdfWithHistoryModellList.length > 0){
										for(var j = 0; j < fromCust_testMdfWithHistoryModellList.length; j++){
											fromCust_testMdfWithHistoryModel = fromCust_testMdfWithHistoryModellList[j];
											andFilters = new Filter({
												filters : [
													new Filter("userId", FilterOperator.EQ, fromCust_testMdfWithHistoryModel.externalCode),
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
													for(var k = 0; k < fromCust_testMdfWithHistoryModellList.length; k++){       
														fromCust_testMdfWithHistoryModel = fromCust_testMdfWithHistoryModellList[k];
														upsertBackground_Test4ECEPModel = {};
														//if already exists
														for(var l = 0; l < results.length; l++){
															if(results[l].fromTableName == "cust_testMdfWithHistory"
																&& results[l].colValue1 == fromCust_testMdfWithHistoryModel.effectiveStartDate){
																upsertBackground_Test4ECEPModel.backgroundElementId = results[l].backgroundElementId;
																break;
															}
														}
														upsertBackground_Test4ECEPModel.fromTableName = "cust_testMdfWithHistory";
														upsertBackground_Test4ECEPModel.userId = fromCust_testMdfWithHistoryModel.externalCode;
														upsertBackground_Test4ECEPModel.colName1 = "effectiveStartDate";
														upsertBackground_Test4ECEPModel.colValue1 = fromCust_testMdfWithHistoryModel.effectiveStartDate;
															upsertBackground_Test4ECEPModel.colName2 = "externalName";
														if(fromCust_testMdfWithHistoryModel.externalName !== null){
															upsertBackground_Test4ECEPModel.colValue2 = fromCust_testMdfWithHistoryModel.externalName;
														}
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
													_this.addBatchOperation(upsertBackground_Test4ECEPModelList, null, upsertTestTimeModel);
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
					}
				}
			);
		},
		
		historyDataTransferEC2EP3: function(){
			
			var _this = this;
			var filters = [];
			var andFilters;
			var andFiltersList = [];
			var orFilters;
			var upsertBackground_Test4ECEPModel;
			var upsertBackground_Test4ECEPModelList = [];
			var fromPerPersonModel;
			var fromPerPersonModellList = [];
			var upsertTestTimeModel = {};
			
			_this._busyDialog = new BusyDialog();
			_this._busyDialog.open();
			
			filters = [];
			filters.push(new Filter("cust_fromTableName", FilterOperator.EQ, "PerPerson"));
			var dataModel = _this.getOwnerComponent().getModel("SF_DS");
			dataModel.read(
				"/cust_testTime", 
				{
					filters : filters,
					success: function(data0){
						var result = data0.results;
						filters = [];
						if(result.length > 0){
							filters.push(new Filter("lastModifiedDateTime", FilterOperator.GT, result[0].lastModifiedDateTime));
							upsertTestTimeModel.externalCode = result[0].externalCode;
						}
						upsertTestTimeModel.cust_fromTableName = "PerPerson";
						upsertTestTimeModel.cust_lastUpdateTime = new Date();
						// __metadata
						if(upsertTestTimeModel.externalCode){
							upsertTestTimeModel.__metadata = {
								"uri": "cust_testTime(externalCode=" + upsertTestTimeModel.externalCode + ")",
								"type": "SFOData.cust_testTime"
							};
						}else{
							upsertTestTimeModel.__metadata = {
								"uri": "cust_testTime",
								"type": "SFOData.cust_testTime"
							};
						}
						debugger;
						filters.push(new Filter("personIdExternal", FilterOperator.EQ, "5100010"));
						dataModel.read(
							"/PerPerson", 
							{
								filters : filters,
								success: function(data){
									var results = data.results;
									//console.log("*****length: " + results.length);
									if(results.length > 0){
										//results = results.slice(1);
										for(var i = 0; i < results.length; i++){
											fromPerPersonModel = {};
											fromPerPersonModel.personIdExternal = results[i].personIdExternal;
											fromPerPersonModel.countryOfBirth = results[i].countryOfBirth;
											fromPerPersonModel.placeOfBirth = results[i].placeOfBirth;
											
											fromPerPersonModellList.push(fromPerPersonModel);
										}
									}
									//console.log("*****" + JSON.stringify(fromPerPersonModellList));
									//get Background_Test4ECEP
									//try filters like (a=1 and b=2) or (a=3 and b=4) or (a=5 and b=6)...
									if(fromPerPersonModellList.length > 0){
										for(var j = 0; j < fromPerPersonModellList.length; j++){
											fromPerPersonModel = fromPerPersonModellList[j];
											andFilters = new Filter({
												filters : [
													new Filter("userId", FilterOperator.EQ, fromPerPersonModel.personIdExternal)
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
													for(var k = 0; k < fromPerPersonModellList.length; k++){       
														fromPerPersonModel = fromPerPersonModellList[k];
														upsertBackground_Test4ECEPModel = {};
														//if already exists
														for(var l = 0; l < results.length; l++){
															if(results[l].fromTableName == "PerPerson"){
																upsertBackground_Test4ECEPModel.backgroundElementId = results[l].backgroundElementId;
																break;
															}
														}
														upsertBackground_Test4ECEPModel.fromTableName = "PerPerson";
														upsertBackground_Test4ECEPModel.userId = fromPerPersonModel.personIdExternal;
														upsertBackground_Test4ECEPModel.colName1 = "countryOfBirth";
														if(fromPerPersonModel.countryOfBirth !== null){
															upsertBackground_Test4ECEPModel.colValue1 = fromPerPersonModel.countryOfBirth;
														}
														upsertBackground_Test4ECEPModel.colName2 = "placeOfBirth";
														if(fromPerPersonModel.placeOfBirth !== null){
															upsertBackground_Test4ECEPModel.colValue2 = fromPerPersonModel.placeOfBirth;
														}
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
													_this.addBatchOperation(upsertBackground_Test4ECEPModelList, null, upsertTestTimeModel);
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
					}
				}
			);
		},
		
		addBatchOperation: function(upsertBackground_Test4ECEPModelList, deleteBackground_Test4ECEPModelList, upsertTestTimeModel){
			
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
			if(upsertTestTimeModel !== null){
				executeBatchFlag = true;
				dataModel.create(
					"/cust_testTime/upsert", upsertTestTimeModel, 
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
		            //_this.getView().byId("historyDataTransferEC2EP").setBusy(false);
		            _this.onBackground_Test4ECEPRefresh();
				});
				dataModel.attachBatchRequestFailed(function(e){
					
		            dataModel.setUseBatch(false);
		            //_this.getView().byId("historyDataTransferEC2EP").setBusy(false);
		            _this._busyDialog.close();
		            
		            MessageToast.show("バッチ更新処理は失敗しました: " + e.message);
				});
				dataModel.submitChanges({
					groupId: "updateGroup"
			    });
			} else {
				dataModel.setUseBatch(false);
	            //_this.getView().byId("historyDataTransferEC2EP").setBusy(false);
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