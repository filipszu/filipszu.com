import { Rectangle } from "@timohausmann/quadtree-ts";

export type Direction = -1 | 1;

const getRandomDirection = (): Direction => {
    const random = Math.random();
    if(random < 0.5){
        return -1;
    }else{
        return 1;
    }
}

const getRandomVelocity = (min: number = 1, max: number = 2): number => {
    return Math.random() * (max - min) + min;
};

const areRectanglesOverlaping = (rect1: Rectangle, rect2: Rectangle): boolean => {
    // check if rect1 and rect2 overlap
    if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    ) {
        return true;
    }
    return false;
};

export {
    getRandomDirection,
    areRectanglesOverlaping,
    getRandomVelocity
};