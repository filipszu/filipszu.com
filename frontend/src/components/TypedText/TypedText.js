import classes from './TypedText.module.css';
import { useState } from 'react';
import useAnimationFrame from '../../hooks/useAnimationFrame';

const TypedText = (props) => {
    const [typedText, setTypedText] = useState('');

    const type = time => {
        let interval = parseInt(props.interval);
        if(time >= props.delay) {
            setTypedText(prevTypedText => { 
                const newLength = prevTypedText.length+1;
                const newValue = props.children.substr(0, newLength);
                if(newLength === props.children.length){
                    interval = 0;
                }
                return newValue;
            });
        }
        return interval;
    };
    const cursorClasses = [classes.Pulse, classes.TextCursor].join(' ');

    useAnimationFrame(type);

    return (
        <div className={props.className}>
            <p>
                <span dangerouslySetInnerHTML={{__html: typedText}}></span><span className={cursorClasses}>▮</span>
            </p>
        </div>
    );
};

export default TypedText;