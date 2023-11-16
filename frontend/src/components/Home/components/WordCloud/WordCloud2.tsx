import { FC, useCallback, useEffect, useRef, useState } from "react";
import classes from './WordCloud.module.css';
import { useWindowSize } from "../../hooks/useScreenSize";
import { WordObject } from "./WordObject";
import { resizeCanvas } from "../../../../utils/canvasUtils";
import { drawWords, generateWordObject } from "../../../../utils/wordCanvasUtils";
import { drawObjectBounds, drawQuadTreeNodes, getQuadTree } from "../../../../utils/quadTreeUtils";
import { Rectangle } from "@timohausmann/quadtree-ts";
import useAnimationFrame from "../../hooks/useAnimationFrame";

type WordCloudProps = {
    wordMultiplier?: number,
    words?: string[],
    shouldDrawQuadTreeBounds?: boolean,
    shouldDrawWords?: boolean
};


const WordCloud2: FC<WordCloudProps> = ({
    words = ["FilipSZU", "test2", "test3", "test4", "test5"],
    wordMultiplier = 1,
    shouldDrawQuadTreeBounds = true,
    shouldDrawWords = true
}) => {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const size = useWindowSize();
    const [wordObjects, setWordObjects] = useState<WordObject[]>([]);

    useAnimationFrame(() => {
        tick();
        return 50;
    });

    const tick = useCallback(() => {
        if(size.width > 0 && size.height > 0 && canvasRef.current && words.length > 0){
            resizeCanvas(canvasRef.current, size.width, size.height);
            const quadtree = getQuadTree(size.width, size.height);
            
            if(wordObjects.length === 0){
                const wordRectacngles = words.map((word) => generateWordObject(word, size.width, size.height));
                wordRectacngles.forEach(word => quadtree.insert(word as Rectangle));
                setWordObjects(wordRectacngles);
            }else{
                wordObjects.forEach(word => {
                    quadtree.insert(word as Rectangle);
                    word.move(quadtree);
                });
            }
            
            const ctx = canvasRef.current.getContext('2d');
            if(ctx){
                ctx.clearRect(0, 0, size.width, size.height);
                if(shouldDrawQuadTreeBounds){
                    drawQuadTreeNodes(canvasRef.current, quadtree);
                    quadtree.retrieve(new Rectangle({x: 0, y: 0, width: size.width, height: size.height})).forEach((word) => {
                        const wordObj = word as WordObject;
                        drawObjectBounds(canvasRef.current as HTMLCanvasElement, wordObj as Rectangle, wordObj.isColiding);
                    });
                }
                
                if(shouldDrawWords){
                    drawWords(canvasRef.current, wordObjects);
                }
            }
        }
    }, [size.width, size.height, canvasRef, shouldDrawQuadTreeBounds, shouldDrawWords, words, wordObjects]);

    useEffect(() => {
        // tick();
    }, [size.width, size.height, canvasRef, shouldDrawQuadTreeBounds, shouldDrawWords, words, tick]);

    return (
        <canvas ref={canvasRef} 
            data-testid="word-cloud-canvas" 
            className={classes.WordCloud2} 
        />
    );
};

export default WordCloud2;
