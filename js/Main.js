var words = ['HTML5', 'CSS3', 'Javascript', 'jQuery',
			 'PHP', 'MySQL', 'PostgreSQL', 
			 'ActionScript', 'Flex', 'AIR',  
			 'JSON', 'XML', 'RTMFP',
			 'Wowza', 'Streaming'];


var wordCount = 75;
var dampen = 0.95;
var wordObjs = new Array();
var canvasSize = {width: 0, height: 0};
var aboutText = 'Hi,<br />'+
				'my name is <span class="textWhite">Filip Szulczewski</span>.<br />'+
				'I\'m an <span class="textGreen">Interactive Developer</span> based in Warsaw, Poland.<br />'+
				'I\'m a web geek interested in all available technologies. <br/>I\'m experienced in developing <span class="textPurple">websites</span> ground-up, building <span class="textPurple">RIA</span>,'+
				' <span class="textPurple">mobile development</span>, creating <span class="textPurple">e-marketing sites</span> and <span class="textPurple">video delivery</span>.';
var aboutTextLength = 0;
var frameCount = 0;
var maxFrames = 1000; 

var c=document.getElementById("back");

window.requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, engine.REQUEST_ANIM_FRAME_FALLBACK_DELAY);
};


    
	
	
function init(){

	
	$.get('assets/my_phone_n1280-webfont.ttf', function() {
			setCanvas();
			createWords();
			
			$(window).resize(function(){
				setCanvas();
			});
			
			window.requestAnimFrame(loop);
			
			setTimeout ( "type()", 1500 ); 
			setTimeout ( "showWidgets()", 1500 );
			cursorAnimation();
	});
	
	var navBtns = $("nav a");
	navBtns.each(setNavBtn);
	
}

function createWords(){
	for(var j = 0; j < wordCount; j++){
		var i = j % words.length;
	
		var name = words[i];
	  	var index = j;
	  	var x = Math.random() * canvasSize.width;
	  	var y = Math.random() * canvasSize.height; 
	  
	  	var word = new Word(name, index, x, y, Math.random());
	  	wordObjs.push(word);
	  	
	  	
	  		
	}
}

function type(){
	$('#aboutText').html(aboutText.substr(0, aboutTextLength++));
  	if(aboutTextLength < aboutText.length+1){
    	//setTimeout("type()", 5);
		window.requestAnimFrame(type);
  	}else{
    	aboutTextLength = 0;
    	aboutText = "";
  	}
}

function showWidgets(){
	$('#social').css('display', 'block');
	$('#social').css('opacity', '0');
	$("#social").animate({
    	opacity: 1
  	}, 400)
}

function loop(){

	display();
	
	
	
	frameCount++;
	
	if(frameCount == maxFrames){
		frameCount = 0;
	}
	
	window.requestAnimFrame(loop);
}

function display(){
	c.width = c.width;
	var i = wordObjs.length - 1;
	for (i; i >= 0; i--){
		var ctx=c.getContext("2d");
		var word = wordObjs[i];
		var wordMeasure = ctx.measureText(word.txt);
		animWord(word, wordMeasure);
		ctx.textBaseline  = "top";
		ctx.font = word.getSize() + 'px MyPhoneN1280Regular';
		//ctx.fillStyle= "rgba(229,103,177, "+word.getAlpha()+")";
		if(word.index%2==0){
			ctx.fillStyle= "rgba(255,255,255, 1)";
		}else{
			ctx.fillStyle= "rgba(229,103,177, 1)";
		}
		//ctx.fillStyle= "rgba(229,103,177, 1)";
		ctx.globalAlpha = word.getAlpha();
		ctx.fillText(word.txt, word.x, word.y);
	}
}

function animWord(word, measure){
	word.vx = word.vx + (Math.random() * 0.5 - 0.25);
	word.vy = word.vy + (Math.random() * 0.5 - 0.25);
	word.vz = word.vz + (Math.random() * 0.003 - 0.0015);
	
	word.vx = word.vx * dampen;
    word.vy = word.vy * dampen;
	word.vz = word.vz * dampen;
	
	word.x = word.x + word.vx;
	
	if(word.x + measure.width/2 > canvasSize.width){
		word.x = canvasSize.width * Math.random();
	}
	
	if(word.x + measure.width/2 < 0){
		word.x = canvasSize.width * Math.random();
	}
	
	word.y = word.y + word.vy;
	
	if(word.y - word.getSize()/2 < 0){
		word.y = canvasSize.height * Math.random();
	}
	
	if(word.y + word.getSize()/2 > canvasSize.height){
		word.y = canvasSize.height * Math.random();
	}
	
	//word.depth = word.depth + word.vz;
}

function setCanvas(){

	c.width = $(document).width();
	c.height = $(document).height();
	canvasSize.width = c.width;
	canvasSize.height = c.height;
}

function setNavBtn(index, navBtn){
	$(this).mouseover(navBtnOver);
	$(this).mouseout(navBtnOut);
	$(this).click(navBtnClick);
}

function navBtnOver(e){
	$(this).css("textDecoration", "underline");
}

function navBtnOut(e){
	$(this).css("textDecoration", "none");
}

function navBtnClick(e){
	var navBtns = $("nav a");
	navBtns.removeClass('active');
	$(this).addClass('active');
}
function cursorAnimation(){
  setTimeout('cursorAnimation()', 400);
  $("#textCursor").animate(
  {
    opacity: 0
  }, "fast", "swing").animate(
  {
    opacity: 1
  }, "fast", "swing");
}