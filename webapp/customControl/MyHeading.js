sap.ui.define(["sap/ui/core/Control"], function (Control) {
	return Control.extend("gitTest.GitTest.customControl.MyHeading", {
		metadata: {
			properties: {
				"text": ""
			},
			aggregations: {},
			events: {},
			methods: {}
		},
		init: function(){},
		renderer: function(oRm, oControl){
			oRm.write("<h1>" + oControl.getText() + "</h1>");
		}
	});
});