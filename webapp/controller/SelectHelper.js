sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/comp/filterbar/FilterBar",
	"sap/ui/model/json/JSONModel"
], function (Object, ValueHelpDialog, Filter, FilterOperator, FilterBar, JSONModel) {
	"use strict";

	return Object.extend("gitTest.GitTest.controllers.SelectHelper", {
		//[0]:token key, [1]:token text
		aKeys: [],
		//input component
		theTokenInput: null,
		//temp token
		aTokens: [],
		//table column
		cols: [],
		config: null,
		fields: [],
		oColModel: new JSONModel(),
		model: null,
		filter: [],
		binding: null,
		title: "",
		search: "",
		_oValueHelpDialog: null,
		constructor: function (model, inputField, config, title) {
			this.model = model; //$.extend({}, model);
			this.theTokenInput = inputField;
			this.config = config;
			this.title = title;
		},

		openValueHelp: function (binding, onOk, onCancel, scope) {
			var me = this;

			//uri
			me.binding = binding;
			//return tokens
			me.aKeys = [];
			//table column
			me.cols = [];
			//rangeKeyFields
			me.fields = [];
			//filter field
			me.filter = [];

			//set temp token from input component
			me.aTokens = me.theTokenInput.getTokens();

			$.each(this.config, function (key, value) {

				//set key and text of return tokens 
				if (value.iskey && value.iskey === true) {
					me.aKeys.push(value.key);
				}

				//set table column(label, template, oType, width)
				var col = {};
				col.label = value.label;
				col.template = value.key; //new sap.m.Text();
				if (value.format === "Date") {
					col.oType = new sap.ui.model.type.Date(); //{source: {pattern: "yyyyMMdd"},pattern: "dd-MM-YYYY"}
				}
				if (value.width) {
					col.width = value.width;
				}
				me.cols.push(col);

				//set rangeKeyFields				
				me.fields.push({
					label: value.label,
					key: value.key
				});

				//set filter field
				if (value.searchable) {
					me.filter.push(new sap.ui.comp.filterbar.FilterGroupItem({
						groupTitle: "Group",
						groupName: "gn1",
						name: value.key,
						label: value.label,
						control: new sap.m.Input(value.key)
					}));
				}
			});

			me._oValueHelpDialog = new ValueHelpDialog({
				id: "valueHelpDialog",
				basicSearchText: me.theTokenInput.getValue(),
				title: me.title,
				supportMultiselect: true,
				supportRanges: true,
				supportRangesOnly: false,
				key: me.aKeys[1],
				descriptionKey: me.aKeys[0],
				ok: function (oControlEvent) {
					me.aTokens = oControlEvent.getParameter("tokens");
					me.theTokenInput.setTokens(me.aTokens);
					me._oValueHelpDialog.close();
					onOk.call(scope || this, me.aTokens, scope);
				},
				cancel: function (oControlEvent) {
					me._oValueHelpDialog.close();
					onCancel.call(scope || this, scope);
				},
				afterClose: function () {
					me._oValueHelpDialog.destroy();
				}
			});

			me.oColModel.setData({
				cols: this.cols
			});

			me._oValueHelpDialog.getTableAsync().then(function (oTable) {
				oTable.setModel(me.model);
				oTable.setModel(me.oColModel, "columns");
			});

			me._oValueHelpDialog.setRangeKeyFields(me.fields);
			me._oValueHelpDialog.setTokens(me.aTokens);
			var oFilterBar = new FilterBar({
				id: "filterBar",
				advancedMode: true,
				filterGroupItems: [me.filter],
				search: function (search) {

					var hasValue = false;
					var tfilters = [];

					//searchField condition
					var filters = [];
					$.each(arguments[0].getParameter("selectionSet"), function (key, value) {
						if (value.getValue()) {
							filters.push(new Filter(value.getId(), FilterOperator.Contains, value.getValue()));
							hasValue = true;
						}
					});
					var andFilters = new Filter({
						filters: filters,
						and: true
					});
					tfilters.push(andFilters);

					//basicSearchField condition
					if (this._oBasicSearchField) {

						var searchValue = this._oBasicSearchField.getValue();
						filters = [];
						$.each(arguments[0].getParameter("selectionSet"), function (key, value) {
							if (searchValue) {
								filters.push(new Filter(value.getId(), FilterOperator.Contains, searchValue));
								hasValue = true;
							}
						});
						var orFilters = new Filter({
							filters: filters,
							and: false
						});

						tfilters.push(orFilters);
					}

					var finalFilters;
					if (hasValue) {
						finalFilters = new Filter({
							filters: tfilters,
							and: true
						});
					}
					me._oValueHelpDialog.getTableAsync().then(function (oTable) {
						try {
							oTable.setBusy(true);
							oTable.bindRows({
								path: me.binding,
								filters: finalFilters
							});
							oTable.getBinding("rows").attachDataReceived(function () {
								oTable.setBusy(false);
							})
							//me._oValueHelpDialog.update();
						} catch (e) {

							oTable.setBusy(false);
						}
					});
				}
			});
			/*oFilterBar.setBasicSearch(new sap.m.SearchField({
				id: "s1",
				showSearchButton: false,
				placeholder: "Search test"
			}));*/
			me._oValueHelpDialog.setFilterBar(oFilterBar);

			if (me.theTokenInput.$().closest(".sapUiSizeCompact").length > 0) { // check if the Token field runs in Compact mode
				me._oValueHelpDialog.addStyleClass("sapUiSizeCompact");
			}
			me._oValueHelpDialog.open();
			//oValueHelpDialog.update();
		}
	});

});