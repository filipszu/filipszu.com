import React from "react";
import {
  CodeComponent,
  ReactMarkdownProps,
} from "react-markdown/src/ast-to-react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { styles as CustomStyles } from "./syntaxCustomStyle";

export type CustomCodeComponentProps = {
  node: any;
  className: string;
  children: any;
} & JSX.IntrinsicElements["code"] &
  ReactMarkdownProps & { inline?: boolean };

const CustomCodeComponent: CodeComponent = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec((className as string) || "");

  // return !inline && match ? (
  //   <SyntaxHighlighter
  //     showLineNumbers={true}
  //     style={syntaxCustomStyle}
  //     language={match[1]}
  //     PreTag="div"
  //     children={String(children).replace(/\n$/, "")}
  //     {...props}
  //   />
  // ) :

  return (
    <code style={{ ...CustomStyles.general, ...CustomStyles.inline }}>
      {children}
    </code>
  );
};

export { CustomCodeComponent };
