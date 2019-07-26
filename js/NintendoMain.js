/*
		http://www.filipszu.pl/
  ___  _  _  _        ___  ____ _   _ 
 | __|(_)| |(_) _ __ / __||_  /| | | |
 | _| | || || || '_ \\__ \ / / | |_| |
 |_|  |_||_||_|| .__/|___//___| \___/ 
               |_|    Interactive Developer
		
		Follow me: @filipszu                
*/

var SS_FILE = 'assets/words_pack_nintendo.png';
var JSON_FILE = 'assets/words_pack_nintendo.json';
var BG = "url('assets/Nintendo.jpg')";
var words = new Image();
var wordMultipier = 4;
var dampen = 0.95;
var wordsOnScreen = new Array();
var canvasSize = {width: 0, height: 0};
var aboutText = '<p>Hi,<br />'+
				'my name is <span class="textWhite">Filip Szulczewski</span>.</p>'+
				'<p>I live and work in <span class="textWhite">Toronto</span>. I\'m <span class="textWhite">a Senior Interactive Developer</span> at <span class="textWhite">Digiflare Inc.</span>' +
				'<br />I\'m a <span class="textGreen">web geek</span> interested in all available web technologies. <span class="textPurple">Experienced in</span> developing <span class="textPurple">websites</span> ground-up, building <span class="textPurple">RIA</span>,'+
				' <span class="textPurple">mobile development</span>, creating <span class="textPurple">e-marketing campaigns</span>, <span class="textPurple">video delivery</span> and <span class="textPurple">game development</span>.';
var aboutTextLength = 0;
var colorCount = 3;
var colors = ["#000000", "#CB0077", "#A2EF00"];

window.requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 40);
};

function init(){
	
	$('html body').css('backgroundImage', BG);
	$('#credits').css('color', '#000000');
	setTimeout ( "type()", 40 ); 
	setTimeout ( "showWidgets()", 40 );
	cursorAnimation();
	
	var navBtns = $("nav a");
	navBtns.each(setNavBtn);
	
	$(words).load(function(){
		setCanvas();
		$(window).resize(function(){
				setCanvas();
		});
		$.getJSON(JSON_FILE, loadJSONData );
	});
	words.src = SS_FILE;
}

function loadJSONData(json){
	var wordsArray = createWords(json);
	words = null;
	createWordsOnScreen(wordsArray);
	window.requestAnimFrame(loop);
}

function createWords(data){
		var wordsArray = new Array();
		var count = 0;
		data.forEach(function(dataObj){
			if(dataObj.name !== name){
				name = dataObj.name;
				var word = new Word(name, count, 0, 0, dataObj.width, dataObj.height, Math.random());				
					wordsArray.push(word);
				count++;
			}
		});
		return wordsArray;
}	

function createWordsOnScreen(wordObjs){
	for(var i = 0; i < wordObjs.length * wordMultipier; i++){
		var j = i % wordObjs.length;
		var origin = wordObjs[j];
		var clone = jQuery.extend(true, {}, origin);
		clone.currentColor = colors[0];
		if(Math.random() > .5){
			clone.currentColor = colors[1];
		}else if(Math.random() > .9){
			clone.currentColor = colors[2];
		}
		//Initial word placement on screen
		clone.x = Math.random()*canvasSize.width;
		clone.y = Math.random()*canvasSize.height;
		wordsOnScreen.push(clone);
	}
}

function type(){
	$('#aboutText').html(aboutText.substr(0, aboutTextLength++));
  	if(aboutTextLength < aboutText.length+1){
    	//setTimeout("type()", 5);
		window.requestAnimFrame(type);
  	}else{
    	aboutTextLength = null;
    	aboutText = null;
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
	var c=document.getElementById("back"),
		ctx=c.getContext("2d");

	c.width = c.width; //hack to clean the canvas

	wordsOnScreen.forEach(function(word){
		animWord(word);
		ctx.globalAlpha = word.getAlpha();
		var wordTxt = getWordCanvas(word);
		ctx.drawImage(wordTxt, word.x, word.y, wordTxt.width * word.getAlpha(), wordTxt.height * word.getAlpha());
	});

	// Usefull code to check once going on for a single word.
	// comment the loop out and check what a single word does.

	//var word = getWordCanvas();
	//document.body.append(word);
	//ctx.drawImage(word, 100, 100, 150, 100);	

}

function getWordCanvas(word){
	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		calculatedWidth = 0,
		word = word || {},
		textBaseline = "top",
		font = "44px MyPhoneN1280Regular",
		fillStyle = word.currentColor || "#000000",
		txt = word.txt || "Test Word";
	
	ctx.textBaseline = textBaseline;
	ctx.font = font;
	ctx.fillStyle = fillStyle;
	calculatedWidth = ctx.measureText(txt).width;
	resizeCanvas(canvas, calculatedWidth, 44);
	ctx.textBaseline = textBaseline; // Need to set the canvas context again after the resize.
	ctx.font = font;
	ctx.fillStyle = fillStyle;
	ctx.fillText(txt, 0, 0);
	return canvas;
}

function resizeCanvas(canvas, width, height){
	if(canvas && canvas instanceof HTMLCanvasElement && width && height){
		canvas.width = width;
		canvas.height = height;
		canvas.style.width  = `${width}px`;
		canvas.style.height = `${height}px`;

	}else{
		throw Error("Bad arguments provided.");
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
	
	var c=document.getElementById("back");
	resizeCanvas(c, $(document).width(), $(document).height());
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