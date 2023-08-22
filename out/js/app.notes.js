var HTML_TEMPLATE = '<div id="user-options-small" class="toolbar-icons">'+
'	<a href="#" id="btnHighlight">'+
'        <i class="icon-align-left"></i>'+
'        <span>Highlights</span>'+
'    </a>'+
'	<a href="#" id="btnDelete">'+
'        <i class="icon-align-right"></i>'+
'        <span>Delete</span>'+
'    </a>'+
'</div>'+
''+
'<div id="yellow-notepad" class="">'+
'	<div contenteditable="true" class="notepad-editor"></div>'+
'    <div class="notepad-btns">'+
'    	<span id="saveNotes">Save Notes</span>'+
'    </div>'+
'    <div class="notepad-closeBtn"></div>'+
'</div>'+
''+
'<div id="yellow-notepad-reader" class="">'+
'	<div contenteditable="true" class="notepad-editor"></div>'+
'    <div class="notepad-btns">'+
'    	<span class="notepad-deleteBtn" onClick="removeNote()">Delete Note</span>'+
'    </div>'+
'    <div class="notepad-btns2">'+
'		<span class="notepad-saveBtn" onClick="updateNote()">Save</span>'+
'    </div>'+
'    <div class="notepad-closeBtn"></div>'+
'</div>'+
'<div id="highlight-coloroptions" class="">'+
'	<div class="coloroptions-wrapper">'+
'		<div class="coloroptions coloroptions-1" onClick="setHightlightColor(\'#ff7979\')"></div>'+
'		<div class="coloroptions coloroptions-2" onClick="setHightlightColor(\'#FF0\')"></div>'+
'		<div class="coloroptions coloroptions-3" onClick="setHightlightColor(\'#a9a9ff\')"></div>'+
'	</div>'+
'</div>';

var mousePos = {};
var notes_db = {};
var noteClickTracker = false;

function getNotes(pageNum) {
	notes_db[pageNum] = {};
	$("#innerpage-"+ pageNum).find('.notes-fixicon').remove();
	var notesData = window.localStorage.getItem(NOTE_KEYWORD + pageNum);
	if(notesData != undefined && notesData != null && notesData != "") {
		var notesHTML = '';
		
		var notes = JSON.parse(notesData);
		for(var i=0; i<notes.length; i++) {
			notes_db[pageNum][notes[i].timestamp] = notes[i];
			notesHTML += '<div onmouseup="showNotes(event, \'' + notes[i].timestamp + '\')" id="notes-' + notes[i]['timestamp'] + '" class="notes-fixicon" style="top: ' + notes[i]['posY'] + 'px; left: ' + notes[i]['posX'] + 'px">\
				<img src="img/sticky-notes.png" />\
			</div>';
		}
        
		$("#innerpage-"+ pageNum).find('.linking-container').prepend(notesHTML);

        $("#innerpage-"+ pageNum).find('.notes-fixicon').draggable({
			containment: 'parent',
			start: function() {
				noteClickTracker = true;
				if(eBookConfig.zoom != 1) {
					noteClickTracker = false;
					return false;
				}
			},
            stop: function(event, ui) {
                var noteId = this.id.split("-")[1];
                var pageId = $(this).parents('.page').attr('id').split('-')[1];
                notes_db[pageId][noteId]['posX'] = ui.position.left;
                notes_db[pageId][noteId]['posY'] = ui.position.top;
                var notesCollection = [];
                for(var key in notes_db[pageId]) {
                    notesCollection.push(notes_db[pageId][key]);
                }
                window.localStorage.setItem(NOTE_KEYWORD + pageId, JSON.stringify(notesCollection));
                $('#yellow-notepad-reader').hide();
                getNotes(pageId);
				setTimeout(function() {
					noteClickTracker = false;
				}, 400);
            }
        });

	}


}


