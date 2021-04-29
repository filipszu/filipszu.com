class Word {
    minAlpha = 0.4;
    maxAlpha = 0.8;
    maxSize = 1;
    minSize = 0.5;
    txt = "";
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    depth = 0;
    vx = 0;
    vy = 0;
    vz = 0;
    index = 0;
    currentColor = "#000000";
    constructor(_txt: string, _wordNum: number, _x: number, _y: number, _width: number, _height: number, _depth: number){
        this.txt = _txt;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.depth = _depth;
        this.index = _wordNum;
    }

    getAlpha = () => {
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
    }
}

export default Word;