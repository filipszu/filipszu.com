import { Quadtree, Rectangle } from "@timohausmann/quadtree-ts";
import { ColorValueHex } from "../../../../utils/canvasUtils";
import { areRectanglesOverlaping, getRandomDirection, getRandomVelocity } from "../../../../utils/physicsUtils";
import { getWordBoundingBox } from "../../../../utils/wordCanvasUtils";

export type WordObjectStyle = {
    fontSize?: number,
    fontName?: string,
    color?: ColorValueHex
};

export type WordObjectPhysicsOptions = {
    vx?: number,
    vy?: number
};

export type WordObjectData = WordObjectStyle & WordObjectPhysicsOptions & {
    txt: string
};

export type AnimateColisionOptions = {};
export type AnimateOptions = {};

export class WordObject extends Rectangle<WordObjectData>{
    constructor(
        x: number = 0, 
        y: number = 0,
        options: WordObjectData
    ){
        super({x: x, y: y, width: 10, height: 5, data: options});
        const {width, height} = getWordBoundingBox(options.txt, options.fontSize, options.fontName);
        this.width = width;
        this.height = height;
        this.vx = options.vx ?? getRandomDirection() * getRandomVelocity(3, 5);
        this.vy = options.vy ?? getRandomDirection() * getRandomVelocity(3, 5);
    }
    
    public vx: number = 0;
    public vy: number = 0;
    public isColiding: boolean = false;

    public animate = (quadTree:Quadtree<Rectangle | WordObject>) => {
        this.animBounds(quadTree);
        this.animCollisions(quadTree);
        this.move();
    };

    private animCollisions = (quadTree: Quadtree<Rectangle | WordObject>) => {
        const collisionCandidates = quadTree.retrieve(this);
        if(collisionCandidates.length > 0){
            collisionCandidates.forEach((candidate: Rectangle | WordObject) => {
                if (candidate === this) {
                    return;
                }
                const intersection = areRectanglesOverlaping(this as Rectangle, candidate as Rectangle);
                const candidateWordObject = candidate as WordObject;
                this.isColiding = intersection;
                candidateWordObject.isColiding = intersection;
            });
        }
    };

    private animBounds = (quadTree:Quadtree<Rectangle | WordObject>) => {
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
    };

    private move = () => {
        this.x += this.vx;
        this.y += this.vy;
    };
}