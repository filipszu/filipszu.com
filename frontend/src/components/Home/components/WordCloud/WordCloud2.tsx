import { FC, useEffect, useRef } from "react";
import classes from './WordCloud.module.css';
import { useWindowSize } from "../../hooks/useScreenSize";
import { WordObject } from "./WordObject";
import { resizeCanvas } from "../../../../utils/canvasUtils";
import { drawWords, generateWordObject } from "../../../../utils/wordCanvasUtils";
import { drawObjectBounds, drawQuadTreeNodes, getQuadTree, getRandomPositionForRect } from "../../../../utils/quadTreeUtils";
import { Rectangle } from "@timohausmann/quadtree-ts";

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

    useEffect(() => {
        const wordCount = 100;
        const wordsA = [];
        for(let i = 0; i < wordCount; i++){
            wordsA.push(`test_${i}`);
        }

        if(size.width > 0 && size.height > 0 && canvasRef.current && wordsA.length > 0){
            resizeCanvas(canvasRef.current, size.width, size.height);
            const quadtree = getQuadTree(size.width, size.height);
            // populate quadtree with words
            const wordObjects = wordsA.map((word) => generateWordObject(word, size.width, size.height));
            wordObjects.forEach(word => quadtree.insert(word as Rectangle));
            
            const ctx = canvasRef.current.getContext('2d');
            if(ctx){
                ctx.clearRect(0, 0, size.width, size.height);
                if(shouldDrawQuadTreeBounds){
                    drawQuadTreeNodes(canvasRef.current, quadtree);
                    quadtree.retrieve(new Rectangle({x: 0, y: 0, width: size.width, height: size.height})).forEach((word) => {
                        const wordObj = word as WordObject;
                        drawObjectBounds(canvasRef.current as HTMLCanvasElement, wordObj as Rectangle);
                    });
                }
                
                if(shouldDrawWords){
                    drawWords(canvasRef.current, wordObjects);
                }
            }
        }

    
    }, [size.width, size.height, canvasRef, shouldDrawQuadTreeBounds, shouldDrawWords]);

    return (
        <canvas ref={canvasRef} 
            data-testid="word-cloud-canvas" 
            className={classes.WordCloud2} 
        />
    );
};

export default WordCloud2;
