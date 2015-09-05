/* Tesseract Web-based Presentation Framework
   created by Linus Lee, copyright 2015 */

var advancer;
var scrollMaster;
var noncriticalControls = ["fs","ps","ss-setter","play","pause","picker"];

/* jQuery dependency */
var slideCount = $(".slide").length;

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

function gto(step){
    current = currentSlideN()
    if(prefix.lowercase=="webkit"){
	obj('presentation').style.webkitTransform = "translateY(" + String(parseInt(current) + step) + "vh)";
    }
    if(prefix.lowercase=="moz"){
	obj('presentation').style.MozTransform = "translateY(" + String(parseInt(current) + step) + "vh)";
    }
    if(prefix.lowercase=="o"){
	obj('presentation').style.OTransform = "translateY(" + String(parseInt(current) + step) + "vh)";
    }
    if(prefix.lowercase=="ms"){
	obj('presentation').style.msTransform = "translateY(" + String(parseInt(current) + step) + "vh)";
    }
    
}

function fsall(elem){
    if (elem.requestFullscreen) {
	elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
	elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
	elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
	elem.webkitRequestFullscreen();
    }
}
function fsexit(){
    if (document.exitFullscreen) {
	document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
	document.mozCancelFullscreen();
    } else if (document.webkitExitFullscreen) {
	document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
	document.msExitFullscreen();
    }
}
function obj(id){
    return document.getElementById(id)
}

function fullscreen(){
    obj('ps').style.zIndex="2";
    obj('fs').style.opacity="0";
    obj('ps').style.opacity="1";
    obj('fs').style.zIndex="1";
    fsall(obj('presentation-container'));
    console.log('fullscreen enabled');
}

function nofullscreen(){
    obj('fs').style.zIndex="2";
    obj('fs').style.opacity="1";
    obj('ps').style.opacity="0";
    obj('ps').style.zIndex="1";
    fsexit();
    console.log('fullscreen disabled');
}

function calibrate(){
    sHeight = window.innerHeight + 1;
}

function currentSlideN(){
    currentSlide = current = parseInt(obj('presentation').style.webkitTransform.substr(11,13));
    if(isNaN(currentSlide)){currentSlide = 0}
    return currentSlide;
}

function getCurrentSpeed(){
    var rate = parseInt(obj('ssn').innerHTML);
    return rate;
}

function updateCurrentSpeed(rate){
    obj('ssn').innerHTML=String(rate);
}

function nextSlide(){
    calibrate();
    currentSlide = currentSlideN();
    if(-currentSlide + 100 < slideCount * 100){
	gto(-100);
	console.log('next slide');
    }
}

function lastSlide(){
    calibrate();
    currentSlide = currentSlideN();
    if(currentSlide < 0){
	gto(100);
	console.log('last slide');
    }
}

function play(){
    obj('pause').style.zIndex="2";
    obj('play').style.opacity="0";
    obj('pause').style.opacity="1";
    obj('play').style.zIndex="1";
    advancer = setInterval(function(){nextSlide()},getCurrentSpeed() * 1000)
}

function pause(){
    obj('play').style.zIndex="2";
    obj('play').style.opacity="1";
    obj('pause').style.opacity="0";
    obj('pause').style.zIndex="1";
    clearInterval(advancer);
}

function showToolbar(){
    obj('tesseract-toolbar').className="";
    obj('picker').className="on";
}

function hideToolbar(){
    obj('tesseract-toolbar').className="invis"
    obj('picker').className="off";
}

function switchInvis(){
    if(obj('tesseract-toolbar').className=="invis"){showToolbar()}
    else{hideToolbar()}
}

function minify(){
    noncriticalControls.forEach(function(id){
	obj(id).style.display="none";
    })
}

function maxify(){
    noncriticalControls.forEach(function(id){
	obj(id).style.display="block";
    })
}

obj('fs').addEventListener("click",fullscreen);
obj('ps').addEventListener("click",nofullscreen);
obj('play').addEventListener("click",play);
obj('pause').addEventListener("click",pause);
obj('sl').addEventListener("click",lastSlide);
obj('sr').addEventListener("click",nextSlide);
obj('picker').addEventListener("click",switchInvis);
obj('ssl').addEventListener("click",function(){pause();if(getCurrentSpeed()>24){updateCurrentSpeed(getCurrentSpeed() - 5)}else if(getCurrentSpeed()>2){updateCurrentSpeed(getCurrentSpeed() - 1)}});
obj('ssr').addEventListener("click",function(){pause();if(getCurrentSpeed()<25){updateCurrentSpeed(getCurrentSpeed() + 1)}else if(getCurrentSpeed()>24 && getCurrentSpeed()<120){updateCurrentSpeed(getCurrentSpeed() + 5)}});
obj('sh-arrow').addEventListener("click",function(){
    if(obj('play').style.display=="none"){
	maxify();
    }
    else{
	minify();
    }
});

// presets-header parsing

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

var presets = obj('presets-header').innerHTML.split(';');

presets.forEach(function(keys,index,array){
  presets[index] = keys.trim();
});

presets.forEach(function(keyMatch, index, array){
    if(keyMatch == "auto-play=on")
    {play()}
    else if(keyMatch == "mini-controls=on")
    {minify()}
    else if(keyMatch == "invisible-controls=on")
    {switchInvis()}
});

