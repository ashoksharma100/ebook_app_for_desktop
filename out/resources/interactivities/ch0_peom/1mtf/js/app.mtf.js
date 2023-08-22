function MTF () {

	this.init();
}

MTF.prototype.init = function() {
	$("#app-title, title").html(MASTER_DB.TITLE);
	$("#app-instruction").html(MASTER_DB.INSTRUCTION);

	startAct()
};

var app;
$(document).ready(function(e) {
	app = new MTF();
});
