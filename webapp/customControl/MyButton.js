sap.ui.define(["sap/m/Button"], function(Button){
	return Button.extend("gitTest.GitTest.customControl.MyButton", {
		metadata: {
			events: {
				hover: {}
			}
		},
		renderer: {},
		onmouseover: function(){
			this.fireHover();
		}            
	});
}); 