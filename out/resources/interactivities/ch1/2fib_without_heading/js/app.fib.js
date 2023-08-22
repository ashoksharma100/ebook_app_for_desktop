function MainApp () {
	this.appTitle = document.getElementById('app-title');
	this.appInstruction = document.getElementById('app-instruction');
	this.handlerBar = document.getElementById('handler-bar');
	this.handlerBar = document.getElementById('handler-bar');
	this.btnDone = document.getElementById('btn-done');
	this.btnTryAgain = document.getElementById('btn-tryagain');
	this.btnAnswer	= document.getElementById('btn-answers');
	this.feedback = document.getElementById('feedback-text');
	this.feedbackBox = document.getElementById('modal-feedback');
	
	
	this.btnDone.addEventListener('click', this.submitAns);
	this.btnTryAgain.addEventListener('click', this.submitAgain);
	this.btnAnswer.addEventListener('click', this.submitCorrect);
	
	
	this.current = 0;
	this.attempt = 0;
	
	this.init();
}

MainApp.prototype.init = function() {
	this.appTitle.textContent = MASTER_DB.TITLE;
	this.appInstruction.textContent = MASTER_DB.INSTRUCTION;
	
	this.loadQuestion(this.current);
	
	if(MASTER_DB.CONFIG.INPUT_TRANSFORM == 'uppercase') {
		$(this.handlerBar).addClass('input-uppercase');
	} else if(MASTER_DB.CONFIG.INPUT_TRANSFORM == 'lowercase') {
		$(this.handlerBar).addClass('input-lowercase');
	}
};

MainApp.prototype.filterInput = function () {

	$(this.handlerBar).on("keypress", ".input-filter", function(e) {
		
		var unicode = e.keyCode? e.keyCode : e.charCode;
		var keyInputs = MASTER_DB.CONFIG.INPUT_FILTER;

		if(unicode == 13 && $("#btn-done").is(":disabled") == false) {
			MasterApp.submitAns();
			return false;
		}
		if(MASTER_DB.CONFIG.INPUT_FILTER_STATUS === true) {
			for(var i=0; i<keyInputs.length; i++) {
				if(unicode == keyInputs[i])
					return  true;
			}
			return false;
		}
	});
};

MainApp.prototype.submitAns = function () {
	var _this = MasterApp;
	$('.attempt-incorrect').removeClass('attempt-incorrect');
	var feedbackTxt = '';
	var feedbackObj = feedbackTxt = MASTER_DB.QUESTIONS[_this.current].feedback;
	var isAllCorrect = true;

	$("#handler-bar li").each(function(i, e) {

		var isLICorrect = true;
		$(this).find("input[type='text']").each(function(j, f) {
			var ans = $(this).attr('data-ans');
			var guess = this.value;

			$(this).attr('readonly', 'readonly');
			if(ans.toLowerCase() == guess.toLowerCase()) {
				$(this).addClass('input-correct')
			} else {
				$(this).addClass('input-incorrect')
				isAllCorrect = false;
				isLICorrect = false;
			}
		});
		if(!isLICorrect) {
			$(this).addClass('attempt-incorrect');
		} else {
			$(this).addClass('attempt-correct');
		}


	});

	if(isAllCorrect) {
		playAudio('well-done.mp3');
	} else {
		playAudio('try-again.mp3');
	}
	

	_this.feedback.innerHTML = isAllCorrect ? feedbackObj.positive : feedbackObj.negative;
	$(_this.feedbackBox).show();
	setTimeout(function() {
		//closeModal('modal-feedback');
		$("#feedback-text").html('<img src="img/character.png" />').show();
		$("#btn-done").attr('disabled', 'disabled')		
	}, MASTER_DB.CONFIG.FEEDBACK_TIME);
	
	_this.btnDone.setAttribute('disabled', 'disabled');
	if(isAllCorrect) {
		$("#btn-tryagain").off().on('click', function(e) {
			window.location.reload();
		}).text("Play Again").removeAttr('disabled');
	} else {
		_this.btnTryAgain.removeAttribute('disabled');
	}
	_this.attempt++;
	
	if(MASTER_DB.CONFIG.MAX_ATTEMPT_ANS <= _this.attempt && MASTER_DB.CONFIG.MAX_ATTEMPT_ANS != -1)
		_this.btnAnswer.removeAttribute('disabled');

	if(isAllCorrect) {
		$("#btn-answers, #btn-done, #btn-tryagain").attr('disabled', 'disabled');
	}
};

