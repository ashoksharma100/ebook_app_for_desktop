var userGlobalName;
var mainObj = [level_0];
var mainLevelName = ["Class 3"];
// var mainObj = [level_0,level_1,level_2];
// var mainLevelName = ["Class 3","Class 4","Class 5"];
var enable = true;
var imageCount = 0;
var loadgif;
var loadscreen;
var preloadImageArr = ["assets/images/videoframe.png","assets/images/skip_button.png","assets/images/close.png","assets/images/hand.png","assets/images/hint_active.png","assets/images/hint_deactive.png","assets/images/hintbox.png","assets/images/main_background.png","assets/images/menuact.png","assets/images/menuactive.png","assets/images/menudeact.png","assets/images/menudeactive.png","assets/images/next_active.png","assets/images/next_deactive.png","assets/images/offbtn.png","assets/images/onbtn.png","assets/images/onoffbg.png","assets/images/pause_active.png","assets/images/pause_deactive.png","assets/images/popup.png","assets/images/popup_base.png","assets/images/sound_active.png","assets/images/sound_deactive.png","assets/images/activebts/one.png","assets/images/activebts/two.png","assets/images/activebts/three.png","assets/images/activebts/four.png","assets/images/activebts/five.png","assets/images/activebts/six.png","assets/images/activebts/seven.png","assets/images/activebts/eight.png","assets/images/activebts/nine.png","assets/images/activebts/ten.png","assets/images/level/activeone.png","assets/images/level/activetwo.png","assets/images/level/activethree.png","assets/images/level/deactivethree.png","assets/images/level/deactivetwo.png","assets/images/level/decativeone.png","assets/images/level/fiveact.png","assets/images/level/fouract.png","assets/images/level/fourdecact.png","assets/images/level/levelbg.jpg","assets/images/level/popup_ok_active.png","assets/images/level/popup_ok_deactive.png","assets/images/level/settingdeactive.png","assets/images/level/settingsactive.png","assets/images/level/infoact.png","assets/images/level/infodeact.png","assets/images/login/active.png","assets/images/login/decative.png","assets/images/login/loginbg.png","assets/images/login/logininput.png","assets/images/normalbtns/one.png","assets/images/normalbtns/two.png","assets/images/normalbtns/three.png","assets/images/normalbtns/four.png","assets/images/normalbtns/five.png","assets/images/normalbtns/six.png","assets/images/normalbtns/seven.png","assets/images/normalbtns/eight.png","assets/images/normalbtns/nine.png","assets/images/normalbtns/ten.png"];

$(document).ready(function(){
if(isIE || isFirefox){
	$('#userName').val('');
}	
});

if (navigator.platform.toLowerCase().indexOf("win") !== -1 && navigator.userAgent.toLowerCase().indexOf("touch") !== -1) { 
		// Listen for orientation changes
		window.addEventListener("resize", function() {
		  // Announce the new orientation number
		  if(window.innerHeight > window.innerWidth){
			 alert("Screen orientation changed! Please rotate the screen to continue...");
			}
		}, false);

}
if(loadgif != "undefined"){
	clearTimeout(loadgif);
}

if(loadscreen != "undefined"){
	clearTimeout(loadscreen);
}


  

setTimeout(enableinitialscreenloading,1200);
if(isTouchDevice){
	setTimeout(enableinitialscreen,7500);
}else{
setTimeout(enableinitialscreen,6500);
}
function enableinitialscreenloading(){
	$(".loading").show();
	$(".loading img").attr('src','')
	$(".loading img").attr('src',"assets/images/load.gif?"+new Date().getTime())
}
function enableinitialscreen(){
init();
}
if(isTouchDevice){
		document.addEventListener('deviceready', onDeviceReady, false);
    }
	else{
		AudioManager.createAudio();
		MusicManager.createAudio();
		AudioManager.createspeakerAudio();
		preloadImages();
		
		$('#quitGameBtn').off('click').on('click', function() {
			StaticLibrary.audioForClick();
			window.close(); 
		});
    }	

    
    function onDeviceReady()
    {

	    AudioManager.createAudio();
		MusicManager.createAudio();
		AudioManager.createspeakerAudio();
		preloadImages();
		
    	document.addEventListener("backbutton", function(e){
    		if($("#finalScreen").css("display") == "block"){
            	$('#menuPopup').show();
           		MusicManager.playAudio(StaticLibrary.SW_BG_Loop)
				$('#finalScreen').addClass('blur'); 
				enable = false;
			}
			else if($("#work").css("display") == "block"){
				$('#quitPopup').show();
				$("#videoCon").addClass("blur");
			}else if($("#levelScreen").css("display") == "block"){
				$('#quitPopup').show();
				$("#levelScreen").addClass("blur");
			}
			else if($("#loginScreen").css("display") == "block"){
				$('#quitPopup').show();
				$("#loginScreen").addClass("blur");
			}
			else{
			$('#quitPopup').show();
			}
	    }, false);
    
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
		$('#keepPlayBtn').off('click').on('click', function() {
        	$('#quitPopup').hide();
        	$("#levelScreen, #videoCon, #loginScreen").removeClass("blur");
			StaticLibrary.audioForClick();
    	});
    }	
/* var loginPage = function(){
	
	var apiService = new APIService();
		apiService.loadAppConfig("assets/data/appConfig.json", "true", "json", appConfigErrorHandler, appConfigSuccessHandler);
} */


function preloadImages(){

	for(var i=0;i<preloadImageArr.length;i++){
		var imageObj = new Image();
		imageObj.src = preloadImageArr[i];
		imageObj.addEventListener('load',onImageLoadAndErr,false);
		imageObj.addEventListener('error',onImageLoadAndErr,false);
	}
}

function onImageLoadAndErr(){
	imageCount++;
	if(imageCount == preloadImageArr.length){
		//console.log('Image Load Completed');
		$("#preloaderContainer").hide();
		$("#mainContainer").show();
		//loginPage();
		//init();
	}
}
/* 
function appConfigErrorHandler(error){
	//console.log(":: Application configuration loading Failed ::");
	//console.log(error);
}

function appConfigSuccessHandler(data){
	
	//console.log(":: Application configuration loading Completed ::");
	_model.setAppConfigData(data.appConfig.data);
	
	var loginObj = new LoginController();
		loginObj.init(); 
} */

function init(){

	var loginObj = new LoginController();
		loginObj.init();

	
}