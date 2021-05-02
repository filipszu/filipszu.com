import * as serverUtils from '../../lib/utils/server';
import * as utils from "../../lib/utils";
import type IBlogPageProps from "./IBlogPageProps";
import { GetStaticProps } from 'next';
import BlogBody from '../../lib/containers/BlogBody/BlogBody';


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
    const allPosts = props.allSeriaziablePosts ? props.allSeriaziablePosts.map(seriaziablePost => utils.seriaziablePostToPost(seriaziablePost)) : [];
    const allCategories = allPosts ? utils.getAllCategoriesFromPosts(allPosts) : null;
    const allTags = allPosts ? utils.getAllTagsFromPosts(allPosts) : null;
    
    return (
        <BlogBody singleView={false}
            posts={allPosts}
            allCategories={allCategories}
            allTags={allTags}
            listTitle=""/>
    );
};