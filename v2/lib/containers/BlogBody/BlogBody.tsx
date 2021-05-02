import Post from "../../models/Post";
import classes from "./BlogBody.module.css";
import Header from "../../components/blog/Header/Header";
import { Fragment } from "react";
import PostsList from "../../components/blog/PostsList/PostsList";
import PostsAggregates from "../../components/blog/PostsAggregates/PostsAggregates";
import * as utils from "../../utils";
import _ from "lodash";

export interface BlogBodyProps {
    posts: Post[],
    allCategories: string[] | null,
    allTags: string[] | null,
    singleView: boolean
}

export default function BlogBody(props: BlogBodyProps){
    const posts = props.posts ? props.posts : [];
    let allTags = posts.length > 0 ? utils.getAllTagsFromPosts(posts) : [];
    let allCategories = posts.length > 0 ? utils.getAllCategoriesFromPosts(posts) : [];

    if(props.allTags && _.isArray(props.allTags)){
        allTags = props.allTags;
    }

    if(props.allCategories && _.isArray(props.allCategories)){
        allCategories = props.allCategories;
    }

    let postsParagraph = <p>No Posts Found, Sorry!</p>

    if(posts && posts.length > 0){
        if(props.singleView){
            postsParagraph = (
                <div>
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

    return (
        <Fragment>
            <div className={classes.MainContentArea}>
                <div className={classes.SectionWrapper}>
                    <section className={classes.ContentSection}>
                        {postsParagraph}
                    </section>
                    <section className={classes.SideBarSection}>
                        <PostsAggregates tags={allTags} categories={allCategories}/>
                    </section>
                </div>
            </div>
        </Fragment>
    );    
}