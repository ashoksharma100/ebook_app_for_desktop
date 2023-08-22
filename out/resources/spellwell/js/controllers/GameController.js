var GameController = function() {

    _this = this;
    var score;
    var curIndex = 0;
    var curLevelData;


    function audioForCorrect() {
        AudioManager.playAudio(StaticLibrary.SW_Correctanswer)
    }

    function audioForLettersClick() {
        AudioManager.playAudio(StaticLibrary.SW_LettersClick)
    }

    function audioForLettersWrongdrop() {
        AudioManager.playAudio(StaticLibrary.SW_WrongOptionLetter)
    }

    function audioForCongrats() {
        AudioManager.playAudio(StaticLibrary.SW_WordComplete)
    }
   
    function noaudioForBgSound() {
		MusicManager.unmutedAudio();
    }  
    function audioForBgSound() {
        MusicManager.playAudio(StaticLibrary.SW_BG_Loop)
    }
    function audioNoHandler() {  
    	MusicManager.stopAudio();
	}

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * max + 1);
    }

    function updateScore(totalScore) {
        $('#score').html(cal(totalScore));
		$('#finalScore').html(cal(totalScore));
        audioForCorrect()
    }
	function cal(txt) { 
		var num = parseInt(txt, 10); 
		return num < 10 ? "0" + num : num;
 
	}

    function enableNext() {
        var countno = 0;
        $('#question li').each(function() {
            if ($(this).html() != "_") {
                countno++;
            }
        });
        if (countno == $('#question li').length) {
            $('#hint').css('pointer-events', 'none');
            setTimeout(openCongrats, 1000)

        }
    }

    function openCongrats() {
        $('#finalScreen').addClass('blur');
        $("#congratulations").show();
        $('#nextBtn').css('pointer-events', 'auto');

        audioForCongrats()
        setTimeout(closeCongrats, 1500)
    }

    function closeCongrats() {
        $('#finalScreen').removeClass('blur');
        $("#congratulations").hide();
    }

    function dragEventHandler() {
        var dragItem, dropItem;
		var dropped = true;
        $("#dragParent li div").draggable({
            containment: "#finalScreen",
            revert: "invalid",
			helper: 'clone',
            start: function(e, ui) {
                dragItem = $(this);
                dragLetter = dragItem.html();
				if(isTouchDevice){
					$(ui.helper).css('font-size','30px');				
					
				}else{
					$(ui.helper).css('font-size','40px');
				}
				$(dragItem).parent().addClass('hoverClass');
				$(dragItem).css('opacity','0.3');
                audioForLettersClick();
				dropped = true;
				$("#dragParent li div").draggable({ disabled: true });
            },
			stop:function(e, ui){
				$("#dragParent li div").draggable({ disabled: false });
				if(dropped){
					audioForLettersWrongdrop();
				}
				$(dragItem).css('opacity','1');
				$(dragItem).parent().removeClass('hoverClass');
			}
        });

        $(".dropElement").droppable({

            drop: function(e, ui) {
                dropItem = $(this);

                dropLetter = dropItem.attr('data-item-ans');
                if (dragLetter == dropLetter) {

                    $(dropItem).droppable("option", "disabled", true).html(dropLetter).hide().show().addClass('animate');  

                    $(dragItem).draggable({
                        revert: true
                    });
                    score = score + 2;
                    updateScore(score);
                    enableNext();
					dropped = false;
                } else {
                    
                    $(dragItem).draggable({
                        revert: true
                    });
                }

            }
        });
    }

    


    function SettingIconHandler() {
		enable= true;		
		StaticLibrary.audioForClick();	
        $('#menuPopup').hide()
        $('#sound').show()
    }

	function playword(word){
		AudioManager.playspeakerAudio(word);
	}
    this.init = function(subLevelObj) {
				
		if(isTouchDevice){
			$('#hint').unbind('touchstart touchend').bind('touchstart touchend', addEventForHint);				
		}else{
			$('#hint').unbind('mouseover mouseout click').bind('mouseover mouseout click', addEventForHint);				
		}
		
		audioNoHandler()	
        score = 0;
        curIndex = 0;

        curLevelData = subLevelObj;

        curLevelData = shuffle(curLevelData);
        $('#score').html(cal(score));
        $('#nextBtn').css('pointer-events', 'none');
        $('#hint').css('pointer-events', 'auto');
        $('#totalcount').html(curLevelData.length);

		$('#finalScreen').removeClass('blur');
        _this.goToNextQuestion(curIndex);
		
		if(isTouchDevice){
			$('#nextBtn').unbind('touchstart touchend').bind('touchstart touchend', addEventForNextBtn);				
		}else{
			$('#nextBtn').unbind('mouseover mouseout click').bind('mouseover mouseout click', addEventForNextBtn);				
		}
    }
		
		
			
	function addEventForNextBtn(event){
		
		switch(event.type){
			case "touchstart":
				    curIndex++;
					$('#hint').css('pointer-events', 'auto');
					$('#nextBtn').css('pointer-events', 'none');		
					_this.goToNextQuestion(curIndex);
				$('.next').addClass('hoverClass');				
			break;
			case "touchend":
				$('.next').removeClass('hoverClass');
			break;
			case "mouseover":
				$('.next').addClass('hoverClass');	
			break;
			case "mouseout":
				$('.next').removeClass('hoverClass');
			break;		
			case "click":
				    curIndex++;
					$('#hint').css('pointer-events', 'auto');
					$('#nextBtn').css('pointer-events', 'none');		
					_this.goToNextQuestion(curIndex);
			break;		
		}
	}


    $('#closeOk').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#meaningPopup').hide();
        $('#finalScreen').removeClass('blur');
    });
    $('#antonym').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#meaningPopup').show();
        $('#popupContent').html(curLevelData[curIndex].antonyms);
        $('.footbggreen').css('background','#54e554');
        $('#finalScreen').addClass('blur');
    });
    $('#synonym').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#meaningPopup').show();
        $('#popupContent').html(curLevelData[curIndex].synonyms);
        $('.footbggreen').css('background','#E271E7');
        $('#finalScreen').addClass('blur');
    });
    $('#resumeBtn, #innerCloseBtn').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#menuPopup').hide();
        $('#finalScreen').removeClass('blur');
        audioNoHandler();
    })
    $('#menuIconBtn').off('click').on('click', function() {
		enable = false;
        $('#levelScreen').show();
		$('#finalScreen').removeClass('blur');	
        $('#finalScreen, #menuPopup').hide();
		StaticLibrary.audioForClick();
    });
    $('#quitBtn').off('click').on('click', function() {
        $('#menuPopup').hide();
        $('#quitPopup').show();
		StaticLibrary.audioForClick();
    });
    $('#keepPlayBtn').off('click').on('click', function() {
        $('#quitPopup').hide();
        $('#menuPopup').show();
		StaticLibrary.audioForClick();
    });

    $('#congratulations').off('click').on('click', function() {
		closeCongrats();
    });
	
	if(isTouchDevice){
		document.addEventListener('deviceready', onDeviceReady, false);
    }
	else{
		$('#quitGameBtn').off('click').on('click', function() {
			StaticLibrary.audioForClick();
			window.close(); 
		});
    }
    
    function onDeviceReady()
    {
    	$('#quitGameBtn').off('click').on('click', function() {
    		
			StaticLibrary.audioForClick();
			if(isIPAD || isiPhone){
				
			}else{
			if(navigator.app){
			MusicManager.stopAudio();
			MusicManager.mutedAudio();
				navigator.app.exitApp();
			}else if(navigator.device){
			MusicManager.stopAudio();
			MusicManager.mutedAudio(); 
				navigator.device.exitApp();
			}
		}			
		});
		
		if(isAndroid){
		
			$('#keepPlayBtn').off('click').on('click', function() {
				$("#levelScreen, #videoCon").removeClass("blur");
        	if($("#finalScreen").css("display") == "block"){
        	$('#quitPopup').hide();
        	$('#menuPopup').show();
			StaticLibrary.audioForClick();
			}else{
			$('#menuPopup, #quitPopup').hide();
			StaticLibrary.audioForClick();
			}
   		 });	
    	}		
    }

    $('#nextBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.next').addClass('hoverClass');
    });
	
    $('#nextBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.next').removeClass('hoverClass');
    });
	
	function addEventForHint(event){
		
		switch(event.type){
			case "touchstart":
				showans();
				$('.bulb').addClass('hoverClass');				
			break;
			case "touchend":
				$('.bulb').removeClass('hoverClass');
			break;
			case "mouseover":
				$('.bulb').addClass('hoverClass');	
			break;
			case "mouseout":
				$('.bulb').removeClass('hoverClass');
			break;		
			case "click":
				showans();
			break;		
		}
	}

	function showans() {
		
        $('#question li').each(function() {
            if ($(this).html() == '_') {
                if (score == 0) {
                    score = 0;
                } else {
                    score = score - 2;
                }
                $(this).html($(this).attr('data-item-ans')).hide().show().droppable("option", "disabled", true).addClass('animate');
 
                return false;
            }
        });
        updateScore(score);
        enableNext();
    }
	
	
    $('#menuBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.playPause').addClass('hoverClass');
    });
	
    $('#menuBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.playPause').removeClass('hoverClass');
    });
	
    $('#quitGameBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.quit').addClass('hoverClass');
    });
	
    $('#quitGameBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.quit').removeClass('hoverClass');
    });
    $('#keepPlayBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.playing').addClass('hoverClass');
    });
	
    $('#keepPlayBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.playing').removeClass('hoverClass');
    });
	
    $('#antonym').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.ant').addClass('hoverClass');
    });
	
    $('#antonym').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.ant').removeClass('hoverClass');
    });
    $('#synonym').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.sys').addClass('hoverClass');
    });
	
    $('#synonym').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.sys').removeClass('hoverClass');
    });
    $('#closeOk').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.ok').addClass('hoverClass');
    });
	
    $('#closeOk').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.ok').removeClass('hoverClass');
    });
	
    $('#playAgain').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$(this).addClass('hoverClass');
    });
	
    $('#playAgain').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$(this).removeClass('hoverClass');
    });
    $('#settingsBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('#settingsBtn').addClass('hoverClass');
    });
	
    $('#settingsBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('#settingsBtn').removeClass('hoverClass');
    });
    $('#menuIconBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('#menuIconBtn').addClass('hoverClass');
    });
	
    $('#menuIconBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('#menuIconBtn').removeClass('hoverClass');
    });
    $('#resumeBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('#resumeBtn').addClass('hoverClass');
    });
	
    $('#resumeBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('#resumeBtn').removeClass('hoverClass');
    });
    $('#quitBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('#quitBtn').addClass('hoverClass');
    });
	
    $('#quitBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('#quitBtn').removeClass('hoverClass');
    });

