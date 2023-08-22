/*
* Author: Ashok Shah
* https://www.shahnashok.com
* Date: 05/06/2017
*/

var numberOfPages = appdb.config.totalPages; 

// Adds the pages that the book will need
function addPage(page, book) {
	// 	First check if the page is already in the book
	if (!book.turn('hasPage', page)) {
		// Create an element for this page
		var element = $('<div />', {'class': 'page '+((page%2==0) ? 'odd' : 'even'), 'id': 'page-'+page}).html('<i class="loader"></i>');
		// If not then add the page
		book.turn('addPage', element, page);
		// Let's assum that the data is comming from the server and the request takes 1s.

		var pageData = PAGES_LINKING[page];
		var htmlData = "";
		if(pageData) {
			for(var i=0; i<pageData.length; i++) {
				
				var infoObj = pageData[i];
				console.log('test', infoObj.type);
				if(infoObj.type == 'iframe') {
					htmlData += '<div onClick="openFancyModal(\'' + infoObj.link + '\', \'' + infoObj.size + '\')"  class="regionPos" style="left: ' + infoObj.x + '%; top: ' + infoObj.y + '%;"><img title="' + infoObj.title + '" src="' + infoObj.icon + '" ></div>';
				} else if(infoObj.type == 'audio') {
					htmlData += '<div onClick="playAudio(\'' + infoObj.link + '\')" class="regionPos regionPosAudio" style="left: ' + infoObj.x + '%; top: ' + infoObj.y + '%;"><img title="' + infoObj.title + '" src="' + infoObj.icon + '" ></div>';
					htmlData += '<div onClick="pauseAudio();" class="regionPos regionPosAudio pause-icon" style="left: ' + (infoObj.x + 8) + '%; top: ' + infoObj.y + '%;"><img src="img/icons/play-pause.png"></div>';
				} else {
					htmlData += '<div onClick="openFancyModalVideo(\'' + infoObj.link + '\', \'' + infoObj.size + '\')"  class="regionPos" style="left: ' + infoObj.x + '%; top: ' + infoObj.y + '%;"><img title="' + infoObj.title + '" src="' + infoObj.icon + '" ></div>';
				}
			}
		}

		setTimeout(function(){
			element.html('<div id="innerpage-' + page + '" class="data specialpage" style="background: url(\'resources/book/file-page' + page + '.jpg\')">&nbsp; ' + 
			'<div class="linking-container">' + htmlData + '</div>' +
			'<iframe src="canvas.html?page=' + page + '" class="canvas-paint" id="canvas-' + page + '" ></iframe>' + 
			'<div class="iframe-blocker"></div>' +
			'</div>');
		}, 1000);
	}
}

$(window).ready(function(){
	$('#book').turn({
		acceleration: true,
		pages: numberOfPages,
		elevation: 50,
		autoCenter: true,
		gradients: !$.isTouch,
		when: {
			turning: function(e, page, view) {

				// Gets the range of pages that the book needs right now
				var range = $(this).turn('range', page);

				// Check if each page is within the book
				for (page = range[0]; page<=range[1]; page++) 
					addPage(page, $(this));
			},

			turned: function(e, page) {
				$('#page-number').val(page);
				readerApp.setPageNumBack();
				readerApp.deactivatePaint();
			}
		}
	});

	$('#number-pages').html(numberOfPages);

	resizeBook();
	$(window).resize(resizeBook);

});

$(window).bind('keydown', function(e){

	if (e.target && e.target.tagName.toLowerCase()!='input')
		if (e.keyCode==37)
			$('#book').turn('previous');
		else if (e.keyCode==39)
			$('#book').turn('next');

});

function resizeBook() {

	// prepare parent frame width;
	var $container = $("#book-viewport");
	$container.width('100%');
	
	var win = $(window).height();
	var header = $("#topbar-section").height();
	var footer = $("#app-footer").height();
	var padding = 80;
	
	var frameHeight = win - header - footer - padding;
	var frameWidth = $container.width();
	
	$container.css({
		width: frameWidth + 'px',
		height: frameHeight + 'px'
	});

	// resize book with scaling
	var $book = $("#book");
	var width  = $book.width();
	var height = $book.height();

	if($("#book").turn('display') == 'single') {
		width = appdb.config.bookWidth;
		height = appdb.config.bookHeight;
	} else {
		width = appdb.config.bookWidth*2;
		height = appdb.config.bookHeight;
	}


	var $parent = $("#book-wrapper");
	var parentWidth  = $parent.width();
	var parentHeight = $parent.height();

	var finalDimension = calculateAspectRatioFit(width, height, parentWidth, parentHeight);
	$("#book").turn('size', finalDimension.width, finalDimension.height);
	eBookConfig.zoom = 1;
	$("#book-viewport").css('overflow', '');
	

	var innerH = $(".page").height();
	var innerW = $(".page").width();
	$('head').append('<style>' + 
	'.linking-container { height: ' + innerH + 'px; width: ' + innerW + 'px; }' +
	'</style>')
	var pgheight = $('#book .page').height();
	$("#book .data").height(pgheight + 'px');
	$('.linking-container')
		.css('-webkit-transform', 'scale(' + 1 + ')')
		.css('-moz-transform', 'scale(' + 1 + ')')
		.css('-ms-transform', 'scale(' + 1 + ')')
		.css('-o-transform', 'scale(' + 1 + ')')
		.css('transform', 'scale(' + 1 + ')');
}

function zoomBook(zoomlevel) {

	// prepare parent frame width;
	var $container = $("#book-viewport");
	$container.width('100%');
	
	var win = $(window).height();
	var header = $("#topbar-section").height();
	var footer = $("#app-footer").height();
	var padding = 80;
	
	var frameHeight = win - header - footer - padding;
	var frameWidth = $container.width();
	
	$container.css({
		width: frameWidth + 'px',
		height: frameHeight + 'px'
	});

	// resize book with scaling
	var $book = $("#book");
	var width  = $book.width();
	var height = $book.height();

	if($("#book").turn('display') == 'single') {
		width = appdb.config.bookWidth;
		height = appdb.config.bookHeight;
	} else {
		width = appdb.config.bookWidth*2;
		height = appdb.config.bookHeight;
	}

	var $parent = $("#book-wrapper");
	var parentWidth  = $parent.width();
	var parentHeight = $parent.height();

	var finalDimension = calculateAspectRatioFit(width, height, parentWidth, parentHeight);
	$("#book").turn('size', finalDimension.width*zoomlevel, finalDimension.height*zoomlevel);
	$("#book-viewport").css('overflow', 'auto');
	var pgheight = $('#book .page').height();
	$("#book .data").height(pgheight + 'px');
	$('.linking-container')
		.css('-webkit-transform', 'scale(' + zoomlevel + ')')
		.css('-moz-transform', 'scale(' + zoomlevel + ')')
		.css('-ms-transform', 'scale(' + zoomlevel + ')')
		.css('-o-transform', 'scale(' + zoomlevel + ')')
		.css('transform', 'scale(' + zoomlevel + ')');
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }