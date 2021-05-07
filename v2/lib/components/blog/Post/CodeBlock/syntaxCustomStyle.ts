import { CSSProperties } from 'react';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface ICustomStyles {
    general: CSSProperties,
    codeBlock: CSSProperties,
    inline: CSSProperties
}

const styles:ICustomStyles = {
    general: {
        fontFamily: "MyPhoneN1280Regular",
        color: "#AAAAAA",
        backgroundColor: "rgb(30, 30, 30)"
    },
    codeBlock: {
        fontSize: "1.8em",
        fontFamily: "MyPhoneN1280Regular",
        lineHeight: "1.1em"
    },
    inline: {
        borderRadius: ".1em",
        padding: ".1em .3em",
        fontSize: ".9em"
    }
};

const extendednVCSDarkPlus = {
    ...vscDarkPlus
};

extendednVCSDarkPlus['code[class*="language-"]'] = {
    ...styles.general,
    ...styles.codeBlock
};

export {
    styles
};

export default extendednVCSDarkPlus;