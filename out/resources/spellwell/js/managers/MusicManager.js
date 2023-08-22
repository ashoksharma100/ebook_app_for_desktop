
var MusicManager = function() {
	
}

MusicManager._audioElement;
MusicManager._my_media;
MusicManager._flag = false;

MusicManager.createAudio = function(){
    MusicManager._audioElement = document.createElement('audio');
}

MusicManager.playAudio = function(currentAudioPath){

    var supportLevel = MusicManager._audioElement.canPlayType('audio/mpeg');

    if( (supportLevel == "probably") || (supportLevel == "maybe") ){
        currentAudioPath = currentAudioPath + ".mp3";
    }else{
        currentAudioPath = currentAudioPath + ".ogg";
    }

	if(!MusicManager._flag){
		if(isAndroid && AndroidVersion < 5){
		
			url = '/android_asset/www/' + currentAudioPath;
			
			if(MusicManager._my_media){ 
		       MusicManager._my_media.stop();
       		   MusicManager._my_media.release();
		     }			
	
			MusicManager._my_media = new Media(url, 
			function () {
				//console.log("done");
			},
			function (err){
				//console.log(err);
			},onStatus);
	
		MusicManager._my_media.play();
		
		}else{
			$(MusicManager._audioElement).attr('src',"");
			$(MusicManager._audioElement).attr('src',currentAudioPath);
			MusicManager._audioElement.loop = true;
			MusicManager._audioElement.load();
			MusicManager._audioElement.play();		
		
		}
	}    
}

// onStatus Callback 
    function onStatus(status) {
        if( status==Media.MEDIA_STOPPED ) {
        	if(!MusicManager._flag){
            MusicManager._my_media.play();
            }
        }
    }
	
	
MusicManager.stopAudio = function(){
	if(isAndroid && AndroidVersion < 5){
		MusicManager._my_media.pause();
	}else{
   		MusicManager._audioElement.pause();
    	MusicManager._audioElement.currentTime = 0;
	}
}

MusicManager.mutedAudio = function(){
   // MusicManager._audioElement.muted = true;
	MusicManager._flag = true;
	//MusicManager._audioElement.volume = 0;
}

MusicManager.unmutedAudio = function(){
    //MusicManager._audioElement.muted = false;
	MusicManager._flag = false;
	//MusicManager._audioElement.volume = 1;
}