function showNotes(e, noteId) {
	if(noteClickTracker) return false;
    var pageId = $(e.target).parents('.page').attr('id').split('-')[1];

	var $notepad = $('#yellow-notepad-reader');
	
	/*	
	cursorPos = getMouseCordinates(e);
	var leftPos, topPos;
	leftPos = (cursorPos["x"]);
	topPos  = (cursorPos["y"] - $notepad.height() - 10);
	
	var totalWidth = $('body').width();
	var itemWidth = $notepad.width();
	var maxLeft = totalWidth - itemWidth;
	var minLeft = 0;
	
	var totalHeight = $('body').height();
	var itemHeight = $notepad.height();
	var maxTop = totalWidth - itemHeight;
	var minTop = 10;

	if(leftPos < 0){leftPos = 0;}			
	if(topPos < 0){topPos = 60;}			

	if(leftPos > totalWidth-itemWidth){
		leftPos = totalWidth-itemWidth;
	}
	
	$notepad.fadeTo(1, .1).animate({left: leftPos, top: topPos+$('body').scrollTop(), opacity: 1},100,"swing");
	$notepad.find('.notepad-editor').text(notes_db[pageId][noteId].title);
	$notepad.attr('data-noteid', notes_db[pageId][noteId].timestamp);
    $notepad.attr('data-pageid', pageId);
	*/

	var $notepadModal = $("#notes-preview");
	$notepadModal.find('#textarea-note-preview').val(notes_db[pageId][noteId].title);
	$notepadModal.attr('data-noteid', notes_db[pageId][noteId].timestamp);
    $notepadModal.attr('data-pageid', pageId);
	$notepadModal.modal('show');
}

function updateNote() {

	var $notepadModal = $("#notes-preview");
	

	var $notepad = $('#yellow-notepad-reader');
	var noteId = $notepadModal.attr('data-noteid');
	var pageId = $notepadModal.attr('data-pageid');

	var newTitle = $.trim($notepadModal.find('#textarea-note-preview').val());
	if(newTitle != "") {
		notes_db[pageId][noteId]['title'] = newTitle;
		var notesCollection = [];
		for(var key in notes_db[pageId]) {
			notesCollection.push(notes_db[pageId][key]);
		}
		window.localStorage.setItem(NOTE_KEYWORD + pageId, JSON.stringify(notesCollection));
		$notepad.hide();
		$notepadModal.modal('hide');
		getNotes();
        readerApp.reloadNotes()
	}

}

function removeNote() {
	var $notepadModal = $("#notes-preview");
	var $notepad = $('#yellow-notepad-reader');
	
	var noteId = $notepadModal.attr('data-noteid');
	var pageId = $notepadModal.attr('data-pageid');
	delete notes_db[pageId][noteId];
	
	var notesCollection = [];
	for(var key in notes_db[pageId]) {
		notesCollection.push(notes_db[pageId][key]);
	}
	if(notesCollection.length == 0) {
		window.localStorage.removeItem(NOTE_KEYWORD + pageId);
	} else {
		window.localStorage.setItem(NOTE_KEYWORD + pageId, JSON.stringify(notesCollection));
	}
	
	$notepad.hide();
	$notepadModal.modal('hide');
	getNotes(pageId);
    readerApp.reloadNotes()
}


function getMouseCordinates() {
    var pos = {};
    pos.x = mousePos.cursorX;
    pos.y = mousePos.cursorY;
    return pos;
}

$(document).ready(function(e) {
    $('body').append(HTML_TEMPLATE);

	$('#user-options-small').hide();
	$('#yellow-notepad').hide();
	$('#yellow-notepad-reader').hide();
	$('#user-options-small, #highlight-coloroptions, #yellow-notepad, #yellow-notepad-reader').mousedown(function(e) {
        e.stopPropagation();
	});

    document.onmousemove = function(e){
        mousePos['cursorX'] = e.pageX;
        mousePos['cursorY'] = e.pageY;
    }

	$('body').mousedown(function(event)
	{
		$('#user-options-small').hide();
		$('#yellow-notepad').hide();
		$('#yellow-notepad-reader').hide();
		$("#highlight-coloroptions").hide();
		$('.selection').removeClass('selection');
		$('.temper').removeClass('temper');
	});

	$('.notepad-closeBtn').click(function(e){$(this).parent().hide();});
});