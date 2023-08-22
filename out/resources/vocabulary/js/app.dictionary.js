/*
* Author: Ashok Shah
* Date: 22/9/2017
* https://www.shahnashok.com
*/

var rec = "";
var audioChunks = [];
var recordingStatus = false;
var wavesurfer;
var waveuser;
var masteraudiouser;
var isChrome = !!window.chrome && !!window.chrome.webstore;
isChrome = false;
var activepage="a";
var msg = "ºè®º·";


$(document).ready(function(e) {

	$(".theme-a, .theme-b, .theme-c").hide();
	$(".theme-a").show();

	wordInfo.addWords(MASTER_DATA);
	var hit_list = wordInfo.getOfflineList('vocabulary_recentlist');
	var favourite_list = wordInfo.getOfflineList('vocabulary_favlist');
	if(favourite_list.length > 0) {
		$("#favourite_list.favourite-disabled").removeClass('favourite-disabled');
	}
	
	var $letters = $("#letters-list li").not(".disabledLetter").find('a');
	$letters.on('click', function(e) {
		$("#favourite_list, #recent_list").removeClass('current');
		playAudio('mouse-click');
		var letter = $.trim(this.textContent);
		wordInfo.filterWords(letter);
		$.showitems();
		activepage = letter;
		scrollTopSections();
		if(!isMobile()) {
			$("#display_words li:first a").trigger('click');
		}
	});

	$.showitems = function(){
		playAudio('mouse-over');
		$("#display_words a").on('click', function(e) {
			var word = $.trim(this.textContent);
			wordInfo.filteritems(word);
			if(hit_list.indexOf(word) != -1) {
				var index = hit_list.indexOf(word);
				hit_list.splice(index, 1);
			}
			hit_list.unshift(word);
			wordInfo.saveRecentList(hit_list);
			$("#display_words .active").removeClass('active');
			$(this).addClass('active');
			if(favourite_list.indexOf(word) == -1){
				$("#add_fav").find(".fa").removeClass("fa-star").addClass("fa-star-o");
				$("#add_fav").attr("set-data",0).find("span").html("Add to<br/> Favourites");
			} else {
				$("#add_fav").find(".fa").removeClass("fa-star-o").addClass("fa-star");
				$("#add_fav").attr("set-data",1).find("span").html("Remove from<br/> Favourites");
			}

			// for mobile app
			if(isMobile()) {
				$("#frame-body").show();
				var offsetTop = $("#frame-body").offset().top;
				$('html, body').animate({
					scrollTop: offsetTop + 'px'
				});
			}

			//scrollTopSections();
			$("#info-desk .panel-body").animate({scrollTop: 0}, "fast");
		});
	}
	$.showitems();



	
	$("#add_fav").on('click',function(e){
		if($(this).attr("set-data")=="0")
		{
			$(this).find(".fa").removeClass("fa-star-o").addClass("fa-star");
			$(this).find("span").html("Remove from<br/> Favourites");
			//$(this).append("<div class='favourite-container'><img src='img/favourites.png'></div>")
			favourite_list.push($(this).parent().find("span").first().html());
			favourite_list.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});
			$("#favourite_list.favourite-disabled").removeClass('favourite-disabled');
			$(this).attr("set-data",1);
			//console.log(arr);
		}
		else
		{
			$(this).find(".fa").removeClass("fa-star").addClass("fa-star-o");
			$(this).find("span").html("Add to<br/> Favourites");
			var indexOfFav = favourite_list.indexOf($(this).parent().find("span").first().html());
			favourite_list.splice(indexOfFav, 1);
			if(favourite_list.length == 0) {
				$("#favourite_list").addClass('favourite-disabled');
			}
			$(this).attr("set-data",0);
			//console.log(arr);
		}
		favourite_list = getUniqueArray(favourite_list);
		wordInfo.saveFavList(favourite_list);
		if(activepage == "favourite") {
			$("#display_words").empty();
			for(var i=0;i<favourite_list.length;i++){
				$("<li><a>"+favourite_list[i]+"</a></li>").appendTo(".words");
				$.showitems();
			}
		}
	});

	$("#favourite_list").on('click',function(e){
		if(!$(this).hasClass('favourite-disabled')) {
			$("#recent_list").removeClass('current');
			$("#favourite_list").addClass("current");
			$("#display_words").empty();
			for(var i=0;i<favourite_list.length;i++){
				$("<li><a>"+favourite_list[i]+"</a></li>").appendTo(".words");
				$.showitems();
			}
			activepage = 'favourite';
		}
	});

	$("#recent_list").on('click',function(e){
		$("#favourite_list").removeClass('current');
		$("#recent_list").addClass("current");
		/*
		var map = hit_list.reduce(function (p, c) {
			p[c] = (p[c] || 0) + 1;
			return p;
		}, {});

		var newTypesArray = Object.keys(map).sort(function (a, b) {
			return map[a] < map[b];
		});
		newTypesArray.slice(0,10);
		*/
		var recentListData = hit_list.slice(0, 10);

		//$("#display_words").empty();
		var recentHTML = "";
		for(var i=0; i<recentListData.length; i++){
			recentHTML += "<li><a>"+recentListData[i]+"</a></li>";
			//$("<li><a>"+recentListData[i]+"</a></li>").appendTo(".words");
		}
		$("#display_words").html(recentHTML);
		$.showitems();
		activepage = 'recent';
	});

	$(".theme-btn").on('click',function(e){
		$(".theme-btn").removeClass("active");
		$(this).addClass("active");
		var id=$(this).attr("id").split('_')[1];
		var themepath = "css/theme-"+id+".css";
		document.getElementById('theme-style').href = themepath;
		localStorage.setItem('vocabulary_theme', id);
		$(".theme-a, .theme-b, .theme-c").hide();
		$(".theme-" + id).show();
	});

	$(".form-control").bind("keyup", function() {
		$(".words").empty();
		var text = $(this).val().toLowerCase();
		wordInfo.searchItem(text);
	});

	if(!isMobile()) {
		$("#display_words").slimScroll({height: '98%', width: '96%', alwaysVisible: true});
	}
	



	var width = $('body').width();
	if(width<768) {

	} else {
		$("#display_words li:first a").trigger('click')
	}
	

	var heightArray = [];
	var boxHeight = $("#letters-list > li:first-child").outerHeight(true);
	for(var i=0; i<26; i++) {
		heightArray.push(i * boxHeight);
	}

	$(window).resize(function() {
		var goal = $(".letters-container").height() - 100;

		var closestData = getClosestHeight(heightArray, goal);
		var closestHeight = closestData.result;
		var difference = (goal - closestHeight)/2;
		
		$("#letters-list").css("margin-top", difference + 'px');
		$("#letters-list").css("margin-bottom", difference + 'px');
		$("#letters-list").height(closestHeight + 'px');
	}).resize();

	$("#record_audio").on('click', function(e) {
		$('#audio-recorder-modal').modal({backdrop:'static'});
		if(!(isChrome && window.location.protocol == "file:")) {
			setTimeout(function() {
				wavesurfer.load(window.audiopathtemp);
				$('.audio-selection').change();
			}, 500)
		}
		//getRequestForRecording();
	});

	$("#audio-expert").on('click', function(e) {
		if(window.location.protocol == "file:") {
			$("#play_audio").trigger('click');
		} else {
			stopAllAudio();
			wavesurfer.play();
		}
	});

	$("#audio-record-user").on('click', function(e) {
		if(!recordingStatus) {
			getRequestForRecording();
		} else {
			rec.stop();
			this.textContent = "Record Audio";
			recordingStatus = false;
		}
	});

	$("#light-box-wrapper").lightGallery(); 

	if(navigator.mediaDevices == null || navigator.mediaDevices == undefined) {
		$("#record_audio").remove();
	}

	var oldtheme = window.localStorage.getItem('vocabulary_theme');
	if(oldtheme != undefined && oldtheme != null && oldtheme != "") {
		var themepath = "css/theme-"+oldtheme+".css";
		$("#theme-style").attr('href', themepath);
		$(".theme_buttons .active").removeClass('active');
		$("#btn_" + oldtheme).addClass('active');
		$(".theme-a, .theme-b, .theme-c").hide();
		$(".theme-" + oldtheme).show();
	}


	$("#btn-video-play").on('click', manageVideo);
	$("#full-screen-video").on('click', fullScreenVideo);
	$("#video-slider-bar").on('click', function(e) {
		var vid = $(".word_video video")[0];
		var offset = $(this).offset();
		var left = (e.pageX - offset.left);
		var totalWidth = $(this).width();
		var percentage = ( left / totalWidth );
		var vidTime = vid.duration * percentage;
		vid.currentTime = vidTime;
	});

	setTimeout(function() {
		$("#loading-bar").fadeOut();
	}, 2000);


	exitIfEsc();
});

