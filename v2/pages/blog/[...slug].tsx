import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import * as serverUtils from "../../utils/server";
import * as utils from "../../utils";
import path from "path";

export interface PostsPageProps{
    postNames?: string[]
};

export const getStaticPaths = async () => {
    let fileNames = await serverUtils.getFileNames("./_content/_posts");
    fileNames = fileNames.map(fileName => `/blog/${fileName}`);
    console.log(fileNames);

    return {
        paths: fileNames, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(){
    let fileNames = await serverUtils.getFileNames("./_content/_posts");
    
    return {
        props:{
            postNames: fileNames
        }
    };
}

export default function PostsPage(props: PostsPageProps){
    const router = useRouter();
    const slug = _.isArray(router.query.slug) ? router.query.slug : [];
    const postNames = _.isArray(props.postNames) ? props.postNames : [];
    let slugMatch = utils.getMatchingSlugs(slug, postNames);
    let slugMatchParagraph = (
        <div>
            {(slugMatch.length > 0 ? <h3 className="TextGreen">Slug did match a Post</h3> : <h3 className="TextRed">Slug did not match a Post</h3>)}
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
    return (
        <Fragment>
            <h1>Posts Page</h1>
            <h2>Slug:</h2>
            {slugMatchParagraph}
            <h2>Posts:</h2>
            {(slugMatch.length > 0) ? <h3>Matching Posts:</h3> : <h3 className="TextRed">No Matching </h3>}
            <ul>
                {
                    (slugMatch.length > 0) ? slugMatch.map(slug => {
                        return <li>{slug}</li>
                    }) : null
                }
            </ul>
            <h3>All Posts:</h3>
            <ul>
                {
                    (postNames.length > 0) ? postNames.map(postName => {
                        return <li>{postName}</li>
                    }) : null
                }
            </ul>
        </Fragment>
    );
};