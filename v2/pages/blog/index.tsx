import * as serverUtils from '../../lib/utils/server';
import * as utils from "../../lib/utils";
import type IBlogPageProps from "./IBlogPageProps";
import { GetStaticProps } from 'next';
import BlogBody from '../../lib/containers/BlogBody/BlogBody';
import { Fragment } from 'react';
import Header from '../../lib/components/blog/Header/Header';


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

    const allCategories = allPosts ? utils.getAllCategoriesFromPosts(allPosts) : null;
    const allTags = allPosts ? utils.getAllTagsFromPosts(allPosts) : null;
    
    return (
        <Fragment>
            <Header />
            <BlogBody singleView={false}
                posts={allPosts}
                allCategories={allCategories}
                allTags={allTags}/>
        </Fragment>
    );
};