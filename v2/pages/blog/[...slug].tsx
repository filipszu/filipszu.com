import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from "next";
import * as serverUtils from "../../lib/utils/server";
import * as utils from "../../lib/utils";
import Post from "../../lib/models/Post";
import IParams from "../../lib/types/IParams";
import SlugDebugger from "../../lib/components/debug/slugDebugger";
import Header from "../../lib/components/blog/Header/Header";

export interface PostsPageProps{
    allFileNames?: string[],
    matchingFileNames?: string[],
    matchingParsedFiles?: IParsedFile[]
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
    const fileNames = await serverUtils.getFilePaths("./_content/_posts");
    const matchingFileNames = await serverUtils.getFileNames("./_content/_posts", true, params.slug);
    const matchingFilePaths = await serverUtils.getFilePaths("./_content/_posts", params.slug);
    const matchingParsedFiles = await serverUtils.getParsedFiles(matchingFilePaths);

    return {
        props:{
            allFileNames: fileNames,
            matchingFileNames: matchingFileNames,
            matchingParsedFiles: matchingParsedFiles,
        }
    };
}

export default function PostsPage(props: PostsPageProps){
    const [posts, setPosts] = useState<Post[] | null>(null);
    const router = useRouter();

    const matchingPosts = props.matchingParsedFiles ? props.matchingParsedFiles.map(parsedFile => utils.parsedFileToPost(parsedFile)) : null;
    
    // Usefull for debugging slugs
    // const slug = _.isArray(router.query.slug) ? router.query.slug : [];
    // const allFileNames = _.isArray(props.allFileNames) ? props.allFileNames : [];
    // const matchingFileNames = _.isArray(props.matchingFileNames) ? props.matchingFileNames : []; 
    // const slugDebugger = <SlugDebugger query={router.query} allFileNames={allFileNames} matchingFileNames={matchingFileNames} posts={posts}/>

    if(!posts){
        setPosts(matchingPosts);
    }

    let postFragment = null;
    if(posts){
        postFragment = (
            <Fragment>
                <Header />
                <h3>Title: {posts[0].title}</h3>
                <h4>Category: <strong>{posts[0].category}</strong></h4>
                <h4>Tags: {posts[0].tags.map(tag => (
                    <span>{tag}&nbsp;</span>
                ))}</h4>
                <h4>Publish date: {utils.dateToDateString(posts[0].date)}</h4>
                <div dangerouslySetInnerHTML={{__html: posts[0].body}}/>
            </Fragment>
        );
    }

    return postFragment;
};