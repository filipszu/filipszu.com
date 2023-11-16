import { Quadtree, Rectangle } from "@timohausmann/quadtree-ts";

const getQuadTree = (width:number, height:number) => {
    const quadTree = new Quadtree<Rectangle>({
        x: 0,
        y: 0,
        width: width,
        height: height,
        maxObjects: 1
    });
    return quadTree;
};

function drawObjectBounds(canvas: HTMLCanvasElement, object: Rectangle) {
    const colorObject = 'rgba(0,0,255,0.5)';
    const ctx = canvas.getContext("2d");
    if(ctx){
        ctx.strokeStyle = colorObject;
        ctx.strokeRect(object.x, object.y, object.width, object.height);
    }
}

function getIntersection(r1: Rectangle, r2: Rectangle) {

    const r1w = r1.width/2,
          r1h = r1.height/2,
          r2w = r2.width/2,
          r2h = r2.height/2;

    const distX = (r1.x + r1w) - (r2.x + r2w);
    const distY = (r1.y + r1h) - (r2.y + r2h);

    if(Math.abs(distX) < r1w + r2w && Math.abs(distY) < r1h + r2h) {
        return {
            pushX : (r1w  + r2w) - Math.abs(distX),
            pushY : (r1h  + r2h) - Math.abs(distY),
            dirX : distX === 0 ? 0 : distX < 0 ? -1 : 1,
            dirY : distY === 0 ? 0 : distY < 0 ? -1 : 1
        }
    } else {
        return false;
    }
}

function getRandomPositionForRectRecursive(quadTree: Quadtree<Rectangle>, object: Rectangle) : Rectangle {
    let x = Math.floor(Math.random() * (quadTree.bounds.width - object.width));
    let y = Math.floor(Math.random() * (quadTree.bounds.height - object.height));
    let bounds = new Rectangle({
      x: x,
      y: y,
      width: object.width,
      height: object.height
    });
    let objects = quadTree.retrieve(bounds);
    if(objects.length > 0) {
      return getRandomPositionForRectRecursive(quadTree, object);
    } else {
      return bounds;
    }
}

function drawNodesRecursive(node: Quadtree<Rectangle>, canvas: HTMLCanvasElement) {   
    const colorNode = 'rgba(255,0,0,0.5)';
    const fullNode = 'rgba(0,255,0,0.2)';
    const ctx = canvas.getContext("2d");
    if(ctx){
        //no subnodes? draw the current node
        if(node.nodes.length === 0) {
            ctx.strokeStyle = colorNode;
            ctx.strokeRect(node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);
          if(node.objects.length > 0) {
            ctx.fillStyle = fullNode;
            ctx.fillRect(node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);
          }
        //has subnodes? drawQuadtree them!
        } else {
            for(let i=0;i<node.nodes.length;i=i+1) {
                drawNodesRecursive(node.nodes[i], canvas);
            }
        }
    }
}

const getRandomPositionForRect = (quadTree: Quadtree<Rectangle>, object: Rectangle) => {
    return getRandomPositionForRectRecursive(quadTree, object);
};

const drawQuadTreeNodes = (canvas: HTMLCanvasElement, quadTree: Quadtree<Rectangle>) => {
    drawNodesRecursive(quadTree, canvas);
};

export {
    getQuadTree,
    drawQuadTreeNodes,
    getRandomPositionForRect,
    drawObjectBounds,
    getIntersection
}
