import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from "next";
import * as serverUtils from "../../lib/utils/server";
import * as utils from "../../lib/utils";
import IParams from "../../lib/types/IParams";
import BlogBody from "../../lib/containers/BlogBody/BlogBody";
import type IBlogPageProps from "./IBlogPageProps";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "../../lib/models/Post";
import Header from "../../lib/components/blog/Header/Header";

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
    const allCategories = allPosts ? utils.getAllCategoriesFromPosts(allPosts) : null;
    const allTags = allPosts ? utils.getAllTagsFromPosts(allPosts) : null;
    const singleView = slug && _.isString(slug[0]) ? 
                        ["category", "tag", "date"].indexOf(slug[0]) === -1 : 
                        true;

    if(!matchingPosts){
        setMatchingPosts(utils.getPostsMatchingQuery(allPosts, slug));
    }

    useEffect(() => {
        if (router.asPath !== router.route) {
            const {slug} = router.query as IParams;
            if(_.isArray(slug)){
                const newMatchedPosts = utils.getPostsMatchingQuery(allPosts, slug);
                setMatchingPosts(newMatchedPosts);
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

    return (
        <Fragment>
            <Header />
            {listTitleParagraph}
            <BlogBody singleView={singleView}
                posts={matchingPosts} 
                allCategories={allCategories} 
                allTags={allTags}/>
        </Fragment>
    );
};