function enableSynAntBtn(ind){
	if(curLevelData[ind].antonym != null){
		$('#antonym').css({'pointer-events':'auto','opacity':'1'});
	}else{
		$('#antonym').css({'pointer-events':'none','opacity':'0.5'});
	}
	if(curLevelData[ind].synonym != null){
		$('#synonym').css({'pointer-events':'auto','opacity':'1'});
	}else{
		$('#synonym').css({'pointer-events':'none','opacity':'0.5'});
	}
}

    this.goToNextQuestion = function(curInd) {

        if (curInd > curLevelData.length - 1) {
            $('#resultPopup').show();
			$('#finalScreen').addClass('blur');
			if(isIE){
				$('#playerName').html(userGlobalName);		
			}else{
				
				/*if(localStorage.getItem("userName") != null){
					$('#playerName').html(localStorage.getItem("userName"));				
				}*/		
			}
            return;
        }

        var hidearr = [];
        var totalLength = curLevelData[curInd].question.length;
        var totrandom = curLevelData[curInd].random;
		
		
		playword(curLevelData[curInd].audSrc);
	
		enableSynAntBtn(curInd);
		
        $('#screenNo').html(curInd + 1);
        //$('#quesNo').html(curInd + 1 + '.');
        $('#thumbImage img').attr('src', '');
        $('#thumbImage img').attr('src', curLevelData[curInd].imgSrc);
        $('#fullImage img').attr('src', '');
        $('#fullImage img').attr('src', curLevelData[curInd].imgSrc);
        $('#question').empty();
        for (var i in curLevelData[curInd].question) {
            $('#question').append('<li class="dropEle" data-item-ans=' + curLevelData[curInd].question[i] + '>' + curLevelData[curInd].question[i] + '</li>');
        }

        while (hidearr.length < totrandom) {
            var randomnumber = Math.ceil(Math.random() * totalLength)
            var found = false;
            for (var i = 0; i < hidearr.length; i++) {
                if (hidearr[i] == randomnumber) {
                    found = true;
                    break
                }
            }
            if (!found)
                hidearr[hidearr.length] = randomnumber;
        }

        for (var j in hidearr) {
            $('.dropEle').eq(hidearr[j] - 1).html('_').droppable().addClass('dropElement');
        }		
		
        if (curLevelData[curInd].hypenIndex != 0) {
            $('#question li:eq(' + curLevelData[curInd].hypenIndex + ')').before('<span class="inBetween">-</span>');
        }
        if (curLevelData[curInd].spaceIndex != 0) {
            $('#question li:eq(' + curLevelData[curInd].spaceIndex + ')').before('<span class="inBetween">&nbsp;&nbsp;</span>');
        }
		
		$('.dropEle').each(function(){
			if($(this).attr('data-item-ans') == "I" ){
				var widofI = $(this).outerWidth()/2;
				$(this).css('width',widofI+"px");
			}
		});


        dragEventHandler()

        $('#playAgain').off('click').on('click', function() {
			StaticLibrary.audioForClick();
            enable = false;
			curInd = 0;
			curIndex = 0;
			$('#resultPopup, #finalScreen').hide();
			$('#levelScreen').show();
        });
		
		
		if(isTouchDevice){
			$('#speaker').unbind('touchstart touchend').bind('touchstart touchend', addEventForSpeaker);				
		}else{
			$('#speaker').unbind('mouseover mouseout click').bind('mouseover mouseout click', addEventForSpeaker);				
		}
		
		
        $('#thumbImage').off('click').on('click', function() {
            $('#finalScreen').addClass('blur');
            $('#fullImage').show();
            StaticLibrary.audioForClick()
        });
        $('#fullImageClose').off('click').on('click', function() {
            $('#finalScreen').removeClass('blur');
            $('#fullImage').hide();
            StaticLibrary.audioForClick()
        });
        $('#menuBtn').off('click').on('click', function() {
			StaticLibrary.audioForClick();
            $('#menuPopup').show();
            audioForBgSound();
			$('#finalScreen').addClass('blur'); 

        });
       
		$('#settingsBtn').off('click').on('click', SettingIconHandler);
		  
		$('#soundClose').off('click').on('click', function() {

		StaticLibrary.audioForClick();
		if(enable){			
			$('#menuPopup').show();
			$('#sound').hide();
		}else{
		$('#levelScreen').removeClass('blur');
        $('#sound').hide();		
		}
    });
	
		function addEventForSpeaker(event){
		
		switch(event.type){
			case "touchstart":				
				playword(curLevelData[curInd].audSrc);
				$('.audio').addClass('hoverClass');				
			break;
			case "touchend":
				$('.audio').removeClass('hoverClass');	
			break;
			case "mouseover":
				$('.audio').addClass('hoverClass');	
			break;
			case "mouseout":
				$('.audio').removeClass('hoverClass');
			break;		
			case "click":
				playword(curLevelData[curInd].audSrc);
			break;		
		}
	}
	
    }
}