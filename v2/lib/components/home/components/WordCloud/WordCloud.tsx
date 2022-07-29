import React from "react";
import { useEffect, useRef } from "react";
import classes from "./WordCloud.module.css";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import Word from "./Word";

export interface WordCloudProps {
  wordMultiplier?: number;
  dampen?: number;
  delay?: number;
  interval?: number;
}

declare global {
  interface Window {
    SZU: any;
  }
}

interface WASM {
  ccall: (
    funcName: string,
    returnType: string,
    argTypes: string[],
    args: any[]
  ) => any;
  cwrap: (
    funcName: string,
    returnType: string,
    argTypes: string[]
  ) => () => any;
  _getRand: () => number;
}

const WordCloud = (props: WordCloudProps) => {
  const stampRef = useRef<HTMLCanvasElement | null>(null);
  const WASM = useRef<WASM | null>(null);
  const getRandFunc = useRef<WASM["_getRand"] | null>(null);
  const wordTags = [
    { name: "Javascript" },
    { name: "Typescript" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "SASS" },
    { name: "C#" },
    { name: "Python" },
    { name: "XCP-ng" },
    { name: "Bash" },
    { name: "Nginx" },
    { name: "Linux" },
    { name: "Video Streaming" },
    { name: "React" },
    { name: "React-Native" },
    { name: "Jest" },
    { name: "Detox" },
    { name: "GraphQL" },
  ];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wordMultiplier = props.wordMultiplier || 10;
  const dampen = props.dampen || 0.95;
  const canvasSize = { width: 0, height: 0 };
  let colors = [
    { color: "#FFFFFF", weight: 0.3 },
    { color: "#000000", weight: 0.3 },
    { color: "#CB0077", weight: 0.3 },
    { color: "#A2EF00", weight: 0.1 },
  ];

  function createWords() {
    const wordsArray: Word[] = [];
    let count = 0;
    wordTags.forEach(function (dataObj) {
      const name = dataObj.name;
      const word = new Word(name, count, 0, 0, 0, 0, Math.random());
      wordsArray.push(word);
      count++;
    });
    return wordsArray;
  }

  function createWordsOnScreen(wordObjs: Word[]) {
    const wordsOnScreen = [];
    for (let i = 0; i < wordObjs.length * wordMultiplier; i++) {
      const j = i % wordObjs.length;
      const origin = wordObjs[j];
      const clone: Word = {
        ...origin,
      };

      colors = colors.sort((colorObj) => colorObj.weight);
      clone.currentColor = colors[0].color;
      if (Math.random() > 0.9) {
        clone.currentColor = colors[3].color;
      } else if (Math.random() > 0.6) {
        clone.currentColor = colors[2].color;
      } else if (Math.random() > 0.3) {
        clone.currentColor = colors[1].color;
      }
      //Initial word placement on screen
      clone.x = Math.random() * canvasSize.width;
      clone.y = Math.random() * canvasSize.height;
      wordsOnScreen.push(clone);
    }
    return wordsOnScreen;
  }

  function setCanvas() {
    const c = canvasRef.current;
    if (c) {
      resizeCanvas(c, window.innerWidth, window.innerHeight);
      canvasSize.width = c.width;
      canvasSize.height = c.height;
    }
  }

  function resizeCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    if (canvas && canvas instanceof HTMLCanvasElement && width && height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    } else {
      throw Error("Bad arguments provided.");
    }
  }

  function getWordCanvas(word: Word) {
    const canvas = stampRef.current;
    if (canvas && word) {
      const ctx = canvas.getContext("2d");
      let calculatedWidth = 0;
      const textBaseline: CanvasTextBaseline = "top";
      const fontSize = 44;
      const font = `${fontSize}px MyPhoneN1280Regular`;
      const fillStyle = word.currentColor || "#CB0077";
      const txt = word.txt || "Test Word even longer";
      if (ctx) {
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
    }
    return canvas;
  }

  function animWord(word: Word) {
    let randomNum = Math.random;
    if (getRandFunc.current !== null) {
      randomNum = getRandFunc.current;
    }

    word.vx = word.vx + (randomNum() * 0.5 - 0.25);
    word.vy = word.vy + (randomNum() * 0.5 - 0.25);
    word.vz = word.vz + (randomNum() * 0.003 - 0.0015);

    word.vx = word.vx * dampen;
    word.vy = word.vy * dampen;
    word.vz = word.vz * dampen;

    word.x = word.x + word.vx;

    if (word.x + word.width / 2 > canvasSize.width) {
      word.x = canvasSize.width * randomNum();
    }

    if (word.x + word.width / 2 < 0) {
      word.x = canvasSize.width * randomNum();
    }

    word.y = word.y + word.vy;

    if (word.y - word.height / 2 < 0) {
      word.y = canvasSize.height * randomNum();
    }

    if (word.y + word.height / 2 > canvasSize.height) {
      word.y = canvasSize.height * randomNum();
    }

    word.depth = word.depth + word.vz;
  }

  function draw(wordsToDraw: Word[]) {
    const c = canvasRef.current,
      interval = props.interval || 0;
    if (c) {
      const ctx = c.getContext("2d");
      if (ctx) {
        // eslint-disable-next-line no-self-assign
        c.width = c.width; //hack to clean the canvas

        wordsToDraw.forEach(function (word) {
          animWord(word);
          ctx.globalAlpha = word.getAlpha();
          const wordTxt = getWordCanvas(word);
          if (wordTxt)
            ctx.drawImage(
              wordTxt,
              word.x,
              word.y,
              wordTxt.width * word.getAlpha(),
              wordTxt.height * word.getAlpha()
            );
        });
      }
    }
    return interval;
  }

  const loadWasm = () => {
    if (typeof window.SZU === "function" && WASM.current === null) {
      console.log("loading WASM!");
      window.SZU().then((wasm: WASM) => {
        console.log("got WASM!");
        WASM.current = wasm;
        getRandFunc.current = WASM.current.cwrap("getRand", "number", []);
      });
    } else {
      console.warn("No WASM animating using JS");
    }
  };

  useEffect(() => {
    stampRef.current = document.createElement("canvas");
    loadWasm();
    window.addEventListener("resize", () => {
      setCanvas();
    });
  }, [WASM, getRandFunc]);

  let wordsOnScreen: Word[] = [];
  const delay = props.delay || 0;

  useAnimationFrame((time) => {
    if (time >= delay) {
      if (wordsOnScreen.length === 0) {
        setCanvas();
        wordsOnScreen = createWordsOnScreen(createWords());
      }
      return draw(wordsOnScreen);
    }
    return 0;
  });

  return (
    <canvas
      ref={canvasRef}
      className={classes.WordCloud}
      style={{ width: "100px", height: "100px" }}
    ></canvas>
  );
};

export default WordCloud;