function fullScreenVideo () {
	var vid = $(".word_video video")[0];
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen();
    }
}

function setVideoControls() {

	var $video = $(".word_video video");

	// on video paused
	$video.on('pause', function() {
		$("#btn-video-play a").removeClass('fa-pause');
		$("#btn-video-play a").addClass('fa-play');
	});

	// on video ends
	$video.on('ended', function() {
		$("#btn-video-play a").removeClass('fa-pause');
		$("#btn-video-play a").addClass('fa-play');
	});

	// on video ends
	$video.on('timeupdate', function() {
		var progress = $video[0].currentTime;
		var duration = $video[0].duration;
		
		var width = ((progress/duration) * 100) + '%';
		$("#video-slider").width(width);
	});

	// default state
	$("#btn-video-play a").removeClass('fa-pause');
	$("#btn-video-play a").addClass('fa-play');
	$("#video-slider").width(0 + '%');
}

function manageVideo () {
	var $video = $(".word_video video");

	if($("#btn-video-play a").hasClass('fa-pause')) {
		$video[0].pause();
		$("#btn-video-play a").removeClass('fa-pause');
		$("#btn-video-play a").addClass('fa-play');
	} else {
		$video[0].play();
		$("#btn-video-play a").removeClass('fa-play');
		$("#btn-video-play a").addClass('fa-pause');
	}
}

