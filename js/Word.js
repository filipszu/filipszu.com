function Word(_txt, _wordNum, _x, _y, _depth){
	this.txt = _txt;
	this.x = _x;
	this.y = _y;
	this.depth = _depth;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.index = _wordNum;
	this.minAlpha = 0.2;
	this.maxAlpha = 0.5;
	this.maxSize = 1;
	this.minSize = 0.5;
	this.sizeModifier = 40;	
	
	this.getAlpha = function(){
		if(this.depth > this.maxAlpha && this.depth < this.minAlpha){
			return this.depth;
		}else{
			if(this.depth < this.minAlpha){
				return this.minAlpha
			}
			if(this.depth > this.maxAlpha){
				return this.maxAlpha;
			}
			return this.depth;
		}
		return this.depth;
	};
	
	this.getSize = function(){
		if(this.depth > this.minSize && this.depth < this.maxSize){
			return this.sizeModifier * this.depth;
		}else{
			if(this.depth < this.minSize){
				return this.sizeModifier * this.minSize;
			}
			if(this.depth > this.maxSize){
				return this.sizeModifier * this.maxSize;
			}
		}
		return this.sizeModifier * this.depth;
	};
	
}
