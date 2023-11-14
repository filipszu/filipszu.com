import { Word2 } from "../components/Home/components/WordCloud/Word2";

export type ColorValueHex = `#${string}`;
export const DEFAULT_FONT_NAME = "MyPhoneN1280Regular";
export const DEFAULT_FONT_SIZE = 20;
export const DEFAULT_COLOR = "#000000";
export const DEFAULT_TEXT_BASELINE: CanvasTextBaseline = "top";
export const DEFAULT_TEXT_ALIGN: CanvasTextAlign = "left";

/**
 * Resizes a given canvas element to the specified width and height.
 * @param canvas - The canvas element to resize.
 * @param width - The desired width of the canvas.
 * @param height - The desired height of the canvas.
 */
const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const handleShouldNotResize = () => {
        // console.warn("Canvas should not resize.");
        if(canvas && width > 0 && canvas.style.width !== `${width}px`){
            canvas.style.width = `${width}px`;
        }
        if(canvas.style.width !== `${canvas.width}px`){
            canvas.style.width = `${canvas.width}px`;
        }
        if(canvas && height > 0 && canvas.style.height !== `${height}px`){
            canvas.style.height = `${height}px`;
        }
        if(canvas.style.height !== `${canvas.height}px`){
            canvas.style.height = `${canvas.height}px`;
        }
        if(canvas && canvas instanceof HTMLCanvasElement){
            const ratio = window.devicePixelRatio || 1;
            canvas.getContext("2d")?.scale(ratio, ratio);
        }
    };
    const shouldResize = canvas && 
        canvas instanceof HTMLCanvasElement && 
        width > 0 && height > 0 &&
        (canvas.width !== width || canvas.height !== height);
    if(shouldResize){
        const ratio = window.devicePixelRatio || 1;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width  = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.getContext("2d")?.scale(ratio, ratio);
    }else{
        handleShouldNotResize();
    }
};

export type SetContextForTextManipulationOptions = {
    fontSize?: number, 
    color?: ColorValueHex,
    textBaseline?: CanvasTextBaseline,
    fontName?: string,
    textAlign?: CanvasTextAlign
}

/**
 * Sets the context of a canvas element for text manipulation.
 * @param canvas - The canvas element to set the context for.
 * @param options - Optional settings for the context, such as font size, color, and alignment.
 * @throws An error if the canvas context is null.
 */
const setContextForTextManipulation = (canvas: HTMLCanvasElement, options?: SetContextForTextManipulationOptions) => {
    const txtSize = (options && options.fontSize) || DEFAULT_FONT_SIZE;
    const color = (options && options.color) || DEFAULT_COLOR;
    const textBaseline = (options && options.textBaseline) || DEFAULT_TEXT_BASELINE;
    const ctx = canvas.getContext("2d");
    const fontName = (options && options.fontName) || DEFAULT_FONT_NAME;
    const textAlign = (options && options.textAlign) || DEFAULT_TEXT_ALIGN;
    if(ctx){
        ctx.textBaseline = textBaseline;
        ctx.font = `${txtSize}px ${fontName}`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;    
    }else{
        throw new Error("Canvas context is null.");
    }
};

/**
 * Draws a word on a canvas element.
 * @param canvas - The canvas element to draw the word on.
 * @param word - The word to draw.
 * @param options - Optional settings for the context, such as font size, color, and alignment.
 */
const drawWord = (canvas: HTMLCanvasElement, word: Word2, options?: SetContextForTextManipulationOptions) => {
    const ctx = canvas.getContext("2d");
    if(ctx){
        setContextForTextManipulation(canvas, {
            fontSize: word.txtSize,
            textBaseline: options?.textBaseline,
            textAlign: options?.textAlign,
            fontName: word.fontName !== "" ? word.fontName : options?.fontName,
            color: options?.color
        });
        ctx.fillText(word.txt, word.x, word.y);
    }
};

export {
    resizeCanvas,
    drawWord
}
