import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const myStyle = {
    ...vscDarkPlus
};

myStyle['code[class*="language-"]'] = {
    fontSize: "1.8em",
    fontFamily: "MyPhoneN1280Regular",
    color: "#AAAAAA",
    lineHeight: "1.1em"
};

export default myStyle;