function initModel() {
	var sUrl = "/TEST_SCHEMA/test_pkg/myservice.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}