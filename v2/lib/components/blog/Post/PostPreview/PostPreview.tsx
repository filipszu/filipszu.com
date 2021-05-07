import Link from "next/link";
import Post from "../../../../models/Post";
import classes from "../Post.module.css";
import postPreviewClasses from "./PostPreview.module.css";
import ReactMarkodwn from "react-markdown";
import { CustomCodeComponent } from "../CodeBlock/index";

export interface PostPreviewProps {
  post: Post;
}

export default function PostPreview(props: PostPreviewProps) {
  const customRenderers = {
    code: CustomCodeComponent,
  };

  function getReadMoreLink(post: Post) {
    return <Link href={`/blog/${post.slug}`}>read more</Link>;
  }

  return (
    <div className={classes.Post}>
      <div className={classes.Header}>
        <h1>
          <Link href={props.post.link}>{props.post.title}</Link>
        </h1>
        <span className={classes.DateLabel}>PUBLISHED: </span>
        <span className={classes.DateValue}>{props.post.dateString}</span>
      </div>
      <div className={classes.Content}>
        <div
          className={[classes.Content, postPreviewClasses.Content].join(" ")}
        >
          <ReactMarkodwn components={customRenderers}>
            {props.post.preview}
          </ReactMarkodwn>
        </div>
        {getReadMoreLink(props.post)}
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
