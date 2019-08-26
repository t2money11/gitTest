sap.ui.define(["sap/ui/core/Control"], function (Control) {
	return Control.extend("gitTest.GitTest.customControl.MyHeading", {
		properties: {},
		aggregations: {},
		events: {},
		methods: {},
		renderer: function(oRm, oControl){
			oRm.write("<h1>This is Karl's Custom Control</h1>");
		}
	});
});