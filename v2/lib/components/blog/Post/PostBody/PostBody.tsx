import Post from "../../../../models/Post";
import classes from "../Post.module.css";
import postBodyClasses from "./PostBody.module.css";
import * as utils from "../../../../utils";
import Link from "next/link";
import ReactMarkodwn from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import customStyle from "../syntaxCustomStyle";

export interface IPostBodyProps {
  post: Post;
}

export default function PostBody(props: IPostBodyProps) {
  const customRenderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          showLineNumbers={true}
          style={customStyle}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <SyntaxHighlighter
          PreTag="span"
          style={customStyle}
          children={String(children).replace(/\n$/, "")}
        />
        // <code className={className} {...props}>
        //     {children}
        // </code>
      );
    },
  };

  return (
    <div className={classes.Post}>
      <div className={classes.Header}>
        <h1 className="TextGreen">{props.post.title}</h1>
        <span className={classes.DateLabel}>Publish date: </span>
        <span className={classes.DateValue}>
          {utils.dateToDateString(props.post.date)}
        </span>
      </div>
      <div className={[classes.Content, postBodyClasses.Content].join(" ")}>
        <ReactMarkodwn components={customRenderers}>
          {props.post.body}
        </ReactMarkodwn>
      </div>
      <div className={classes.Tags}>
        <span className={classes.TagsLabel}>TAGS: </span>
        {props.post.tags.map((postTag) => (
          <span key={postTag} className={classes.TagLabel}>
            <Link href={`/blog/tag/${postTag}`}>{postTag}</Link>
          </span>
        ))}
      </div>
    </div>
  );
}
