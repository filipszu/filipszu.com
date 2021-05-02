import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from "next";
import * as serverUtils from "../../lib/utils/server";
import * as utils from "../../lib/utils";
import Post from "../../lib/models/Post";
import IParams from "../../lib/types/IParams";
import Header from "../../lib/components/blog/Header/Header";
import ISerializablePost from "../../lib/models/ISerializablePost";
import PostsList from "../../lib/components/blog/PostsList/PostsList";

export interface PostsPageProps{
    matchingSeriaziablePosts?: ISerializablePost[],
    singleView: Boolean,
    listTitle: string
};

export const getStaticPaths: GetStaticPaths = async () => {
    let fileNames = await serverUtils.getFileNames("./_content/_posts");
    fileNames = fileNames.map(fileName => `/blog/${fileName}`);
    return {
        paths: fileNames, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps: GetStaticProps<PostsPageProps, IParams> = async (context) => {
    const params = context.params as IParams;
    const matchingSeriaziablePosts = await serverUtils.getSeriaziablePosts("./_content/_posts", params.slug);
    const singleView = params.slug ? ["category", "tag", "date"].indexOf(params.slug[0]) === -1 : true;
    let listTitle = "";
    if(params.slug && !singleView){
        listTitle = `Posts for ${params.slug[0]}: ${params.slug[1]}`;
    }
    return {
        props:{
            matchingSeriaziablePosts: matchingSeriaziablePosts,
            singleView: singleView,
            listTitle: listTitle       
        }
    };
}

export default function PostsPage(props: PostsPageProps){
    const [posts, setPosts] = useState<Post[] | null>(null);
    const matchingPosts = props.matchingSeriaziablePosts ? props.matchingSeriaziablePosts.map(seriaziablePost => utils.seriaziablePostToPost(seriaziablePost)) : null;

    if(!posts){
        setPosts(matchingPosts);
    }

    let postsParagraph = <p>No Posts Found, Sorry!</p>

    if(posts && posts.length > 0){
        if(props.singleView){
            postsParagraph = (
                <div>
                    <h3>Title: {posts[0].title}</h3>
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
                    <h3>{props.listTitle}</h3>
                    <PostsList posts={posts}/>
                </div>
            );
        }
    }

    return (
        <Fragment>
            <Header />
            {postsParagraph}
        </Fragment>
    );
};