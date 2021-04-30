import Post from "../../../models/Post";
import classes from "./PostsList.module.css";
import PostPreview from "../PostPreview/PostPreview";

export interface PostsListProps{
    posts: Post[] | null
}
export default function PostsList(props: PostsListProps){
    const posts = props.posts || [];

    return (
        <div className={classes.PostsList}>
            {posts.map(post => (
                <PostPreview key={post.slug} post={post}/>
            ))}
        </div>
    );
}