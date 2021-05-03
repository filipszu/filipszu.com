import Post from "../../models/Post";
import classes from "./BlogBody.module.css";
import { Fragment } from "react";
import PostsList from "../../components/blog/PostsList/PostsList";
import * as utils from "../../utils";
import _ from "lodash";

export interface BlogBodyProps {
    posts: Post[],
    singleView: boolean
}

export default function BlogBody(props: BlogBodyProps){
    const posts = props.posts ? props.posts : [];
    let postsParagraph = <p>No Posts Found, Sorry!</p>

    if(posts && posts.length > 0){
        if(props.singleView){
            postsParagraph = (
                <div className={classes.BlogContent}>
                    <h1>Title: {posts[0].title}</h1>
                    <h4>Category: <strong>{posts[0].category}</strong></h4>
                    <h4>Tags: {posts[0].tags.map(tag => (
                            <span>{tag}&nbsp;</span>
                        ))}
                    </h4>
                    <h4>Publish date: {utils.dateToDateString(posts[0].date)}</h4>
                    <div dangerouslySetInnerHTML={{__html: posts[0].body}}/>
                </div>
            );
        }else{
            postsParagraph = (
                <div>
                    <PostsList posts={posts}/>
                </div>
            );
        }
    }

    return <Fragment>{postsParagraph}</Fragment>
}