/*
		http://www.filipszu.com/
  ___  _  _  _        ___  ____ _   _ 
 | __|(_)| |(_) _ __ / __||_  /| | | |
 | _| | || || || '_ \\__ \ / / | |_| |
 |_|  |_||_||_|| .__/|___//___| \___/ 
               |_|    Interactive Developer
		
		Follow me: @filipszu                
*/

var wordMultipier = 15;
var dampen = 0.95;
var wordsOnScreen = new Array();
var canvasSize = {width: 0, height: 0};
var aboutText = `Hi,<br />
				my name is <span class="textWhite">Filip Szulczewski</span>.<br />
				I’m an <span class="textGreen">autodidact programmer</span>, with <span class="textWhite">more than a decade of experience</span>.<br /><br />  
				I’ve <span class="textGreen">architected</span>, <span class="textGreen">built</span> and <span class="textGreen">delivered</span> an array of <span class="textPurple">video applications</span> using <span class="textPurple">web technologies</span>. 
				I have a <span class="textWhite">track record</span> of <span class="textWhite">succesfully augmenting teams</span> in <span class="textWhite">Professional Services</span> capacity.  
				I have experience in working both on the <span class="textPurple">frontend</span> and the <span class="textPurple">backend</span>.  
				I’m a <span class="textPurple">FOSS</span> enthusiast with a <span class="textPurple">DIY</span> spirit.`;
var aboutTextLength = 0;
var colors = ["#FFFFFF", "#000000", "#CB0077", "#A2EF00"];
var wordTags = [
    {"name": "Javascript"},
    {"name": "Typescript"},
    {"name": "HTML"},
    {"name": "CSS"},
    {"name": "SASS"},
    {"name": "C#"},
    {"name": "Python"},
    {"name": "XCP-ng"},
    {"name": "Bash"},
    {"name": "Nginx"},
    {"name": "Linux"}
];

window.requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 40);
};

function init(){
	
	setTimeout ( type, 2000 ); 
	
	setCanvas();
	$(window).resize(function(){
			setCanvas();
	});
	loadJSONData();

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
		wordTags.forEach(function(dataObj){
			if(dataObj.name !== name){
				name = dataObj.name;
				var word = new Word(name, count, 0, 0, 0, 0, Math.random());				
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
		if(Math.random() > .9){
			clone.currentColor = colors[3];
		}else if(Math.random() > .6){
			clone.currentColor = colors[2];
		}else if(Math.random() > .3){
			clone.currentColor = colors[1];
		}
		//Initial word placement on screen
		clone.x = Math.random()*canvasSize.width;
		clone.y = Math.random()*canvasSize.height;
		wordsOnScreen.push(clone);
	}
}

function type(){
	$('#aboutText').html(`${aboutText.substr(0, aboutTextLength++)}<span id="textCursor" class="pulse">▮</span>`);
  	if(aboutTextLength < aboutText.length+1){
    	window.requestAnimFrame(type);
  	}else{
    	aboutTextLength = null;
		aboutText = null;
  	}
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
		fontSize = 44,
		font = `${fontSize}px MyPhoneN1280Regular`,
		fillStyle = word.currentColor || "#000000",
		txt = word.txt || "Test Word";
	
	ctx.textBaseline = textBaseline;
	ctx.font = font;
	ctx.fillStyle = fillStyle;
	calculatedWidth = ctx.measureText(txt).width;
	resizeCanvas(canvas, calculatedWidth, fontSize);
	ctx.textBaseline = textBaseline; // Need to set the canvas context again after the resize.
	ctx.font = font;
	ctx.fillStyle = fillStyle;
	ctx.fillText(txt, 0, 0);
	word.width = calculatedWidth;
	word.height = fontSize;

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