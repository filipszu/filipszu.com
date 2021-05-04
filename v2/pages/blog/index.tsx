import * as serverUtils from '../../lib/utils/server';
import * as utils from "../../lib/utils";
import type IBlogPageProps from "./IBlogPageProps";
import { GetStaticProps } from 'next';
import BlogBody from '../../lib/components/blog/BlogBody/BlogBody';
import { Fragment } from 'react';
import Head from 'next/head';


export const getStaticProps: GetStaticProps<IBlogPageProps> = async () => {
    const allSeriaziablePosts = await serverUtils.getSeriaziablePosts("./_content/_posts");
    return {
        props:{
            allSeriaziablePosts: allSeriaziablePosts,
            slug: [],     
        }
    };
}

export default function BlogPage(props: IBlogPageProps){
    const allPosts = props.allSeriaziablePosts ? 
        utils.getPostsByDate(props.allSeriaziablePosts.map(seriaziablePost => utils.seriaziablePostToPost(seriaziablePost))) 
        : [];
    
    return (
        <Fragment>
            <Head>
                <title>Rambles from the cut - FilipSZU Blog</title>
            </Head>
            <BlogBody singleView={false}
                posts={allPosts}/>
        </Fragment>
    );
};