MainApp.prototype.submitAgain = function () {
	var _this = MasterApp;
	$('.attempt-incorrect').each(function(i, e) {
		$(this).removeClass('attempt-incorrect');
		$(this).find('.input-incorrect').val('').removeAttr('readonly').removeClass('input-incorrect');
	});
	_this.btnTryAgain.setAttribute('disabled', 'disabled');
};

MainApp.prototype.submitCorrect = function () {
	var _this = MasterApp;
	
	$('.attempt-correct').removeClass('attempt-correct');
	$('.attempt-incorrect').removeClass('attempt-incorrect');
	$(_this.handlerBar).addClass('static-ans');
	$(_this.handlerBar).find('li').each(function(i, e) {
		$(this).addClass('animated fadeIn duration' + (i+1) + 's');
		var $input = $(this).find('input[type="text"]');
		$input.each(function(i, e) {
			var ans = $(this).attr('data-ans');
			this.value = ans;
		});
		$input.attr('readonly', 'readonly');
	});
	_this.appInstruction.textContent = MASTER_DB.ANSWERS.INSTRUCTION;
	$("#btn-tryagain").off().on('click', function(e) {
		window.location.reload();
	}).text("Try Again").removeAttr('disabled');
	_this.btnAnswer.setAttribute('disabled', 'disabled');
	_this.btnTryAgain.setAttribute('disabled', 'disabled');
};

MainApp.prototype.changeInput = function () {
	var _this = this;
	$(this.handlerBar).on("keyup", ".input-filter", function(e) {
		var unicode = e.keyCode? e.keyCode : e.charCode;
		var dataInput = $('#handler-bar').find('input[type="text"]').map(function() {
			return this.value;
		}).get();
		for(var i=0; i<dataInput.length; i++) {
			if(dataInput[i] == "") {
				$(_this.btnDone).attr('disabled', 'disabled');
				return false;
			}
		}
		if(unicode != 13) {
			$(_this.btnDone).removeAttr('disabled');
			$("#btn-reset").removeAttr('disabled');
		}
	});
};

MainApp.prototype.loadQuestion = function(index) {
	
	var dataHTML = "";
	var dataObj = MASTER_DB['QUESTIONS'][index].data;
	for(var i=0; i<dataObj.length; i++) {
		
	    var answers = dataObj[i].ans;
		var inputTextArray = [];
		var title = dataObj[i]['title']
		
		for(var j=0;j<answers.length;j++) {
			var ansfield = '<input class="input-filter" type="text" placeholder="" data-ans="' + answers[j] + '" maxlength="' + MASTER_DB['CONFIG']['MAX_INPUT'] + '" />';
			inputTextArray.push(ansfield);
			title = title.replace(MASTER_DB['CONFIG']['INPUT_TEXT_CODE'], ansfield);
		}
		console.log(title, answers)
	    //var inputText = '<input class="input-filter" type="text" placeholder="" data-ans="' + dataObj[i]['ans'] + '" maxlength="' + MASTER_DB['CONFIG']['MAX_INPUT'] + '" />';
	    //var title = dataObj[i]['title'].replace(MASTER_DB['CONFIG']['INPUT_TEXT_CODE'], inputText);
	    //var title = dataObj[i]['title'].split(MASTER_DB['CONFIG']['INPUT_TEXT_CODE']).join(inputText);
		dataHTML += '<li>'+
						'<img src="img/cross.png" class="img-submit img-incorrect" alt="Incorrect" title="" />'+
						'<img src="img/tick.png" class="img-submit img-correct" alt="Correct" title="" />'+
						title +
					'</li>';


	}
	this.handlerBar.innerHTML = dataHTML;
	this.changeInput();
	this.filterInput();

};

function closeModal (eleId) {
	$("#" + eleId).fadeOut();
}

var MasterApp;
$(document).ready(function(e) {
	MasterApp = new MainApp();

	$("#btn-reset").on('click', function(e) {
		window.location.reload();
	});
});


function playAudio(audioname) {
	var audio = new Audio("audio/" + audioname);
	audio.play();
}