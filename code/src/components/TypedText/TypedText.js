import classes from './TypedText.module.css';
import { useEffect, useState } from 'react';

const TypedText = (props) => {
    const [aboutTextLength, setAboutTextLength] = useState(0);
    useEffect(() => {});
    
    const cursorClasses = [classes.Pulse, classes.TextCursor].join(' ');
    return (
        <div className={props.className}>
            <p>
                <span>{props.children}</span><span class={cursorClasses}>▮</span>
            </p>
        </div>
    );
};

export default TypedText;