// import { Word2 } from "../components/Home/components/WordCloud/Word2";
import { WordObject } from "../components/Home/components/WordCloud/WordObject";
import { DEFAULT_COLOR, SetContextForTextManipulationOptions, setContextForTextManipulation } from "./canvasUtils";

/**
 * Draws a word on a canvas element.
 * @param canvas - The canvas element to draw the word on.
 * @param word - The word to draw.
 * @param options - Optional settings for the context, such as font size, color, and alignment.
 */
const drawWord = (canvas: HTMLCanvasElement, word: WordObject, options?: SetContextForTextManipulationOptions) => {
    const ctx = canvas.getContext("2d");
    if(ctx){
        setContextForTextManipulation(canvas, {
            fontSize: word.data?.fontSize,
            textBaseline: options?.textBaseline,
            textAlign: options?.textAlign,
            fontName: word.data?.fontName !== "" ? word.data?.fontName : options?.fontName,
            color: options?.color ? options?.color : (word.data?.color || DEFAULT_COLOR)
        });
        if(word.data?.txt){
            ctx.fillText(word.data?.txt, word.x, word.y);
        }
    }
};

const generateWordObject = (
    word: string, 
    maxWidth: number, 
    maxHeight: number, 
    options?: WordObject
) => {
    const wordObject = new WordObject(0, 0, {
        txt: word,
        fontSize: options?.data?.fontSize || 60,
        fontName: options?.data?.fontName || "Arial",
        color: options?.data?.color || "#000000"
    });
    wordObject.x = Math.floor(Math.random() * (maxWidth - wordObject.width));
    wordObject.y = Math.floor(Math.random() * (maxHeight - wordObject.height));
    return wordObject;
};

const drawWords = (canvas: HTMLCanvasElement, wordObjects: WordObject[]) => {
    wordObjects.forEach((word) => {
        if(canvas){
            drawWord(canvas, word);
        }
    });
}

export {
    generateWordObject,
    drawWord,
    drawWords
}
