var words = new Image();
var data;
var wordMultipier = 3;
var dampen = 0.95;
var wordObjs = new Array();
var wordsOnScreen = new Array();
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

	setTimeout ( "type()", 1500 ); 
	setTimeout ( "showWidgets()", 1500 );
	cursorAnimation();
	
	var navBtns = $("nav a");
	navBtns.each(setNavBtn);
	
	$(words).load(function(){
		setCanvas();
		$(window).resize(function(){
				setCanvas();
		});
		$.getJSON('assets/words_pack.json', loadJSONData );
	});
	words.src = 'assets/words_pack.png';
}

function loadJSONData(json){
	data = json;
	createWords();
	createWordsOnScreen();
	window.requestAnimFrame(loop);
}

function createWords(){
	
		var count = 0;
		for(var z = 0; z < data.length; z++){
			var dataObj = data[z];
			if(dataObj.name !== name){
				name = dataObj.name;
				var word = new Word(name, count, 0, 0, dataObj.width, dataObj.height, Math.random());
				
					var canvasBlack = document.createElement('canvas');
					var blackCTX = canvasBlack.getContext('2d');
					var blackDataObj = data[z];
					canvasBlack.width = dataObj.width;
					canvasBlack.height = dataObj.height;
					blackCTX.drawImage(words, blackDataObj.x, blackDataObj.y, dataObj.width, dataObj.height, 0, 0, dataObj.width, dataObj.height);
					word.black = canvasBlack;
					
					var canvasPink = document.createElement('canvas');
					var pinkCTX = canvasPink.getContext('2d');
					var pinkDataObj = data[z+1];
					canvasPink.width = dataObj.width;
					canvasPink.height = dataObj.height;
					pinkCTX = canvasPink.getContext('2d');
					pinkCTX.drawImage(words, pinkDataObj.x, pinkDataObj.y, dataObj.width, dataObj.height, 0, 0, dataObj.width, dataObj.height);
					word.pink = canvasPink;
					
					var canvasWhite = document.createElement('canvas');
					var whiteCTX = canvasWhite.getContext('2d');
					var whiteDataObj = data[z+2];
					canvasWhite.width = dataObj.width;
					canvasWhite.height = dataObj.height;
					whiteCTX = canvasWhite.getContext('2d');
					whiteCTX.drawImage(words, whiteDataObj.x, whiteDataObj.y, dataObj.width, dataObj.height, 0, 0, dataObj.width, dataObj.height);
					word.white= canvasWhite;
				
				wordObjs.push(word);
				count++;
			}
		}
}	

function createWordsOnScreen(){
	for(var i = 0; i < wordObjs.length * wordMultipier; i++){
		var j = i % wordObjs.length;
		var origin = wordObjs[j];
		var clone = jQuery.extend(true, {}, origin);
		clone.x = Math.random()*canvasSize.width;
		clone.y = Math.random()*canvasSize.height
		wordsOnScreen.push(clone);
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
	
	window.requestAnimFrame(loop);
}

function display(){
	c.width = c.width;
	for (var i = 0; i < wordsOnScreen.length; i++){
		var ctx=c.getContext("2d");
		var word = wordsOnScreen[i];
		animWord(word);
		ctx.globalAlpha = word.getAlpha();
		if(i%2==0){
			ctx.drawImage(word.pink, word.x, word.y);	
		}else if(i%3==0){
			ctx.drawImage(word.black, word.x, word.y);
		}else{
			ctx.drawImage(word.white, word.x, word.y);
		}
		
	}
}

function animWord(word){
	word.vx = word.vx + (Math.random() * 0.5 - 0.25);
	word.vy = word.vy + (Math.random() * 0.5 - 0.25);
	word.vz = word.vz + (Math.random() * 0.003 - 0.0015);
	
	word.vx = word.vx * dampen;
    word.vy = word.vy * dampen;
	word.vz = word.vz * dampen;
	
	word.x = word.x + word.vx;
	
	if(word.x + word.width/2 > canvasSize.width){
		word.x = canvasSize.width * Math.random();
	}
	
	if(word.x + word.width/2 < 0){
		word.x = canvasSize.width * Math.random();
	}
	
	word.y = word.y + word.vy;
	
	if(word.y - word.height/2 < 0){
		word.y = canvasSize.height * Math.random();
	}
	
	if(word.y + word.height/2 > canvasSize.height){
		word.y = canvasSize.height * Math.random();
	}
	
	word.depth = word.depth + word.vz;
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
  $("#textCursor").animate(
  {
    opacity: 0
  }, "fast", "swing").animate(
  {
    opacity: 1
  }, "fast", "swing", cursorAnimation);
  
}