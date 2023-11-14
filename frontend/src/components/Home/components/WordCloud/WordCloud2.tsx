import { FC, useCallback, useEffect, useRef, useState } from "react";
import classes from './WordCloud.module.css';
import { useWindowSize } from "../../hooks/useScreenSize";
import { Box, QuadTree } from "js-quadtree";
import { Word2 } from "./Word2";
import { drawWord, resizeCanvas } from "../../../../utils/canvasTools";

export type ColorValueHex = `#${string}`;

type WordCloudProps = {
    colors?: ColorValueHex[],
    wordMultiplier?: number,
    words?: string[],
};
const WordCloud2: FC<WordCloudProps> = ({
    words = ["FilipSZU"],
    colors,
    wordMultiplier,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const size = useWindowSize();
    const quadTree = useRef<QuadTree>(new QuadTree(new Box(0, 0, size.width, size.height)));
    const [wordObjects, setWordObjects] = useState<Word2[]>([]);

    const createWords = useCallback((words?: string[]) => {
        words?.forEach((word) => {
            const wordObj = new Word2({
                txt: word,
                x: 100,
                y: 200,
                txtSize: 100,
                fontName: "MyPhoneN1280Regular",
                // fontName: "Arial",
            });
            setWordObjects(prev => {
                if(prev.filter(wordObj => wordObj.txt === word).length > 0){
                    return prev;
                }else{
                    if(!wordObj.isOnCanvas && canvasRef.current){
                        drawWord(canvasRef.current, wordObj);
                        wordObj.isOnCanvas = true;
                    }
                    return [...prev, wordObj];
                }
            });
        });
    }, [setWordObjects, canvasRef]);

    const drawWords = useCallback((wordObjects: Word2[]) => {
        wordObjects.forEach((word, index) => {
            if(canvasRef.current){
                drawWord(canvasRef.current, word);
            }
        });
    }, [canvasRef]);

    useEffect(() => {
        if(size.width > 0 && size.height > 0 && canvasRef.current){
            resizeCanvas(canvasRef.current, size.width, size.height);

            if(wordObjects.length === 0){
                createWords(words);
            }else{
                drawWords(wordObjects);
            }

        }
    }, [words, wordObjects, setWordObjects, size, createWords, drawWords]);

    return (
        <canvas ref={canvasRef} 
            data-testid="word-cloud-canvas" 
            className={classes.WordCloud2} 
        />
    );
};

export default WordCloud2;
