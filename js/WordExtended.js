(function(window){
	
	Word.minAlpha = 0.4;
	Word.maxAlpha = 0.8;
	Word.maxSize = 1;
	Word.minSize = 0.5;
	
	function Word(_txt, _wordNum, _x, _y, _width, _height,_depth ){
		this.txt = _txt;
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.height = _height;
		this.depth = _depth;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		this.index = _wordNum;
		this.currentColor = "#000000";
	}
	
	Word.prototype.getAlpha = function(){
		if(this.depth > Word.maxAlpha && this.depth < Word.minAlpha){
			return this.depth;
		}else{
			if(this.depth < Word.minAlpha){
				return Word.minAlpha
			}
			if(this.depth > Word.maxAlpha){
				return Word.maxAlpha;
			}
			return this.depth;
		}
		return this.depth;
	}
	
	window.Word = Word;
}(window));

