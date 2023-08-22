var leftCoordinate, rightCoordinate, left;
var leftBool = false;
var lineDraw = [];
var quesLength = tempJsonObj.Answer.length;

var screenWidth = 0;
var screenHeight = 0;
var flag = 0;

function startAct() {
    $('#startDiv').css('opacity', '1').css('z-index', '').show();
}

$(document).ready(function() {
    if (language_code['1'] == 1) {
        $('body').addClass("font");
        $('#notification_Msg_Print').addClass("font");
        $('#submitAns').addClass("font");
        $('#showAns').addClass("font");
        $('.titleTop').addClass("font");
    }
    $('#submitAns').val(button_text['1']);
    $('#showAns').val(button_text['2']);
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    $('.titleTop').text(information_text['1']);
    populateUI();

    $("#submitAns").click(function() {
		flag = 0;
        $("#btn-tryagain").removeAttr('disabled');
        showLineBlocker();
        $('#showAns').removeAttr('disabled').show();
        $("#submitAns").attr('disabled', 'disabled');
        //this loop set the black color for all correct answers
        $.each(tempJsonObj.Answer, function(j, value) {
            $.each($('#main_span span'), function(i, val) {
                if (val.className == value)
                    val.className = 'blackPoint';
            });
        });
        //this loop set the red color for all wrong answers
        $.each(tempJsonObj.Answer, function(j, value) {
            $.each($('#main_span span'), function(i, val) {
                if (val.className != value && val.className != 'blackPoint') {
                    val.className = 'redPoint';
                    flag = 1;
                }
            });
        });
        if (flag == 0) {
			$("#feedback-box").html('<img src="img/correct_Img.gif" />').show();
			playAudio('well-done.mp3');

            $("#btn-tryagain").attr('disabled', 'disabled');
			$("#showAns").attr('disabled', 'disabled');
            /*$('#msgComp').delay(1000).animate({
			left:'36%',
			top:'36%',
			width:'345px',
			height:'200px'
		});*/
            //		alert();
            //			$('#showAns').parent().hide();
        } else {
			$("#feedback-box").html('<img src="img/incorrect_Img.gif" />').show();
            playAudio('try-again.mp3');
            $("#btn-tryagain").removeAttr('disabled');
        }
        setTimeout(function() {
            $("#feedback-box").html('<img src="img/character.png" />').show();
        }, 4500);
        /*$('#showAns').removeAttr('disabled');
		$('#submitAns').hide();
		
		$('#submitAns').unbind('click');
		$('#submitAns').removeAttr('disabled');*/

        var status = 0;
        //this loop set a correct tick mark before each right answer
        $.each(tempJsonObj.Answer, function(j, value) {
            for (i = 0; i < lineDraw.length; i++) {
                if ((lineDraw[i].lval.attr("id") + "_" + lineDraw[i].rval.attr("id")) == value) {
                    lineDraw[i].lval[0].parentElement.children[0].className = 'tick';
                    status++;
                }
            }

        });
        //this loop set a wrong tick mark before each wrong answer
        $.each(tempJsonObj.Answer, function(j, value) {
            for (i = 0; i < lineDraw.length; i++) {
                if (((lineDraw[i].lval.attr("id") + "_" + lineDraw[i].rval.attr("id")) != value) && (lineDraw[i].lval[0].parentElement.children[0].className != 'tick'))
                    lineDraw[i].lval[0].parentElement.children[0].className = 'wrong';
            }
        });

        if (status == 5) {
            $("#showAns").attr('disabled', 'disabled')
        } else {
        //tryAgain.play();
        }

        $(this).attr("disabled", "disabled");

        /*$('.l_clsOption').off();
		$('.r_clsOption').off();*/
        $('.wrapper .content .leftSide li').addClass('inactive');
        $('.wrapper .content .rightSide li').addClass('inactive');
    });

    $("#showAns").click(function() {
        $("#showAns").attr('disabled', 'disabled')
        //$('#btn-reset').attr('disabled', 'disabled');

        //$(this).parent().hide();
        /*$('#msgComp').delay(1000).animate({
			left:'36%',
			top:'36%',
			width:'345px',
			height:'200px'
		});*/
		$("#btn-tryagain").attr('disabled', 'disabled');

        //this loop removes all wrong and right tick marks before each option
        for (i = 0; i < lineDraw.length; i++) {
            lineDraw[i].lval[0].parentElement.children[0].className = '';
        }
        //this loop removes all correct answers from "lineDraw" array
        $.each(tempJsonObj.Answer, function(i, value) {
            for (i = 0; i < lineDraw.length; i++) {
                if (((lineDraw[i].lval.attr("id") + "_" + lineDraw[i].rval.attr("id")) == value) ) {
                    lineDraw.splice(i, 1);
                }
            }
        });
        //this loop identify all the wrong answers from "lineDraw" array redraw them and remove them one by one
        var incorrectAns = 0;
        $.each(tempJsonObj.Answer, function(j, value) {
            for (i = 0; i < lineDraw.length; i++) {
                if (((lineDraw[i].lval.attr("id")) == (value.substr(0, 2))) ) {
                    incorrectAns++;
                    rightCoordinate = getOffset($("#" + value.substr(3, 2))[0]);
                    rightCoordinate[0] += 10;
                    rightCoordinate[1] += 06;
                    lineDraw[i].rx = rightCoordinate[0];
                    lineDraw[i].ry = rightCoordinate[1];
                    lineDraw[i].rval = $("#" + value.substr(3, 2));
                    $(".redPoint").remove();
                    line(lineDraw[i].lx, lineDraw[i].ly, lineDraw[i].rx, lineDraw[i].ry, lineDraw[i].lval, lineDraw[i].rval);
                    $("." + (lineDraw[i].lval.attr("id") + "_" + lineDraw[i].rval.attr("id"))).attr("class", "greenPoint");
                    lineDraw.splice(i, 1);
                }
            }
        });
    });

    $(window).resize(function() {
        screenWidthdiff = $(window).width() - screenWidth;
        screenHeightdiff = $(window).height() - screenHeight;

        screenWidth = $(window).width();
        screenHeight = $(window).height();

        $("#main_span span").remove();

        for (i = 0; i < lineDraw.length; i++) {
            lineDraw[i].lx += (screenWidthdiff / 2);
            lineDraw[i].rx += (screenWidthdiff / 2);

            lineDraw[i].ly += (screenHeightdiff / 2);
            lineDraw[i].ry += (screenHeightdiff / 2);

            line(lineDraw[i].lx, lineDraw[i].ly, lineDraw[i].rx, lineDraw[i].ry, lineDraw[i].lval, lineDraw[i].rval);
        }
    });

    window.addEventListener("load", function() {
        setTimeout(function() {
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);
    });
    if ($(window).height() < 600) {
        $('.wrapper .content .leftSide li').css('margin', '1px');
        $('.wrapper .content .rightSide li').css('margin', '1px');
        $('.wrapper .content').css('padding', '5px 10px 5px 10px').css('margin', '2px auto');
        //$('#startDiv').height('600px');
        $('.notifiactinMsg').height('302px');
        $('#notification_Msg_Print').height('233px');
        $('.wrapper .buttonBar li').css('padding', '0px');
    }
});

function fnLeftOptionClicked() {
    $('.selected').removeClass('selected');
    //remove previously selected left element
    $(this.firstChild).addClass('selected');

    leftCoordinate = getOffset(this.childNodes[0].childNodes[2]);
    leftCoordinate[0] += 05;
    leftCoordinate[1] += 06;
    leftBool = true;
    left = $(this.childNodes[0].childNodes[2]);
}

function fnRightOptionClicked() {
    if (leftBool === true) {
        rightCoordinate = getOffset(this.childNodes[0].childNodes[0]);
        rightCoordinate[0] += 10;
        rightCoordinate[1] += 06;
        var obj = {
            lx: leftCoordinate[0],
            ly: leftCoordinate[1],
            rx: rightCoordinate[0],
            ry: rightCoordinate[1],
            lval: left,
            rval: $(this.childNodes[0].childNodes[0])
        };
        for (i = 0; i < lineDraw.length; i++) {
            if ((lineDraw[i].lx == obj.lx) && (lineDraw[i].ly == obj.ly))
                lineDraw.splice(i, 1);
        }
        for (i = 0; i < lineDraw.length; i++) {
            if ((lineDraw[i].rx == obj.rx) && (lineDraw[i].ry == obj.ry))
                lineDraw.splice(i, 1);
        }
        lineDraw.push(obj);
        $("#main_span span").remove()
        for (i = 0; i < lineDraw.length; i++) {
            line(lineDraw[i].lx, lineDraw[i].ly, lineDraw[i].rx, lineDraw[i].ry, lineDraw[i].lval, lineDraw[i].rval);
        }
        left[0].parentElement.className = '';

        leftBool = false;
        if (lineDraw.length == tempJsonObj.Answer.length) {
            $('#submitAns').removeAttr("disabled");
            $("#btn-reset").removeAttr("disabled");

        }

        var getName = $(this).children().children().attr('id');

    }
    if (lineDraw.length == quesLength) {
        $('#showAns').attr('disabled', 'disabled');
        $('#submitAns').removeAttr('disabled').show();

        $('#showAns').attr('disabled', 'disabled');
    } else {
        $('#showAns').attr('disabled', 'disabled');
        //$('#submitAns').attr('disabled').hide();
    }
}
//This function draws a line according to given x and y coordiantes
function line(x0, y0, x1, y1, left, right) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    putpixel(x0, y0, left, right);
    if (Math.abs(dx) > Math.abs(dy)) {
        // slope < 1
        var m = dy / dx;
        // compute slope
        var b = y0 - m * x0;
        dx = (dx < 0) ? -1 : 1;
        while (x0 != x1) {
            x0 += dx;
            putpixel(x0, Math.round(m * x0 + b), left, right);
        }
    } else if (dy != 0) {
        // slope >= 1
        var m = dx / dy;
        // compute slope
        var b = x0 - m * y0;
        dy = (dy < 0) ? -1 : 1;

        while (y0 != y1) {
            y0 += dy;
            putpixel(Math.round(m * y0 + b), y0, left, right);
        }
    }
}

