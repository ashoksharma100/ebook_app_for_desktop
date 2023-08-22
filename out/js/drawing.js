const HIGLIGHT_KEYWORD = appdb.config.id + '_highlight_';
const HIGLIGHT_LIST = appdb.config.id + '_list';
var highlight_listz = [];

var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById('c');
canvas.width = width;
canvas.height = height;
var pageId = getPageNum();

var canvas = new fabric.Canvas('c', { selection: false });
canvas.freeDrawingCursor='default';

var tools = {
    '0': false,
    '1': 'box',
    '2': 'pen',
    '3': 'eraser'
};

var activeTool = 0;
var paintOptions = {
    color: '#0000ff',
    width: 5
};

var boxColor = 'rgba(0,0,255,0.5)';


var rect, isDown, origX, origY;

canvas.on('mouse:down', function(o){
	setParentActive();
    if(activeTool != 1) return false;
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x-origX,
        height: pointer.y-origY,
        angle: 0,
        fill: boxColor,
        transparentCorners: true
    });
    canvas.add(rect);
});

canvas.on('mouse:move', function(o){
    
    if (!isDown) return;

    
	if(activeTool == 1) {
		var pointer = canvas.getPointer(o.e);
		
		if(origX>pointer.x){
			rect.set({ left: Math.abs(pointer.x) });
		}
		if(origY>pointer.y){
			rect.set({ top: Math.abs(pointer.y) });
		}
		
		rect.set({ width: Math.abs(origX - pointer.x) });
		rect.set({ height: Math.abs(origY - pointer.y) });
		
		
		canvas.renderAll();
	}
});

canvas.on('mouse:up', function(o){
	isDown = false;

	if(activeTool == 2) {
		var currentItem = canvas._objects.length - 1;
		if(canvas.item(currentItem).selectable == true)
			canvas.item(currentItem).selectable = false;
		
		canvas.renderAll();
	}
	saveCanvasStorage();
});    





function initTool (toolCode) {
    activeTool = toolCode;
    if(activeTool == 2) {
        canvas.isDrawingMode = true;
        //canvas.freeDrawingBrush.color = paintOptions.color;
        //canvas.freeDrawingBrush.width = paintOptions.width;
        
    } else {
        canvas.isDrawingMode = false;
    }
}

$(window).resize(function(e) {
	var bHeight = $('body').height();
	var bWidth = $('body').width();
	$('.canvas-container').css({
		width: bWidth + 'px',
		height: bHeight + 'px'
	});


	var canvasWidth = $('.wrapper-paint-app canvas').width();
	var zoomPos = bWidth/canvasWidth;

	//console.log(zoomPos, bWidth, canvasWidth);
	$(".canvas-container")
		.css('-webkit-transform', 'scale(' + zoomPos + ')')
		.css('-moz-transform', 'scale(' + zoomPos + ')')
		.css('-ms-transform', 'scale(' + zoomPos + ')')
		.css('-o-transform', 'scale(' + zoomPos + ')')
		.css('transform', 'scale(' + zoomPos + ')');
});



function setParentActive() {
	window.parent.postMessage("canvas-"+pageId, "*");
	addPageToStorage();
}

function addPageToStorage() {
	getPages();
	if(highlight_listz.indexOf(pageId) == -1) {
		highlight_listz.push(pageId);
	}
	saveInStorage();
}

function removePageFromStorage() {
	getPages();

	var index = highlight_listz.indexOf(pageId);
	if(index != -1) {
		highlight_listz.splice(index, 1);
	}
	saveInStorage();
}

function remvoeLastObject() {
    var canvas_objects = canvas._objects;
	if(canvas_objects.length !== 0){
		var last = canvas_objects[canvas_objects.length -1];
		canvas.remove(last);
		canvas.renderAll();
	}
}

function clearAll() {
    var canvas_objects = canvas._objects;
	if(canvas_objects.length !== 0){
		var last = canvas_objects[canvas_objects.length -1];
		canvas.remove(last);
		canvas.clear();
		canvas.renderAll();
	}
	removePageFromStorage();
	removeCanvasFromStorage();
}

function getPageNum() {
	var url_string = location.href;
	var url = new URL(url_string);
	var page = url.searchParams.get("page");
	if(page == null || page == undefined)
		page = 0
	return page;
}


function getPages() {
	var oldData = window.localStorage.getItem(HIGLIGHT_LIST);
	highlight_listz = [];
	if(oldData != undefined && oldData != null && oldData != "") {
		highlight_listz = JSON.parse(oldData);
	}
	window.parent.postMessage("refresh-highlights", "*");
}

function saveInStorage() {
	
	if(highlight_listz.length != 0)
		window.localStorage.setItem(HIGLIGHT_LIST, JSON.stringify(highlight_listz)); 
	else
		removeFromStorage();
		
	window.parent.postMessage("refresh-highlights", "*");
}

function saveCanvasStorage() {
	var json = canvas.toJSON();
	window.localStorage.setItem(HIGLIGHT_KEYWORD + pageId, JSON.stringify(json)); 
}

function removeFromStorage() {
	removeCanvasFromStorage();
	window.localStorage.removeItem(HIGLIGHT_LIST);
	window.parent.postMessage("refresh-highlights", "*");
}

function removeCanvasFromStorage() {
	window.localStorage.removeItem(HIGLIGHT_KEYWORD + pageId); 
}


window.onmessage = function(e) {
	var msg = e.data;
	if(msg == 'show-tools-0') {
		initTool(0);
	} else if(msg == 'show-tools-1') {
		initTool(1);
	} else if(msg == 'show-tools-2') {
		initTool(2);
	} else if(msg == "action-undo") {
		remvoeLastObject();
	} else if(msg == "action-clear") {
		clearAll();
	} else if(msg.indexOf("select-color") != -1) {
		var color = msg.split("select-color-").join("");
		console.log('color updated', color);
		boxColor = color;

	}
}

window.onload = function () {
	getPages();
	if(highlight_listz.indexOf(pageId) != -1) {
		var json = JSON.parse(window.localStorage.getItem(HIGLIGHT_KEYWORD + pageId)); 
		canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
	}
}