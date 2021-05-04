import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const myStyle = {
    ...vscDarkPlus
};

myStyle['code[class*="language-"]'] = {
    fontSize: "1.8em"
};

export default myStyle;