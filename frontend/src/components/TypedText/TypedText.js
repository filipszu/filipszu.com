import classes from './TypedText.module.css';
import React, { useEffect, useState } from 'react';



const TypedText = (props) => {
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();
    const lastAnimationTickRef = React.useRef();
    const isDoneAnimating = React.useRef();
    const [isAnimating, setIsAnimating] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [isTyped, setIsTyped] = useState(false);

    const type = () => {
        setTypedText(prevTypedText => { 
            const newLength = prevTypedText.length+1;
            const newValue = props.children.substr(0, newLength);
            if(newLength === props.children.length){
                isDoneAnimating.current = true;
            }
            return newValue;
        });
    };

    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            
            setIsAnimating(prevAnimating => {

                console.log(`
                    ------------------
                    Animating
                    ------------------
                    The Delta: ${deltaTime};
                    The Time: ${time};
                    The Delay: ${props.delay};
                    The Interval: ${props.interval};
                    ------------------
                `);

                if(!prevAnimating && time >= props.delay){
                    lastAnimationTickRef.current = time;
                    type();
                    return true;
                }
    
                if(prevAnimating && time - lastAnimationTickRef.current >= props.interval){
                    lastAnimationTickRef.current = time;
                    type();
                }

                return prevAnimating;
            });
          }
          previousTimeRef.current = time;
          if(!isDoneAnimating.current){
            requestRef.current = requestAnimationFrame(animate);
          }else{
              console.log(`
                ------------------
                Done Animating
                ------------------
              `);
          }
          
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
    
    const cursorClasses = [classes.Pulse, classes.TextCursor].join(' ');
    return (
        <div className={props.className}>
            <p>
                <span dangerouslySetInnerHTML={{__html: typedText}}></span><span class={cursorClasses}>▮</span>
            </p>
        </div>
    );
};

export default TypedText;