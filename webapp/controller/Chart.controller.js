sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("gitTest.GitTest.controller.Chart", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gitTest.GitTest.view.Detail
		 */
		onInit: function () {
			this._setChartModel1();
			this._setChartModel2();
		},

		_setChartModel1: function () {

			var aData = [{
				key: "1",
				value: 94
			}, {
				key: "2",
				value: 89
			}, {
				key: "3",
				value: 73
			}, {
				key: "4",
				value: 85
			}, {
				key: "5",
				value: 83
			}, {
				key: "6",
				value: 73
			}, {
				key: "7",
				value: 80
			}, {
				key: "8",
				value: 69
			}, {
				key: "9",
				value: 81
			}, {
				key: "10",
				value: 78
			}, {
				key: "11",
				value: 78
			}, {
				key: "12",
				value: 78
			}, {
				key: "13",
				value: 81
			}, {
				key: "14",
				value: 74
			}, {
				key: "15",
				value: 82
			}];
			
			for(var i = 0; i < aData.length; i++) {
				this.getView().byId("f" + (i + 1)).setValue(aData[i].value);
			}
			
			var chartModel1 = new sap.ui.model.json.JSONModel();
			chartModel1.setData(aData);
			this.getView().setModel(chartModel1, "chartModel1");
		},
		
		_setChartModel2: function () {

			var aData = [{
				key: "1",
				value: 92
			}, {
				key: "2",
				value: 81
			}, {
				key: "3",
				value: 99
			}, {
				key: "4",
				value: 87
			}, {
				key: "5",
				value: 95
			}, {
				key: "6",
				value: 99
			}, {
				key: "7",
				value: 93
			}, {
				key: "8",
				value: 86
			}, {
				key: "9",
				value: 80
			}, {
				key: "10",
				value: 90
			}, {
				key: "11",
				value: 83
			}, {
				key: "12",
				value: 92
			}, {
				key: "13",
				value: 82
			}, {
				key: "14",
				value: 82
			}, {
				key: "15",
				value: 92
			}];
			
			for(var i = 0; i < aData.length; i++) {
				this.getView().byId("b" + (i + 1)).setValue(aData[i].value);
			}
			
			var chartModel1 = new sap.ui.model.json.JSONModel();
			chartModel1.setData(aData);
			this.getView().setModel(chartModel1, "chartModel2");
		},
		
		onChange: function (evt) {
			
			//alert(evt.getSource().getValue());
			//alert(evt.getSource().data("mydata"));
			var dataName = null;
			if(evt.getSource().data("mydata").startsWith("f")){
				dataName = "chartModel1";
			}else{
				dataName = "chartModel2";
			}
			var aData = this.getView().getModel(dataName).getProperty("/");
			var targetData = aData.find((item, index) => {
			    return (item.key === evt.getSource().data("mydata").substring(1))
			});
			targetData.value = evt.getSource().getValue();
			this.getView().getModel(dataName).setProperty("/", null);
			this.getView().getModel(dataName).setProperty("/", aData);
		},

		test: function () {

			var aData1 = this.getView().getModel("chartModel1").getProperty("/");
			for(var i = 0; i < aData1.length; i++) {
				aData1[i].Sales = 80;
			}
			aData1["1"].Sales = 100;
			this.getView().getModel("chartModel1").setProperty("/", null);
			this.getView().getModel("chartModel1").setProperty("/", aData1);
		},
		
		onNavBack: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf gitTest.GitTest.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf gitTest.GitTest.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf gitTest.GitTest.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});