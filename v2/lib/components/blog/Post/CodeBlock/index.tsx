import { CodeComponent } from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import syntaxCustomStyle, {styles as CustomStyles} from "./syntaxCustomStyle";

const CustomCodeComponent: CodeComponent = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className as string || "");

    return !inline && match ? (
        <SyntaxHighlighter
        showLineNumbers={true}
        style={syntaxCustomStyle}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
        />
    ) : (
        <code style={{...CustomStyles.general, ...CustomStyles.inline}}>{children}</code>
    );
};

export {
    CustomCodeComponent
};