//This function create new span for each pixel
function putpixel(x, y, left, right) {
    var point = document.createElement("span");
    point.style.position = "absolute";
    point.style.left = x + "px";
    point.style.width = "3px";
    point.style.height = "3px";
    point.style.background = "black";
    point.style.top = y + "px";
    point.className = left.attr("id") + "_" + right.attr("id");
    bdy = document.getElementById("main_span");
    bdy.insertBefore(point, null);
}

//This function calculate coorinates of each pixel to be drawn
function getOffset(el) {
    var _x = 0;
    var _y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return [_x, _y];
}

function fn_InformationClicked() {
    // if($("#dv_information").css('display') == 'block')
    // $("#dv_information").hide();
    // else
    // {
    $("#dv_information").show();
    $("#notification_Msg_Print").html(tempJsonObj.text);
    //}
}
function closePopup() {
    $("#dv_information").hide();
}

function populateUI() {
    $('#dvLeft').html(LIcreatorLeft(tempJsonObj.Left));
    $('#dvRight').html(LIcreatorRight(tempJsonObj.Right));

    $('.l_clsOption').on("click", fnLeftOptionClicked);
    $('.r_clsOption').on("click", fnRightOptionClicked);
}

function LIcreatorLeft(ObjectLeft) {
    var liHtml = '<h1>' + tempJsonObj.LeftHeading + '</h1>';
    $.each(ObjectLeft, function(i, val) {
        liHtml += '<div class="l_clsOption"><li><b></b><strong>' + val + '</strong><span id = "l' + Number(i + 1) + '" class="liLeft"></span></li></div>';
    })
    return liHtml;
}

