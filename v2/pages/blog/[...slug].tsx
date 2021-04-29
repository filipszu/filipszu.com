import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from "next";
import * as serverUtils from "../../lib/utils/server";
import * as utils from "../../lib/utils";
import Post from "../../lib/models/Post";
import IParams from "../../lib/types/IParams";

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
    const slug = _.isArray(router.query.slug) ? router.query.slug : [];
    const allFileNames = _.isArray(props.allFileNames) ? props.allFileNames : [];
    const matchingFileNames = _.isArray(props.matchingFileNames) ? props.matchingFileNames : []; 
    const matchingPosts = props.matchingParsedFiles ? props.matchingParsedFiles.map(parsedFile => utils.parsedFileToPost(parsedFile)) : null;
    if(!posts){
        setPosts(matchingPosts);
    }
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

    const matchingPostParagraph = (posts && posts.length) ?  (
        <div style={{padding: "50px"}}>
            <h3>Title: {posts[0].title}</h3>
            <h4>Category: <strong>{posts[0].category}</strong></h4>
            <h4>Tags: {posts[0].tags.map(tag => (
                <span>{tag}&nbsp;</span>
            ))}</h4>
            <h4>Publish date: {utils.dateToDateString(posts[0].date)}</h4>
            <div dangerouslySetInnerHTML={{__html: posts[0].body}}/>
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
                    (allFileNames.length > 0) ? allFileNames.map(postName => {
                        return <li>{postName}</li>
                    }) : null
                }
            </ul>
        </Fragment>
    );
};