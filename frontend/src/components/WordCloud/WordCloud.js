import { useRef } from 'react';
import classes from './WordCloud.module.css';
import useAnimationFrame from '../../hooks/useAnimationFrame';
import Word from './Word';

import { isMobile } from 'react-device-detect';

const WordCloud = (props) => {
    const stampRef = useRef(document.createElement('canvas'));
    const wordTags = [
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
    ];

    const wordMultiplier = props.wordMultiplier || 10;
    const dampen = props.dampen || 0.95;

    let colors = [
        {color: "#FFFFFF", weight: .3}, 
        {color: "#000000", weight: .3}, 
        {color: "#CB0077", weight: .3}, 
        {color: "#A2EF00", weight: .1}
    ];

    const canvasSize = {width: 0, height: 0};


    function createWords(data){
		var wordsArray = [];
		var count = 0;
		wordTags.forEach(function(dataObj){
            let name = dataObj.name;
            let word = new Word(name, count, 0, 0, 0, 0, Math.random());				
                wordsArray.push(word);
            count++;
		});
		return wordsArray;
    }

    function createWordsOnScreen(wordObjs){
        for(var i = 0; i < wordObjs.length * wordMultiplier; i++){
            var j = i % wordObjs.length;
            var origin = wordObjs[j];
            var clone = {
                ...origin
            }

            colors = colors.sort(colorObj => colorObj.weight);
            clone.currentColor = colors[0];
            if(Math.random() > .9){
                clone.currentColor = colors[3];
            }else if(Math.random() > .6){
                clone.currentColor = colors[2];
            }else if(Math.random() > .3){
                clone.currentColor = colors[1];
            }
            //Initial word placement on screen
            clone.x = Math.random()*canvasSize.width;
            clone.y = Math.random()*canvasSize.height;
            wordsOnScreen.push(clone);
        }
        return wordsOnScreen;
    }

    function setCanvas(){
        let c = canvasRef.current;
        if(c){
            resizeCanvas(c, window.innerWidth, window.innerHeight);
            canvasSize.width = c.width;
            canvasSize.height = c.height;
        }
    }

    function resizeCanvas(canvas, width, height){
        if(canvas && canvas instanceof HTMLCanvasElement && width && height){
            canvas.width = width;
            canvas.height = height;
            canvas.style.width  = `${width}px`;
            canvas.style.height = `${height}px`;
        }else{
            throw Error("Bad arguments provided.");
        }
    }

    function getWordCanvas(word){
        word = word || {};

        let canvas = stampRef.current;
        let ctx = canvas.getContext('2d');
        let calculatedWidth = 0;
        let textBaseline = "top";
        let fontSize = 44;
        let font = `${fontSize}px MyPhoneN1280Regular`;
        let fillStyle = word.currentColor.color || "#CB0077";
        let txt = word.txt || "Test Word even longer";

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
    
        return canvas;
    }

    function animWord(word){

        word.vx = word.vx + (Math.random() * 0.5 - 0.25);
        word.vy = word.vy + (Math.random() * 0.5 - 0.25);
        word.vz = word.vz + (Math.random() * 0.003 - 0.0015);
        
        word.vx = word.vx * dampen;
        word.vy = word.vy * dampen;
        word.vz = word.vz * dampen;
        
        word.x = word.x + word.vx;
        
        if(word.x + word.width/2 > canvasSize.width){
            word.x = canvasSize.width * Math.random();
        }
        
        if(word.x + word.width/2 < 0){
            word.x = canvasSize.width * Math.random();
        }
        
        word.y = word.y + word.vy;
        
        if(word.y - word.height/2 < 0){
            word.y = canvasSize.height * Math.random();
        }
        
        if(word.y + word.height/2 > canvasSize.height){
            word.y = canvasSize.height * Math.random();
        }
        
        word.depth = word.depth + word.vz;
    }

    function draw() {
        const c = canvasRef.current;
		const ctx = c.getContext("2d");

        c.width = c.width; //hack to clean the canvas

        wordsOnScreen.forEach(function(word){
            animWord(word);
            ctx.globalAlpha = word.getAlpha();
            var wordTxt = getWordCanvas(word);
            ctx.drawImage(wordTxt, word.x, word.y, wordTxt.width * word.getAlpha(), wordTxt.height * word.getAlpha());
        });

        return props.interval;
    }

    let canvasRef = useRef();
    let wordsOnScreen = [];

    window.addEventListener('resize', () => {
        setCanvas();
    });

    useAnimationFrame(time => {
        if(time >= props.delay){
            if(wordsOnScreen.length === 0){
                setCanvas();
                wordsOnScreen = createWordsOnScreen(createWords());
            }
            if (isMobile){
                draw(time);
                return 0;
            }else{
                return draw(time);
            }
            
        }
    });

    return (
        <canvas ref={canvasRef} className={classes.WordCloud} style={{ width: '100px', height: '100px' }}></canvas>
    );
};

export default WordCloud;