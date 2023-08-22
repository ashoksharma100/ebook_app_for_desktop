
var gameConfig = {};
const TOTAL_Q = 7;

$(document).ready(function(e) {  

    $("#btn-restart").click(function(e) {
        window.location.reload();
    });

    var videoObj = {
        level1: document.getElementById('video-level-1')
    }
	$('#beginLevel1').click(function() {
        
        $('.startScreen').hide();
        $('.screen2').show();
        $(videoObj.level1).removeClass('hide');
        $("#question-section").css("visibility", "hidden");
        videoObj.level1.addEventListener("ended", function() {
            $(videoObj.level1).addClass('hide');
            $("#question-section").css("visibility", "");
            $("#gameplay-section").show();
        
            gameConfig = {
                level: 1,
                data: [],
                current: 0,
                attempt: 0,
                objects: shuffleArray([1, 2, 3, 4, 5, 6, 7])
            };
            $(".current-level").html(gameConfig.level);
            new TAFFY(MASTER_DB.DATA)({LEVEL: gameConfig.level}).each(function(r) {
                gameConfig.data.push(r);
            });

            gameConfig.data = shuffleArray(gameConfig.data);

            $(".current-life").html(MASTER_DB.CONFIG.LIFE);
            timer.reset(MASTER_DB.CONFIG.TIME * 60);
            timer.start();
            loadQuestions();
        });
        $("#gameplay-section").hide();
        videoObj.level1.play();
    });
    

    // add click event
    $(".r-options").on("click", "li", function(e) {
        var ans = $(this).attr('data-ans');

        if($(this).parent().hasClass("ans-submitted")) {
            return false;
        }
        if(ans == "1") {
            //correct
            $(this).parent().addClass("ans-submitted");
            $(this).addClass("select");
            var seq = gameConfig.objects[gameConfig.current];
            var className = "level" + gameConfig.level + "_item" + seq;
            var $glowObj = $("." + className);
        
            $glowObj.addClass('glow');
            $glowObj.on("click", function(e) {
                if($glowObj.hasClass("keyshowing")) {
                    $(this).hide();
                    $(".level" + gameConfig.level + "-locks ul li").eq(seq-1).addClass("glow");
                } else {
                    $(this).addClass('keyshowing');
                    if(gameConfig.level == 1) {
                        $(this).find('img').attr('src', 'img/key.png');
                    } else {
                        $(this).addClass('key');
                    }
                    $(this).addClass('key');
                }
            });
        

        } else {
            //incorrect
            gameConfig.attempt++;
            if(gameConfig.attempt%2 == 1) {
                $("#modal-timeout").modal('show');
            } else if(gameConfig.attempt%2 == 0) {
                MASTER_DB.CONFIG.LIFE--;
                $(".current-life").html(MASTER_DB.CONFIG.LIFE);
                if(MASTER_DB.CONFIG.LIFE == 0) {
                    $("#modal-lostlifeall").modal('show');
                    $("#modal-lostlifeall").on("hidden.bs.modal", function(){
                        gameover();
                    });
                } else {
                    $("#modal-lostlife").modal('show');
                }
                
                
                
            }
            
        }
    });

    $(".level1-locks, .level2-locks, .level3-locks").on("click", "li", function(e) {
        if($(this).hasClass("closurelock")) {
            return false;
        }

        if($(this).hasClass("glow")) {
			$(this).removeClass("glow").addClass("unlock");
			var $this = $(this);
			setTimeout(function() {
				$this.css('visibility', 'hidden');
			}, 400)
	   
			$(this).addClass('closurelock');
			gameConfig.current++;
			loadQuestions();
		}
    });
});

function loadQuestions() {

    var level = gameConfig.level;
    if(gameConfig.current == TOTAL_Q) {
        //alert('game is completed');
        timer.stop();
        if(level == 3) {
            gameCompleted();
        } else {
            $("#modal-level" + level + "complete").modal('show');
        }
        return false;
    }


    var $parentFrame = $("#gameplay-" + level);

    gameConfig.attempt = 0;
    $parentFrame.find(".r-question").html(gameConfig.data[gameConfig.current].QUESTION);

    var optionsHTML = "";
    var gameoptions = gameConfig.data[gameConfig.current].OPTION;
    for(var i=0; i<gameoptions.length; i++) {
        var isCorrect = (gameConfig.data[gameConfig.current].CORRECT == i+1) ? 1 : 0;
        optionsHTML += "<li data-ans='" + isCorrect + "'>" + gameoptions[i] + "</li>";
    }
    $parentFrame.find(".r-options").html(optionsHTML);
    $parentFrame.find(".ans-submitted").removeClass("ans-submitted");
}


$(function() {
    //----- OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
 
        e.preventDefault();
    });
 
    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        e.preventDefault();
    });
});

function shuffleArray(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function gameover() {
    $('[data-popup="game-over"]').modal('show');
    $('[data-popup="game-over"]').on("hidden.bs.modal", function(){
        window.location.reload();
    });
}


function showLevel(level) {
    var oldLevel = parseInt(level) - 1;
    $("#gameplay-" + oldLevel).hide();
    var videoEle = document.getElementById('video-level-' + level);
    $(videoEle).removeClass("hide");

    var $parent = $("#gameplay-" + level);
    $parent.find(".question-section").css("visibility", "hidden");
    videoEle.addEventListener('ended', function() {
        $(videoEle).addClass('hide');
        $("#gameplay-" + level).show();
        $parent.find(".question-section").css("visibility", "");

        gameConfig = {
            level: level,
            data: [],
            current: 0,
            attempt: 0,
            objects: shuffleArray([1, 2, 3, 4, 5, 6, 7])
        };
        $(".current-level").html(gameConfig.level);
        new TAFFY(MASTER_DB.DATA)({LEVEL: gameConfig.level}).each(function(r) {
            gameConfig.data.push(r);
        });

        gameConfig.data = shuffleArray(gameConfig.data);
        $(".current-life").html(MASTER_DB.CONFIG.LIFE);
        var totalTime = getTimeInSeconds($.trim($(".timer").first().text().replace("Timer: ", "")));
        timer.reset((MASTER_DB.CONFIG.TIME * 60) + totalTime);
        timer.start();
        loadQuestions();
    });
    videoEle.play();
    $(".modal").modal('hide');
}

function getTimeInSeconds(time) {
    var timeArr = time.split(":");
    var secondsToMins = parseInt(timeArr[0]) * 60;
    var result = parseInt(timeArr[1]) + secondsToMins;
    return result;
}

function gameCompleted() {
    $(".modal").modal('hide');
	$("#gameplay-" + 3).hide();
	var videoEle = document.getElementById('video-level-4');
	$(videoEle).removeClass("hide");
	videoEle.play();
}