function getRequestForRecording() {
	
	//if(typeof rec !== "object")
	{
		navigator.mediaDevices.getUserMedia({audio:true})
		.then(stream => {
			// permission granted
			if(stream.getAudioTracks().length > 0){
				// has recording device
				rec = new MediaRecorder(stream);
				
				rec.ondataavailable = e => {
					audioChunks.push(e.data);
					if (rec.state == "inactive"){
						var blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
						
						var aud = document.createElement('audio');
						aud.src = URL.createObjectURL(blob);
						aud.controls=true;
						wordInfo.addAudio(aud.src);
						/*
						$deletebtn = $("<button class='audio-del-btn'/>");
						$deletebtn.html("<i class='fa fa-trash'></i>");
						$deletebtn.on('click', function(e) {
							$(this).parent('div').remove();
						});

						var $div = $("<div/>");

						$div.append($deletebtn);
						$div.append(aud);
						//$("#audio-container").prepend($div);
						var audioHTML = "<button onClick='playUserWave(\"" + aud.src + "\")'>Audio</button>";
						$("#audio-container").append(audioHTML);
						

						if($("#audio-container > div").length >= 6) {
							$("#audio-container > div:last-child").remove();
						}
						*/
						refreshAudioList();

					}
				}
				
				audioChunks = [];
				rec.start();
				$("#audio-record-user")[0].textContent = "Stop Recording";
				recordingStatus = true;
			}else{
				// does not have recording device.
				swal(
					'',
					'Recording device not available! Please connect the recording device and try again.',
					'question'
				).then(function() {
					//$("#audio-recorder-modal").modal('hide');
				})
			}
		})
		.catch(e=> {
			console.log(e);
			swal(
				'',
				'Recording device not available! Please connect the recording device and try again.',
				'question'
			).then(function() {
				//$("#audio-recorder-modal").modal('hide');
			})
		});
	}

}

function getUniqueArray(arr) {
	var unique = arr.filter(function(elem, index, self) {
		return index == self.indexOf(elem);
	});
	return unique;
}

function playAudio(name) {
	//document.getElementById(name).play();
}

function quitBrowswer() {
	window.close();
}


if(!(isChrome && window.location.protocol == "file:")) {
	wavesurfer = WaveSurfer.create({
		container: '#expert-voice',
		waveColor: '#fffb00',
		barWidth: 2,
    	progressColor: '#fa7500'
	});

	waveuser = WaveSurfer.create({
		container: '#user-voice',
		waveColor: '#27ca0a',
		barWidth: 2,
    	progressColor: '#357829'
	});
} else {
	$(".expert-container, .user-container").hide();
}

function playUserWave(audpath) {
	waveuser.on('ready', function () {
		waveuser.play();
	});
	waveuser.load(audpath);	
}

function loadUserWave(audpath) {
	if(!isChrome) {
		waveuser.load(audpath);	
	}
}

function playUserAudio () {
	stopAllAudio();
	if(!isChrome) {
		waveuser.play();
	} else {
		var audiosrc = $("#audio-selection-bar").val();
		masteraudiouser = new Audio(audiosrc);
		masteraudiouser.play();
	}
}

