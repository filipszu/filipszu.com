class Word {
    public minAlpha = 0.4;
    public maxAlpha = 0.8;
    public maxSize = 1;
    public minSize = 0.5;
    public txt = "";

    private _x = 0;
    private _y = 0;
    private _width = 0;
    private _height = 0;

    public prevX = 0;
    public prevY = 0;
    public prevWidth = 0;
    public prevHeight = 0;

    get x() {
        return this._x;
    }

    set x(value: number) {
        this.prevX = this._x;
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value: number) {
        this.prevY = this._y;
        this._y = value;
    }

    get width() {
        return this._width;
    }

    set width(value: number) {
        this.prevWidth = this._width;
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value: number) {
        this.prevHeight = this._height;
        this._height = value;
    }
    public depth = 0;
    public vx = 0;
    public vy = 0;
    public vz = 0;
    public index = 0;
    public currentColor = "#000000";
    
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