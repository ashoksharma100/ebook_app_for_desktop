
var AudioManager = function() {
	
}

AudioManager._audioElement;
AudioManager._audmy_media;
AudioManager._speakerElement;
AudioManager._spkmy_media;
AudioManager._flagAudio = false;


AudioManager.createAudio = function(){
    AudioManager._audioElement = document.createElement('audio');
}

AudioManager.playAudio = function(currentAudioPath){

    var supportLevel = AudioManager._audioElement.canPlayType('audio/mp4');

    if( (supportLevel == "probably") || (supportLevel == "maybe") ){
        currentAudioPath = currentAudioPath + ".mp3";
    }else{
        currentAudioPath = currentAudioPath + ".ogg";
    }
	if(!AudioManager._flagAudio){
			if(isAndroid && AndroidVersion < 5){
		
			url1 = '/android_asset/www/' + currentAudioPath;
			
			if(AudioManager._audmy_media){ 
		       AudioManager._audmy_media.stop();
       		   AudioManager._audmy_media.release();
		     }			
		     
//			AudioManager._audmy_media = null ;
			AudioManager._audmy_media = new Media(url1, 
			function () {
				//console.log("done");
			},
			function (err){
				//console.log(err);
			});
	
		AudioManager._audmy_media.play();
		
		}else{
			$(AudioManager._audioElement).attr('src',"");
			$(AudioManager._audioElement).attr('src',currentAudioPath);
			AudioManager._audioElement.load();
			AudioManager._audioElement.play();
		}
	}
}

AudioManager.stopAudio = function(){
	if(isAndroid && AndroidVersion < 5){
	
		AudioManager._audmy_media.stop();
	}
	else{
    	AudioManager._audioElement.pause();
    	AudioManager._audioElement.currentTime = 0;
	}
}
AudioManager.mutedAudio = function(){
    //AudioManager._audioElement.muted = true;
	AudioManager._flagAudio = true;
	//AudioManager._audioElement.volume = 0;
}

AudioManager.unmutedAudio = function(){
   // AudioManager._audioElement.muted = false;
	AudioManager._flagAudio = false
	//AudioManager._audioElement.volume = 1;
}


AudioManager.createspeakerAudio = function(){
    AudioManager._speakerElement = document.createElement('audio');
}
AudioManager.playspeakerAudio = function(currentAudioPath){

    var supportLevel = AudioManager._speakerElement.canPlayType('audio/mp4');

    if( (supportLevel == "probably") || (supportLevel == "maybe") ){
        currentAudioPath = currentAudioPath + ".mp3";
    }else{
        currentAudioPath = currentAudioPath + ".ogg";
    }
	if(isAndroid && AndroidVersion < 5){
		
		url2 = '/android_asset/www/' + currentAudioPath;
		
		
		if(AudioManager._spkmy_media){ 
		       AudioManager._spkmy_media.stop();
       		   AudioManager._spkmy_media.release();
		     }
		
		//AudioManager._spkmy_media = null ;
		
		AudioManager._spkmy_media = new Media(url2, 
		function () {
			//console.log("done");
		},
		function (err){
			//console.log(err);
		});
	
		AudioManager._spkmy_media.play();
		
	}else{
    	$(AudioManager._speakerElement).attr('src',"");
  	    $(AudioManager._speakerElement).attr('src',currentAudioPath);
    	AudioManager._speakerElement.load();
    	AudioManager._speakerElement.play();
	}
}
AudioManager.stopspeakerAudio = function(){
    AudioManager._speakerElement.pause();
    AudioManager._speakerElement.currentTime = 0;
}

AudioManager.mutedspeakerAudio = function(){
    AudioManager._speakerElement.muted = true;
	//AudioManager._speakerElement.volume = 0;
}

AudioManager.unmutedspeakerAudio = function(){
    AudioManager._speakerElement.muted = false;
    //AudioManager._speakerElement.volume = 1;
}
