import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from "next";
import * as serverUtils from "../../utils/server";
import * as utils from "../../utils";
import * as types from "../../utils/types";

export interface PostsPageProps{
    allPosts?: string[],
    matchingFileNames?: string[],
    matchingPosts?: serverUtils.IParsedFile[]
};

export const getStaticPaths: GetStaticPaths = async () => {
    let fileNames = await serverUtils.getFileNames("./_content/_posts");
    fileNames = fileNames.map(fileName => `/blog/${fileName}`);
    return {
        paths: fileNames, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async (context) => {
    const params = context.params as types.IParams;
    const fileNames = await serverUtils.getFilePaths("./_content/_posts");
    const matchingFileNames = await serverUtils.getFileNames("./_content/_posts", true, params.slug);
    const matchingFilePaths = await serverUtils.getFilePaths("./_content/_posts", params.slug);
    const matchingPosts = await serverUtils.getPosts(matchingFilePaths);

    return {
        props:{
            allPosts: fileNames,
            matchingFileNames: matchingFileNames,
            matchingPosts: matchingPosts,
        }
    };
}

export default function PostsPage(props: PostsPageProps){
    const router = useRouter();
    const slug = _.isArray(router.query.slug) ? router.query.slug : [];
    const allPosts = _.isArray(props.allPosts) ? props.allPosts : [];
    const matchingFileNames = _.isArray(props.matchingFileNames) ? props.matchingFileNames : []; 
    
    const slugMatchParagraph = (
        <div>
            {(matchingFileNames.length > 0 ? <h3 className="TextGreen">Slug did match a Post</h3> : <h3 className="TextRed">Slug did not match a Post</h3>)}
            <p>The provided slug(s):</p>
            <ul>
                {
                    (_.isArray(slug)) ? slug.map(slugItem => {
                        return <li>{slugItem}</li>
                    }) : null
                }
            </ul>
        </div>
    );

    const matchingPostParagraph = props.matchingPosts?.length ?  (
        <div style={{padding: "50px"}}>
            <h3>{props.matchingPosts[0].attributes.title}</h3>
            {props.matchingPosts[0].body}
        </div>
    ) : <p className="TextRed">No Posts Matched</p>;

    return (
        <Fragment>
            <h1>Posts Page</h1>
            <h2>Slug:</h2>
            {slugMatchParagraph}
            <h2>Posts:</h2>
            {(matchingFileNames.length > 0) ? <h3>Matching Posts:</h3> : <h3 className="TextRed">No Matching </h3>}
            <ul>
                {
                    (matchingFileNames.length > 0) ? matchingFileNames.map(slug => {
                        return <li>{slug}</li>
                    }) : null
                }
            </ul>
            {matchingPostParagraph}
            <h3>All Posts:</h3>
            <ul>
                {
                    (allPosts.length > 0) ? allPosts.map(postName => {
                        return <li>{postName}</li>
                    }) : null
                }
            </ul>
        </Fragment>
    );
};