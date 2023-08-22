var LoginController = function() {

//var win8 = navigator.platform.toLowerCase().indexOf("win") !== -1 && navigator.userAgent.toLowerCase().indexOf("touch") !== -1;
var enablemusic = true;
var vid = document.getElementById("videoCon");
	vid.src="assets/media/video/help.mp4";
var intTime;
    function callApiWord(jsonInd) {
		
		$('#levelScreen').hide();
        $('#finalScreen').show();

        var gameObj = new GameController();
        gameObj.init(mainObj[jsonInd]);
		
	/* 	
        var gameDataURL = _model.getAppConfigData().baseURL + _model.getAppConfigData().levelsetting[jsonInd];
        var apiService = new APIService();
        apiService.wordPlayData(gameDataURL, "true", "json", levelLoadErrorHandler, levelLoadSuccessHandler); */
    }

/* 
    function levelLoadSuccessHandler(jsonData) {

        _model.clearWordData();
        DataParser.parselevelData(jsonData);

        //console.log(":: clicked json Data Received ::");


        $('#levelScreen').hide();
        $('#finalScreen').show();

        var gameObj = new GameController();
        gameObj.init();

    }

    function levelLoadErrorHandler(error) {
        //console.log("::  clicked json Error Handler ::");
       // console.log(error);
    } */

	 function soundOffHandler() {
        AudioManager.mutedAudio();
    }
    function soundOnHandler() {
        AudioManager.unmutedAudio();
    }

    function musicOffHandler() {
		MusicManager.stopAudio();
        MusicManager.mutedAudio();
    }
    function musicOnHandler() {
        MusicManager.unmutedAudio();
		
    }
	function musicplayHandler(){
		MusicManager.playAudio(StaticLibrary.SW_BG_Loop);
	}
	
    this.init = function() {
        $('#splashScreen').hide();
        $('#loginScreen').show();
		MusicManager.playAudio(StaticLibrary.SW_BG_Loop);
        document.getElementById('loginBtn').click();
        document.getElementById('levels_0').click();
    }

    $('#loginBtn').off('click').on('click', loginClickHandler);
    $('#helpBtn').off('click').on('click', helpBtn);
    $('#SettingIcon').off('click').on('click', SettingIcon);
    $('#soundClose').off('click').on('click', Settingclose);
	
	
	/*$("#userName").focusin(function() {

		if($("#userName").val() != null && $("#userName").val() != ""){
				
		}else{
			$("#userName").attr("placeholder","");

		}
	});
	$("#userName").focusout(function() {

		if($("#userName").val() != null && $("#userName").val() != ""){
			
		}else{
			$("#userName").attr("placeholder","Your name");
		}
	});*/
	
    $('#loginBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.clickLogin').addClass('hoverClass');
    });
    $('#loginBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.clickLogin').removeClass('hoverClass');
    });
    $('#helpBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.infoicon').addClass('hoverClass');
    });
	
    $('#helpBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.infoicon').removeClass('hoverClass');
    });
    $('#SettingIcon').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.settingicon').addClass('hoverClass');
    });
	
    $('#SettingIcon').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.settingicon').removeClass('hoverClass');
    });
    $('#aboutBtn').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.about').addClass('hoverClass');
    });
	
    $('#aboutBtn').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.about').removeClass('hoverClass');
    });

    $('#readyOk').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		$('.ready').addClass('hoverClass');
    });
	
    $('#readyOk').unbind('mouseout touchend').bind('mouseout touchend', function() {
		$('.ready').removeClass('hoverClass');
    });

    $('#readyOk').off('click').on('click', function() {
		StaticLibrary.audioForClick();
		$('#videoCon').removeClass('blur');
		$('#readyPopup').hide();
		$('#work').hide();
		clearInterval(intTime);
		$('#levelScreen').show();
		vid.currentTime = 0;
		vid.pause();
		if(enablemusic){			
		musicOnHandler()
		musicplayHandler();	
		}

    })
    $('#skipBtn').off('click').on('click', function() {
		StaticLibrary.audioForClick();
		$('#work').hide();
		clearInterval(intTime);
		$('#levelScreen').show();
		vid.currentTime = 0;
		vid.pause();
		if(enablemusic){			
		musicOnHandler()
		musicplayHandler();	
		}

    })

    $('#aboutBtn').off('click').on('click', function() {
		StaticLibrary.audioForClick();
    })
    $('#soundOn').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#soundOff').show();
		$('#soundOn').hide();
		soundOffHandler();
    })
    $('#soundOff').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#soundOn').show();
		$('#soundOff').hide()
		soundOnHandler();
    })
    $('#musicOn').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#musicOff').show();
		$('#musicOn').hide();
		musicOffHandler();
    })
    $('#musicOff').off('click').on('click', function() {
		StaticLibrary.audioForClick();
        $('#musicOn').show();
		$('#musicOff').hide();
		musicOnHandler();
		musicplayHandler();
    })

    function Settingclose() {
		StaticLibrary.audioForClick();
        $('#levelScreen').removeClass('blur');
        $('#sound').hide();		
    }
	
    function SettingIcon() {

		StaticLibrary.audioForClick();		
        $('#levelScreen').addClass('blur');
        $('#sound').show()
    }
	if(isAndroid && AndroidVersion < 5) {
  	 	 document.addEventListener("deviceready", initvideo, false);
	}
    function initvideo(){
    	    window.plugins.html5Video.initialize({
    		  "videoCon" : "help.mp4"
 		 });
    }
    function helpBtn() {   
    if(isAndroid && AndroidVersion < 5){		
		window.plugins.html5Video.play("videoCon")		
		}
		else{
		vid.load();
		vid.play();
	}
		StaticLibrary.audioForClick();
		$('#levelScreen').hide();
		$('#readyPopup').hide();
		$('#work').show();	
		$('#videoCon').removeClass('blur');

		if(!MusicManager._flag){
		enablemusic = true;
		}
		else{
		enablemusic = false;
		}
		MusicManager.stopAudio();

		intTime = setInterval(durationCheck,200)

    }
	
	function durationCheck(){
		if(vid.currentTime >= 79 ){
			clearInterval(intTime);
			$('#readyPopup').show();				
			$('#videoCon').addClass('blur');
		}
	}
	
    function loginClickHandler() {

		StaticLibrary.audioForClick();
       callLevelsPage();
		/*if(isIE){
			userGlobalName = $('#userName').val();
		if (userGlobalName != null && userGlobalName != "") {
            callLevelsPage();
        }
				
		}else{
			var userName = $('#userName').val();
			localStorage.setItem("userName", userName);
		
		}
        
        if (userName != null && userName != "") {
            callLevelsPage();
        }*/
    }

    function callLevelsPage() {		
        $('#loginScreen').hide();
        $('#levelScreen').show();

        $('#differentLevels').empty();
        for (var i in mainObj) {
            $('#differentLevels').append('<li class="levels" id="levels_'+i+'" data-level=' + i + '>' + mainLevelName[i] + '</li>');
        }
        $('.levels').off('click').on('click', goToLevel);
		
	$('#levels_0').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		 $('#levels_0').addClass('hoverClass');
    });
	
    $('#levels_0').unbind('mouseout touchend').bind('mouseout touchend', function() {
		 $('#levels_0').removeClass('hoverClass');
    }); 
	
	$('#levels_1').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		 $('#levels_1').addClass('hoverClass');
    });
	
    $('#levels_1').unbind('mouseout touchend').bind('mouseout touchend', function() {
		 $('#levels_1').removeClass('hoverClass');
    }); 
	
	$('#levels_2').unbind('mouseover touchstart').bind('mouseover touchstart', function() {
		 $('#levels_2').addClass('hoverClass');
    });
	
    $('#levels_2').unbind('mouseout touchend').bind('mouseout touchend', function() {
		 $('#levels_2').removeClass('hoverClass');
    }); 
	
    }

    function goToLevel() {
		StaticLibrary.audioForClick();
        var jsonToLoad = $(this).attr('data-level');
        callApiWord(jsonToLoad);
    }
}
