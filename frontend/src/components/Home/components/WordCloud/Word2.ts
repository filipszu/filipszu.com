import { drawWord, resizeCanvas } from "../../../../utils/canvasTools";

export class Word2{
    public isOnCanvas = false;
    private _txt = "";
    set txt(value: string) {    
        this._txt = value;
    }
    get txt(): string {
        return this._txt;
    }

    private _x = 0;
    private _prevX = 0;
    set x(value: number) {
        this._prevX = this._x;
        this._x = value;
    }
    get x(): number {
        return this._x;
    }
    get prevX(): number {
        return this._prevX;
    }
    private _y = 0;
    private _prevY = 0;
    set y(value: number) {
        this._prevY = this._y;
        this._y = value;
    }
    get y(): number {
        return this._y;
    }
    get prevY(): number {
        return this._prevY;
    }
    private _fontName = "";
    set fontName(value: string) {
        this._fontName = value;
    }
    get fontName(): string {
        return this._fontName;
    }
    private _txtSize = 0;
    private _prevTxtSize = 0;
    set txtSize(value: number) {
        this._prevTxtSize = this._txtSize;
        this._txtSize = value;
    }
    get txtSize(): number {
        return this._txtSize;
    }
    get prevTxtSize(): number {
        return this._prevTxtSize;
    }
    private _color = "";
    private _prevColor = "";
    set color(value: string) {
        this._prevColor = this._color;
        this._color = value;
    }
    get color(): string {
        return this._color;
    }
    get prevColor(): string {
        return this._prevColor;
    }
    private _prevWidth = 0;
    private _width = 0;
    get width(): number {
        return this._width;
    }
    get prevWidth(): number {
        return this._prevWidth;
    }
    public setWidth(value: number) {
        this._prevWidth = this._width;
        this._width = value;
    }
    private _prevHeight = 0;
    private _height = 0;
    get height(): number {
        return this._height;
    }
    get prevHeight(): number {
        return this._prevHeight;
    }
    public setHeight(value: number) {
        this._prevHeight = this._height;
        this._height = value;
    }
    constructor(init: Partial<Word2> = {}) {
        Object.assign(this, init);
        if(this.txt === ""){
            this.txt = "FilipSZU";
        }
        if(this.txtSize === 0){
            this.txtSize = 44;
        }
    }
};