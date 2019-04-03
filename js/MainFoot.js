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


var imageObj = new Image();
 
    
	
var c=document.getElementById("back");
var ctx=c.getContext("2d");

window.requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
};
    
	
	
function init(){

	
	imageObj.onload = function(){
        setCanvas();
			createWords();
			
		$(window).resize(function(){
			setCanvas();
		});
		
		window.requestAnimFrame(loop);
		setTimeout ( "type()", 1500 );
		
	};
    
	imageObj.src = "assets/foot.png";
	/*
	$.get('assets/my_phone_n1280-webfont.ttf', function() {
			setCanvas();
			createWords();
			
			$(window).resize(function(){
				setCanvas();
			});
			
			window.requestAnimFrame(loop);
			
			setTimeout ( "type()", 1500 ); 
	});
	*/
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
    	setTimeout ( "showWidgets()", 1000 );
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
	
	for (var i = wordObjs.length - 1; i >= 0; i--){
		var word = wordObjs[i];
		animWord(word)
	}
		
	if(frameCount%3==0){
		console.log(frameCount);
		display();
	}

	if( frameCount%10 == 0 ){
		cursorAnimation();
	}
	
	frameCount++;
	
	if(frameCount == maxFrames){
		frameCount = 0;
	}
	
	window.requestAnimFrame(loop);
}

function display(word){
	c.width = c.width;
	
	for (var i = wordObjs.length - 1; i >= 0; i--){
		var word = wordObjs[i];
		ctx.globalAlpha = 0.6;
		ctx.drawImage( imageObj, word.x, word.y, imageObj.width * word.getAlpha(),  imageObj.height * word.getAlpha());
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
	/*
	if(word.x + measure.width/2 > canvasSize.width){
		word.x = canvasSize.width * Math.random();
	}
	
	if(word.x + measure.width/2 < 0){
		word.x = canvasSize.width * Math.random();
	}
	*/
	word.y = word.y + word.vy;
	/*
	if(word.y - word.getSize()/2 < 0){
		word.y = canvasSize.height * Math.random();
	}
	
	if(word.y + word.getSize()/2 > canvasSize.height){
		word.y = canvasSize.height * Math.random();
	}
	*/
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
  }, "fast", "swing");
}