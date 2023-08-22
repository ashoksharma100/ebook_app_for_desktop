(function () {
	
	var WordInfo = function () {

		var total = 0;
		var sql = TAFFY();
		var letter_arr = [];
		var openWord = function (word) {
			items(word);
		};
		var currentWord = {};
		function items(word) {
			var result = sql({word : word}).first();
			
			currentWord = result;
			if(result.resource == 'image') {
				$("#view-image").css('width', '');
				$("#view-image").off().on("load", validateSize);
				var imagepath = "resources/images/" + word + ".jpg";
				$(".word-graphics-box").find("#view-image").attr("src", imagepath);
				$(".word-graphics-box").find("#full-screen-image").attr("href", imagepath);
				$(".image-container").show();
				$(".video-container").hide();
				
			}
			if(result.resource == 'video') {
				var videopath = videopathz + word + "." + "ogv";
				var videopath1 = videopathz + word + "." + "mp4";
				var videoHTML = '<video width="320" height="240" preload="true" controlsList="nodownload"><source src="' + videopath + '" type="video/ogg"><source src="' + videopath1 + '" type="video/mp4"></video>';

				$(".image-container").hide();
				$(".video-container").show();
				
				$(".word_video").html(videoHTML);

				// calculate area for showing video
				var objCom = {
					containerHeight: $(".word-graphics-box").height() - 15,
					containerWidth: $(".word-graphics-box").width(),
					itemWidth: VIDEO_SCALE.WIDTH,
					itemHeight: VIDEO_SCALE.HEIGHT
				}
				var size = calculateAspectRatioFit(objCom.itemWidth, objCom.itemHeight, objCom.containerWidth, objCom.containerHeight);
				setVideoControls();
				$(".video-container").find('video')
					.height(size.height + 'px')
					.width(size.width + 'px')
					.load();
			}
			result.speech = $.trim(result.speech);
			result.meaning = $.trim(result.meaning);
			result.antonyms = $.trim(result.antonyms);
			result.synonyms = $.trim(result.synonyms);
			result.usage = $.trim(result.usage);
			
			$("#data-speech").html('(' + result.speech + ')');
			$("#data-word").html(word);
			var audiopath = "resources/audios/" + word + ".mp3";
			//var audiopath = audioLib[word];
			
			if(result.meaning == undefined || result.meaning == null || result.meaning == "") {
				$(".meaning-section").hide();
			} else {
				$(".meaning-section").show();
				$(".meaning-section .desc-info").html(result.meaning);
			}

			if(result.usage == undefined || result.usage == null || result.usage == "") {
				$(".usage-section").hide();
			} else {
				$(".usage-section").show();
				$(".usage-section .desc-info").html(result.usage);
			}
			
			if(result.antonyms == undefined || result.antonyms == null || result.antonyms == "") {
				$(".antonyms-section").hide();
			} else {
				$(".antonyms-section").show();
				$(".antonyms-section .desc-info").html(result.antonyms);
			}
			
			if(result.synonyms == undefined || result.synonyms == null || result.synonyms == "") {
				$(".synonyms-section").hide();
			} else {
				$(".synonyms-section").show();
				$(".synonyms-section .desc-info").html(result.synonyms);
			}
			
			$("#play_audio").off().on('click', function (e) {
				stopAllAudio();
				$("#play_audio").find("audio").remove();
				$('<audio autoplay="autoplay" src="' + audiopath + '"></audio>').appendTo("#play_audio");
			});
			window.audiopathtemp = audiopath;
			refreshAudioList();

		}
		var diffIndexes = [];

		var addWord = function (wordObj) {

			var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
			var difference = $(alpha).not(letter_arr).get();
			for (var i = 0; i < alpha.length; i++) {
				$("<li><div><a>" + alpha[i] + "</a></div></li>").appendTo("#letters-list");
			}

			$("#letters-list li a").each(function () {
				//var codes = ["US-AL", "US-AZ", ... ];
				var letter = $(this).text();
				if ($.inArray(letter, difference) > -1) {
					$(this).parent().parent().addClass('disabledLetter');
				}
				i++;
			});

			var topval = 0;
			$(".nav").on("click", function () {
				var letterContainer = document.getElementById('letters-list');
				var topValMax = letterContainer.scrollHeight - letterContainer.clientHeight;

				//var topValPos = window.getComputedStyle($("#letters-list li:first")[0]).top;
				var topValPos = $("#letters-list").scrollTop();
				if(topValPos == "auto") {
					topValPos = 0;
				}

				topval = Math.abs(parseInt(topValPos));
				

				var scrollHeight = $("#letters-list > li:first-child").outerHeight(true);
				if ($(this).attr("id") == "down") {
					if (topval < topValMax) {
						topval = topval + scrollHeight;
					}
				}
				if ($(this).attr("id") == "up") {
					if (topval) {
						topval = topval - scrollHeight;
					}
				}
				if (topval <= topValMax) {
					$("#letters-list").animate({
						scrollTop : topval + 'px'
					}, 10, function () {})
				}
			});
			var x = sql().count();
			//console.log(wordObj);
			var i = 0;
			var arr1 = [];
			sql().each(function (r) {
				if (r.letter == "A") {
					arr1.push(r.word);
					//$("<li><a>"+r.word+"</a></li>").appendTo(".words");
					//i++;
				}
			});
			arr1.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});
			for (var i = 0; i < arr1.length; i++) {
				$("<li><a>" + arr1[i] + "</a></li>").appendTo(".words");
			}

		};
		var showFirstItem = function (word) {
			items(word);
		}
		var displayWordFor = function (letter) {
			// write code to filter out words as per letter
			//alert(letter);
			$("#display_words").empty(); // use id instead of class
			var arr = [];
			sql({
				letter : letter
			}).each(function (r) {
				arr.push(r.word);
				//$("<li><a>"+r.word+"</li>").appendTo("#display_words");	// same here
			});
			arr.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});
			//showFirstItem(arr[0]);
			for (var i = 0; i < arr.length; i++) {
				$("<li><a>" + arr[i] + "</a></li>").appendTo("#display_words");
			}
		}

		var searchWord = function (text) {
			var resultArr = [];
			
			//show only those matching user input:
			sql().each(function (r) {

				var systemword = r.word.toLowerCase();
				var userword = text.toLowerCase();
				if(systemword.indexOf(userword) != -1)
					resultArr.push(r.word);
			});
			resultArr.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});

			for (var i = 0; i < resultArr.length; i++) {
				$("<li><a>" + resultArr[i] + "</a></li>").appendTo(".words");
			}

			$.showitems();
		}
		return {
			count : function () {
				sql().count();
			},

			addWords : function (wordsArr) {

				for (var i = 0; i < wordsArr.length; i++) {
					var letter = wordsArr[i].word.slice(0, 1).toUpperCase();
					wordsArr[i]['letter'] = letter;
					//console.log("ggg"+letter);
					letter_arr.push(letter);
					sql.insert(wordsArr[i]);

				}
				//console.log(letter_arr);
				addWord(wordsArr);

			},

			getWords : function () {
				return sql()
			},

			filterWords : function (letter) {
				displayWordFor(letter);
			},
			filteritems : function (word) {
				openWord(word);
			},
			searchItem : function (text) {
				searchWord(text);
			},
			getCurrentWord: function() {
				return sql({id: currentWord.id}).first();
			},
			addAudio: function(audiopath) {
				var currentWordObj = sql({id: currentWord.id}).first();
				var audioList = [];
				audioList.push(audiopath);

				if(currentWordObj.audio == undefined || currentWordObj.audio.length < 5) {
					if(typeof currentWordObj.audio === "object") {
						audioList.push.apply(audioList, currentWordObj.audio);
						console.log('arr ', audioList);
					} else {
						currentWordObj.audio = audioList;
					}
				} else {

				}
				sql({id: currentWord.id}).update({audio: audioList});
			},
			saveRecentList: function(recentlist) {
				if(recentlist.length != 0) {
					window.localStorage.setItem('vocabulary_recentlist', JSON.stringify(recentlist));
				}
			},
			saveFavList: function(list) {
				if(list.length != 0) {
					window.localStorage.setItem('vocabulary_favlist', JSON.stringify(list));
				} else {
					window.localStorage.removeItem('vocabulary_favlist');
				}
			},
			getOfflineList: function (key) {
				var result = [];
				if(window.localStorage.getItem(key) != undefined && window.localStorage.getItem(key) != null) {
					result = JSON.parse(window.localStorage.getItem(key));
				}
				return result;
			}
		}
	}

	var root = typeof exports !== "undefined" && exports !== null ? exports : window;
	root.wordInfo = WordInfo();
}).call(this);