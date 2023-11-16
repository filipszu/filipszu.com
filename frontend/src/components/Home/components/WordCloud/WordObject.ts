import { Quadtree, Rectangle } from "@timohausmann/quadtree-ts";
import { ColorValueHex } from "../../../../utils/canvasUtils";

export type WordObjectStyle = {
    fontSize?: number,
    fontName?: string,
    color?: ColorValueHex
};

export type WordObjectData = WordObjectStyle & {
    txt: string
};


export type Direction = -1 | 1;
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

    private getIntersection = (r2: Rectangle | WordObject) => {
        const r1 = this as WordObject;
        const r1w = r1.width/2,
              r1h = r1.height/2,
              r2w = r2.width/2,
              r2h = r2.height/2;

        const distX = (r1.x + r1w) - (r2.x + r2w);
        const distY = (r1.y + r1h) - (r2.y + r2h);

        if(Math.abs(distX) < r1w + r2w && Math.abs(distY) < r1h + r2h) {
            return true;
        } else {
            return false;
        }
    };

    public move = (quadTree:Quadtree<Rectangle | WordObject>) => {
        const collisionCandidates = quadTree.retrieve(this);
        if(collisionCandidates.length > 0){
            collisionCandidates.forEach((candidate) => {
                if(candidate === this){
                    return;
                }
                const intersection = this.getIntersection(candidate);
                const candidateWordObject = candidate as WordObject;
                this.isColiding = intersection;
                candidateWordObject.isColiding = intersection;
            });
        }

        if(this.x + this.width > quadTree.bounds.width){
            this.x = quadTree.bounds.width - this.width;
            this.vx = this.vx * -1;
        }

        if(this.x < 0){
            this.x = 0;
            this.vx = this.vx * -1;
        }

        if(this.y + this.height > quadTree.bounds.height){
            this.y = quadTree.bounds.height - this.height;
            this.vy = this.vy * -1;
        }

        if(this.y < 0){
            this.y = 0;
            this.vy = this.vy * -1;
        }

        this.x += this.vx;
        this.y += this.vy;
    };
    
    private getRandomDirection = (): Direction => {
        const random = Math.random();
        if(random < 0.5){
            return -1;
        }else{
            return 1;
        }
    }
    public vx: number = 0;
    public vy: number = 0;
    public isColiding: boolean = false;

    constructor(
        x: number = 0, 
        y: number = 0,
        options: WordObjectData
    ){
        super({x: x, y: y, width: 10, height: 5, data: options});
        const boundingBox = this._getWordBoundingBox();
        this.width = boundingBox.width;
        this.height = boundingBox.height;
        this.vx = Math.random() * 2 * this.getRandomDirection();
        this.vy = Math.random() * 2 * this.getRandomDirection();
    }
}