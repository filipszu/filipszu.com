import { Rectangle } from "@timohausmann/quadtree-ts";
import { ColorValueHex } from "../../../../utils/canvasUtils";

export type WordObjectStyle = {
    fontSize?: number,
    fontName?: string,
    color?: ColorValueHex
};

export type WordObjectData = WordObjectStyle & {
    txt: string
};

export class WordObject extends Rectangle<WordObjectData>{
    private _getWordBoundingBox = (): {width: number, height: number} => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if(ctx && this.data && this.data.txt && this.data.fontSize){
            const txt = this.data.txt;
            const fontSize = this.data.fontSize;
            ctx.font = `${fontSize}px ${this.data.fontName}`;
            return {
                width: ctx.measureText(txt).actualBoundingBoxLeft + ctx.measureText(txt).actualBoundingBoxRight,
                height: fontSize
            }
        } else{
            throw new Error("Canvas 2d context is null || word data is missing props.");
        }
    };

    constructor(
        x: number = 0, 
        y: number = 0,
        options: WordObjectData
    ){
        super({x: x, y: y, width: 10, height: 5, data: options});
        const boundingBox = this._getWordBoundingBox();
        this.width = boundingBox.width;
        this.height = boundingBox.height
    }
}