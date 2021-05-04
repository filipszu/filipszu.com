import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from "next";
import * as serverUtils from "../../lib/utils/server";
import * as utils from "../../lib/utils";
import IParams from "../../lib/types/IParams";
import BlogBody from "../../lib/components/blog/BlogBody/BlogBody";
import type IBlogPageProps from "./IBlogPageProps";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "../../lib/models/Post";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
    let fileNames = await serverUtils.getFileNames("./_content/_posts");
    fileNames = fileNames.map(fileName => `/blog/${fileName}`);
    return {
        paths: fileNames, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps: GetStaticProps<IBlogPageProps, IParams> = async (context) => {
    const params = context.params as IParams;
    const allSeriaziablePosts = await serverUtils.getSeriaziablePosts("./_content/_posts");
    const slug = params.slug && params.slug.length > 0 ? params.slug : [];
    return {
        props:{
            allSeriaziablePosts: allSeriaziablePosts,
            slug: slug,     
        }
    };
}

export default function PostsPage(props: IBlogPageProps){
    const router = useRouter();
    const [matchingPosts, setMatchingPosts] = useState<Post[]>([]);
    const allPosts = props.allSeriaziablePosts ? props.allSeriaziablePosts.map(seriaziablePost => utils.seriaziablePostToPost(seriaziablePost)) : [];
    const slug = props.slug && props.slug.length > 0 ? props.slug : [];
    const singleView = slug && _.isString(slug[0]) ? 
                        ["category", "tag", "date"].indexOf(slug[0]) === -1 : 
                        true;

    if(!matchingPosts){
        const sortedPosts = utils.getPostsByDate(utils.getPostsMatchingQuery(allPosts, slug));
        setMatchingPosts([...sortedPosts]);
    }

    useEffect(() => {
        if (router.asPath !== router.route) {
            const {slug} = router.query as IParams;
            if(_.isArray(slug)){
                const newMatchedPosts = utils.getPostsMatchingQuery(allPosts, slug);
                setMatchingPosts([...newMatchedPosts]);
            }       
        }
    }, [router])
    
    let listTitle = "";
    if(slug && !singleView){
        const whatListType = slug[0].charAt(0).toUpperCase() + slug[0].slice(1);
        const listType = slug[1];
        listTitle = `Posts for ${whatListType}: ${listType}`;
    }
    const listTitleParagraph = listTitle.length > 0 ? <h1 style={{marginLeft: "calc(.9em)"}}>{listTitle}</h1> : null;

    let description = "";

    if(singleView && matchingPosts[0]){
        description = matchingPosts[0].title;
    }else{
        description = listTitle;
    }

    return (
        <Fragment>
            <Head>
                <title>Rambles from the cut - FilipSZU Blog</title>
                <meta name="description" content={description}/>
            </Head>
            {listTitleParagraph}
            <BlogBody singleView={singleView}
                posts={matchingPosts}/>
        </Fragment>
    );
};