import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classes from './WordCloud.module.css';
import useAnimationFrame from '../../hooks/useAnimationFrame';
import Word from './Word';
import { useWindowSize } from '../../hooks/useScreenSize';

export interface WordCloudProps {
    wordMultiplier?: number,
    dampen?: number,
    delay?: number,
    interval?: number,
    wordsTags?: {name: string}[]
};


const colors = [
    {color: "#FFFFFF", weight: .3}, 
    {color: "#000000", weight: .3}, 
    {color: "#CB0077", weight: .3}, 
    {color: "#A2EF00", weight: .1}
].sort(colorObj => colorObj.weight);

const WordCloud = (props: WordCloudProps) => {
    const size = useWindowSize();
    const wordTags = useMemo(() => props.wordsTags ? props.wordsTags : [
        {"name": "Javascript"},
        {"name": "Typescript"},
        {"name": "HTML"},
        {"name": "CSS"},
        {"name": "SASS"},
        {"name": "C#"},
        {"name": "Python"},
        {"name": "XCP-ng"},
        {"name": "Bash"},
        {"name": "Nginx"},
        {"name": "Linux"},
        {"name": "Video Streaming"},
    ], [props.wordsTags]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const wordMultiplier = props.wordMultiplier || 10;
    const dampen = props.dampen || 0.95;
    
    const createWords = useCallback(() => {
		var wordsArray: Word[] = [];
		var count = 0;
		wordTags.forEach(function(dataObj){
            let name = dataObj.name;
            let word = new Word(name, count, 0, 0, 0, 0, Math.random());				
                wordsArray.push(word);
            count++;
		});
		return wordsArray;
    }, [wordTags]);

    const createWordsOnScreen = useCallback((wordObjs: Word[]) => {
        let wordsOnScreen = [];
        for(var i = 0; i < wordObjs.length * wordMultiplier; i++){
            var j = i % wordObjs.length;
            var origin = wordObjs[j];
            var clone: Word = {
                ...origin
            }

            clone.currentColor = colors[0].color;
            if(Math.random() > .9){
                clone.currentColor = colors[3].color;
            }else if(Math.random() > .6){
                clone.currentColor = colors[2].color;
            }else if(Math.random() > .3){
                clone.currentColor = colors[1].color;
            }
            //Initial word placement on screen
            clone.x = Math.random()*size.width;
            clone.y = Math.random()*size.height;
            wordsOnScreen.push(clone);
        }
        return wordsOnScreen;
    }, [wordMultiplier, size]);

    const resizeCanvas = useCallback((canvas: HTMLCanvasElement, width: number, height: number) => {
        if(canvas && canvas instanceof HTMLCanvasElement && width && height){
            canvas.width = width;
            canvas.height = height;
            canvas.style.width  = `${width}px`;
            canvas.style.height = `${height}px`;
        }
    }, []);

    const setCanvas = useCallback(() => {
        let c = canvasRef.current;
        if(c){
            resizeCanvas(c, size.width, size.height);
        }
    }, [canvasRef, resizeCanvas, size]);

    const wordCanvases = useRef(new Map<string, HTMLCanvasElement>());
    const getWordCanvas = useCallback((word: Word) => {
        let canvas = wordCanvases.current.get(word.txt);
        if (!canvas) {
            canvas = document.createElement('canvas');
            wordCanvases.current.set(word.txt, canvas);
        }
        let ctx = canvas.getContext('2d');
        let calculatedWidth = 0;
        let textBaseline: CanvasTextBaseline = "top";
        let fontSize = 44;
        let font = `${fontSize}px MyPhoneN1280Regular`;
        let fillStyle = word.currentColor || "#CB0077";
        let txt = word.txt || "Test Word even longer";
        if(ctx){
            ctx.textBaseline = textBaseline;
            ctx.font = font;
            ctx.fillStyle = fillStyle;
            calculatedWidth = ctx.measureText(txt).width;
            resizeCanvas(canvas, calculatedWidth, fontSize);
            ctx.textBaseline = textBaseline; // Need to set the canvas context again after the resize.
            ctx.font = font;
            ctx.fillStyle = fillStyle;
            ctx.fillText(txt, 0, 0);
            word.width = calculatedWidth;
            word.height = fontSize;
        }
        
        return canvas;
    }, [resizeCanvas, wordCanvases]);

    const animWord = useCallback((word: Word) => {

        word.vx = word.vx + (Math.random() * 0.5 - 0.25);
        word.vy = word.vy + (Math.random() * 0.5 - 0.25);
        word.vz = word.vz + (Math.random() * 0.003 - 0.0015);
        
        word.vx = word.vx * dampen;
        word.vy = word.vy * dampen;
        word.vz = word.vz * dampen;
        
        word.x = word.x + word.vx;
        
        if(word.x + word.width/2 > size.width){
            word.x = size.width * Math.random();
        }
        
        if(word.x + word.width/2 < 0){
            word.x = size.width * Math.random();
        }
        
        word.y = word.y + word.vy;
        
        if(word.y - word.height/2 < 0){
            word.y = size.height * Math.random();
        }
        
        if(word.y + word.height/2 > size.height){
            word.y = size.height * Math.random();
        }
        
        word.depth = word.depth + word.vz;
    }, [dampen, size]);

    const draw = useCallback((wordsToDraw: Word[]) => {
        const c = canvasRef.current,
            interval = props.interval || 0;
        if(c){
            const ctx = c.getContext("2d");
            if(ctx){
                c.width = c.width; //hack to clean the canvas

                wordsToDraw.forEach(function(word){
                    animWord(word);
                    ctx.globalAlpha = word.getAlpha();
                    var wordTxt = getWordCanvas(word);
                    if(wordTxt)
                        ctx.drawImage(wordTxt, word.x, word.y, wordTxt.width * word.getAlpha(), wordTxt.height * word.getAlpha());
                });
            }
        }
        return interval;
    }, [canvasRef, props.interval, animWord, getWordCanvas]);


    
    useEffect(() => {
        const onResize = () => setCanvas();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);
    
    const words = useMemo(() => createWords(), []);

    let wordsOnScreen = useRef<Word[]>([]),
        delay = props.delay || 0;

    const animationFrame = useCallback((time: number) => {
        if(time >= delay){
            if(wordsOnScreen.current.length === 0){
                setCanvas();
                wordsOnScreen.current = createWordsOnScreen(words);
            }
            return draw(wordsOnScreen.current);
        }
        return 0;
    }, [delay, draw, setCanvas, createWordsOnScreen, words]);

    useAnimationFrame(animationFrame);

    return (
        <canvas ref={canvasRef} data-testid="word-cloud-canvas" className={classes.WordCloud} style={{ width: '100px', height: '100px' }}></canvas>
    );
};

export default memo(WordCloud);