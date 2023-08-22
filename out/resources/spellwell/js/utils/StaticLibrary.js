/**
 * Created by is4823 on 12/15/2015.
 */

var StaticLibrary = function(){
	
}

StaticLibrary.SW_BG_Loop = "assets/media/audio/genric/SW_BG_Loop"
StaticLibrary.SW_Button_Click = "assets/media/audio/genric/SW_Button_Click"
StaticLibrary.SW_Correctanswer = "assets/media/audio/genric/SW_Correctanswer"
StaticLibrary.SW_LettersClick = "assets/media/audio/genric/SW_LettersClick"
StaticLibrary.SW_WordComplete = "assets/media/audio/genric/SW_WordComplete"
StaticLibrary.SW_WrongOptionLetter = "assets/media/audio/genric/SW_WrongOptionLetter"


StaticLibrary.audioForClick = function () {
	AudioManager.playAudio(StaticLibrary.SW_Button_Click)
}
StaticLibrary.detectDevice = function(){

    var isIPAD = (/iPad|iPhone/i.test(navigator.userAgent)); // IPAD
    var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");

    if(isIPAD || isAndroid)
        return true;
    else
        return false;
}

function testBrowser_Fn(prop)
{
    return prop in document.documentElement.style;
}
StaticLibrary.findDeviceBrowser = function(){

	var isFirefox = testBrowser_Fn('MozBoxSizing'); // FF 0.8+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var isChrome = !this.isSafari && testBrowser_Fn('WebkitTransform'); // Chrome 1+
	var isIE = /*@cc_on!@*/ false || testBrowser_Fn('msTransform'); // At least IE6
	var isIPAD = (/iPad|iPhone/i.test(navigator.userAgent)); // IPAD
	var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
	var isMac=navigator.appVersion.indexOf("Mac")!=-1//MAC
	var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1;
	var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod") > -1;
	
    if(isIPAD)
        return "Ipad";
    else if(isiPhone)
        return "iPhone";
    else if(isiPod)
        return "iPod";
    else if(isAndroid)
        return "Android";
	else if(isChrome)
		return "Chrome browser";
	else if(isSafari)
		return "Safari browser";
	else if(isFirefox)
		return "Firefox browser";
	else if(isIE)
		return "IE browser";
	else if(isMac)
		return "Mac browser";
}
StaticLibrary.findDevice = function(){

    var isIPAD = (/iPad|iPhone/i.test(navigator.userAgent)); // IPAD
    var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");

    if(isIPAD)
        return "IOS";
    else if(isAndroid)
        return "Android";
	else
	    return "Desktop";
}

StaticLibrary.generateRandom = function(){
    return Math.random() * 10000;
}

// Function that validates email address through a regular expression.
StaticLibrary.validateEmail = function(getData) {
	var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if (filter.test(getData)) {
		return true;
	}
	else {
		return false;
	}
}

// Function to check whether it is runnning in Online or Offline.
StaticLibrary.checkStatus = function(){
	if(navigator.onLine)
		return "Online";
	else
		return "Offline";
}


