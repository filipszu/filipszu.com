import Post from "../../../models/Post";
import PostsList from "../PostsList/PostsList";
import _ from "lodash";
import PostBody from "../Post/PostBody/PostBody";

export interface BlogBodyProps {
    posts: Post[],
    singleView: boolean
}

export default function BlogBody(props: BlogBodyProps){
    const posts = props.posts ? props.posts : [];
    let postsParagraph = <p>No Posts Found, Sorry!</p>

    if(posts && posts.length > 0){
        if(props.singleView){
            postsParagraph = <PostBody post={posts[0]}/>;
        }else{
            postsParagraph = <PostsList posts={posts}/>;
        }
    }

    return postsParagraph;
}