function refreshAudioList () {
	var audios = wordInfo.getCurrentWord().audio;
	$("#audio-container").empty();
	$("#user-voice").hide();
	$('.user-container').hide();
	if(audios != null && audios != undefined && audios != "") {
		if(audios.length > 0) {
			$("#user-voice").show();
			$('.user-container').show();
			var revaudios = audios;
			if(audios.length > 5) {
				var len = audios.length;
				var diff = len - 5;
				revaudios = audios.slice(diff, len);
			}
			

			var $select = $("<select onChange='loadUserWave(this.value)' id='audio-selection-bar' class='audio-selection'/>");
			for(var i=0; i<revaudios.length; i++) {
				$select.append("<option value='" + revaudios[i] + "'>Recording " + (revaudios.length-i) + "</option>");
			}
			$("#audio-container").html($select);
			$("#audio-container").append('<button type="button" id="audio-user" onClick="playUserAudio()" class="btn btn-default">Play Recording</button>');
			//var audiobar = document.getElementById('audio-selection-bar');
			//audiobar.options.selectedIndex = audiobar.options.length - 1;
			$('.audio-selection').change();
			if(isChrome) {
				$(".user-container").hide();
			}
		}
	}
	
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
}

document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);

function onFullScreenChange() {
	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if(fullscreenElement == false || fullscreenElement == null)  {
		$('.word_video video').removeAttr('controls');
	} else {
		$('.word_video video').attr('controls', 'controls')
	}
}


function setHeightFix() {

	// description body
	var infoHeight = $("#info-desk").height() - $("#info-desk > .panel-heading").height() - 0;
	$("#info-desk > .panel-body").css('height', infoHeight + 'px');

	// video frame
	var objCom = {
		containerHeight: $(".word-graphics-box").height() - 15,
		containerWidth: $(".word-graphics-box").width(),
		itemWidth: VIDEO_SCALE.WIDTH,
		itemHeight: VIDEO_SCALE.HEIGHT
	}
	var size = calculateAspectRatioFit(objCom.itemWidth, objCom.itemHeight, objCom.containerWidth, objCom.containerHeight);

	$(".video-container").find('video')
		.height(size.height + 'px')
		.width(size.width + 'px')

}

$(window).on('resize', function() {
	setHeightFix();
}).resize();



function isMobile() {
	var width = $("body").width();
	return (width < 768) ? true : false;
}

function stopAllAudio() {
	
	if(!isChrome) {
		wavesurfer.stop();
		waveuser.stop();
	}
	try {

		wavesurfer.stop();
		waveuser.stop();
		if($("#play_audio audio").length != 0) {
			$("#play_audio audio")[0].pause();
			$("#play_audio audio")[0].currentTime = 0;
		}
	} catch(err) {
		console.log(err);
	}

	try {
		if(masteraudiouser != undefined && masteraudiouser != null) {
			masteraudiouser.pause();
			masteraudiouser.currentTime = 0;
		}
	} catch(err) {
		console.log(err);
	}
	
}

function validateSize() {
	var imageContainerWidth = $(".image-container").width() - 20;
	var imageWidth = $("#view-image").width();
	//console.log(imageContainerWidth, imageWidth);
	if(imageContainerWidth < imageWidth) {
		$("#view-image").css('width', imageContainerWidth + 'px')
	}
}

function scrollTopSections() {
	$("#info-desk .panel-body").animate({scrollTop: 0}, 10)
	$('#display_words').animate({ scrollTo : '0px' }, 10);
	try {
		$('#display_words').slimScroll({ scrollTo : '0px', alwaysVisible: true });
	} catch(err) {
		console.log(err);
	}
}

function exitIfEsc() {
	$(window).on("keyup", function(e) {
		if(e.keyCode == 27) {
			if($(".modal-backdrop.in").length == 0)
				$("#quit").modal('show', {
					backdrop: 'static'
				});
		}
	});
}


setTimeout(function() {
	$.holdReady(false);
}, 2000);


function getClosestHeight(arr, goal) {
	var result = 0;
	var index = -1;
	for(var i=0; i<arr.length; i++) {
		var num = arr[i];
		if(num < goal) {
			result = num;
			index = i;
		} else {
			break;
		}
	}
	return {result: result, index: index};
}

document.addEventListener('contextmenu', event => event.preventDefault());
$(document).keydown(function(event){
	if(event.keyCode==123){
		return false;
	}
});