import Post from "../../../../models/Post";
import classes from "../Post.module.css";
import postBodyClasses from "./PostBody.module.css";
import * as utils from "../../../../utils";
import Link from "next/link";
import ReactMarkodwn from "react-markdown";
import {CustomCodeComponent} from "../CodeBlock";

export interface IPostBodyProps {
  post: Post;
}

export default function PostBody(props: IPostBodyProps) {
  const customRenderers = {
    code: CustomCodeComponent
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