function LIcreatorRight(ObjectRight) {
    var liHtml = '<h1>' + tempJsonObj.RightHeading + '</h1>';
    $.each(ObjectRight, function(i, val) {
        liHtml += '<div class="r_clsOption"><li><span  id = "r' + Number(i + 1) + '" class="liRight"></span><strong>' + val + '</strong></li></div>';
    })
    return liHtml;
}

function fnShowAudioPlayer() {
    var x = "<div id='dvAudioControl' class='audioPlayer'>" + "<object id='auTest' type='application/x-shockwave-flash' data='audio/mp3_player.swf' width='200' height='20'>" + "<param name='wmode' value='transparent' />" + "<param name='movie' value='audio/mp3_player.swf' />" + "<param name='FlashVars' value='mp3=audio/blanks.mp3&amp;showvolume=1&amp;autoplay=1' />" + "</object>" + "<img src='images/icon_close.png' class='btnCloseAudio' onclick='fnHideAudioControl()'></img>" + "</div>";
    $("#audioContainerDiv").html(x);
    //$('#dvAudioControl').show();
    //var audioElement = document.getElementById('auTest');
    //audioElement.play();
}

function fnHideAudioControl() {
    $("#audioContainerDiv").html('');
    //var audioElement = document.getElementById('auTest');
    //audioElement.pause();
    //audioElement.currentTime=0;
    //$('#dvAudioControl').hide();
}
function resetActivity() {

    //$('#mainWrapper').load();
    $("#main_span span").remove();
    lineDraw = [];
    $('.l_clsOption').each(function() {
        $(this).find('b').removeClass('wrong');
        $(this).find('b').removeClass('tick');
    });
    $('#showAns').attr('disabled', 'disabled');
    window.location.reload();
}

$(document).ready(function(e) {

    var blinkHolder;
    $('.l_clsOption').click(function(e) {
        e.stopPropagation();
        clearInt();
        $jThis = $(this).find('.liLeft');
        var blinks = function() {
            $jThis.toggleClass('tog');

        }
        blinkHolder = setInterval(blinks, 500);
    });

    $('.rightSide').click(function(e) {
        clearInt();
        e.stopPropagation();
    });

    $('html').click(function(e) {
        clearInt();
    });

    function clearInt() {
        clearInterval(blinkHolder);
        $('.liLeft').removeClass('tog');
    }

})

function showLineBlocker() {
    var objComputed = $("#mainWrapper").offset();
    objComputed.width = $("#mainWrapper").width();
    objComputed.height = $("#mainWrapper").height();

    $("#myblocker").css({
        width: objComputed.width + 'px',
        height: objComputed.height + 'px',
        top: objComputed.top + 'px',
        left: objComputed.left + 'px'
    }).show();
}

function tryAgainAct() {

	$("#myblocker").hide();
	
	for(var i=lineDraw.length-1; i>=0; i--) {
		if(lineDraw[i].lval.parents('.l_clsOption').find('b').attr('class') == "wrong") {
			lineDraw.splice(i, 1)
		}
	}

	$(".redPoint").remove();
	$(".wrong").removeClass('wrong')
	$("#btn-tryagain, #showAns").attr('disabled', 'disabled');
	

}

function playAudio(audioname) {
	var audio = new Audio("audio/" + audioname);
	audio.play();
}