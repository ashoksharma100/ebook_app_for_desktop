function Slideshow () {

    this.init();
}

Slideshow.prototype.init = function () {
    // insert data
    $("#app-instruction, title").html(MASTER_DB.CONFIG.TITLE);
    
    this.loadData();
    
}

Slideshow.prototype.loadData = function () {
    var data = MASTER_DB.DATA;
    var dataHTML = "";
    for(var i=0; i<data.length; i++) {

        var image = data[i].IMAGE;
        var title = data[i].TITLE;
        var detail = data[i].DETAIL;
        var audiopath = data[i].AUDIO;

        dataHTML += '<div class="slide">\
            <div class="information-help">\
                <figure>\
                    <img src="' + image + '" alt="" />\
                </figure>\
                <a href="' + image + '" class="fullscreen-image"><i class="fa fa-arrows-alt"></i></a>\
                <div class="hide"><audio id="audio" controls><source src="' + audiopath + '" type="audio/mpeg"></audio></div>\
                <div class="image-info">\
                    <h4 class="mount-head">' + title + '</h4>\
                    <p>' + detail + '</p>\
                </div>\
            </div>\
        </div>';
    }
    $("#maindata").html(dataHTML);
    this.setSlider();
}

Slideshow.prototype.setSlider = function () {
    var _this = this;
    $('.bxslider').bxSlider({
        nextSelector: '#slider-next',
        prevSelector: '#slider-prev',
        nextText: MASTER_DB.CONFIG.BUTTON_NEXT,
        prevText: MASTER_DB.CONFIG.BUTTON_PREV,
        adaptiveHeight: true,
        onSliderLoad: function() {
            _this.setLightBox();
        },
       onSlideAfter: function($slideElement, oldIndex, newIndex) {
            stopAllAudio();
        }
    });
}

function playSound() {
    setTimeout(function() {
       $('.slide[aria-hidden="false"]').find('audio')[0].play() 
    }, 200);
}

function stopSound() {
    setTimeout(function() {
       $('.slide[aria-hidden="false"]').find('audio')[0].pause() 
    }, 200);
}
Slideshow.prototype.setLightBox = function () {
    $('.slideshow-container').lightGallery({
        selector: '.fullscreen-image'
    });
}

 

function stopAllAudio () {
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        audios[i].pause();
        audios[i].currentTime = 0;
    }
}


	
var app;
$(document).ready(function() {
    app = new Slideshow()
});