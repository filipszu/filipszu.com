class Word {
    minAlpha = 0.4;
    maxAlpha = 0.8;
    maxSize = 1;
    minSize = 0.5;

    constructor(_txt, _wordNum, _x, _y, _width, _height,_depth ){
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

    getAlpha = () => {
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
    }
}

export default Word;