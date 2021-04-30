import { Fragment, useState } from 'react';
import * as serverUtils from '../../lib/utils/server';
import Post from "../../lib/models/Post";
import * as utils from "../../lib/utils";
import Header from '../../lib/components/blog/Header/Header';
import ISerializablePost from '../../lib/models/ISerializablePost';
import PostsList from '../../lib/components/blog/PostsList/PostsList';
import classes from './blog.module.css';
import PostsAggregates from '../../lib/components/blog/PostsAggregates/PostsAggregates';

export interface BlogPageProps{
    files: string[],
    parsedFiles: ISerializablePost[]
}

export async function getStaticProps(){
    const files = await serverUtils.getFilePaths("./_content/_posts");
    const parsedFiles = await serverUtils.getSeriaziablePosts(files);

    return {
        props: {
            files: files,
            parsedFiles: parsedFiles
        }
    };
}

export default function BlogPage(props: BlogPageProps){
    const [posts, setPosts] = useState<Post[] | null>(null);
    const matchingPosts = props.parsedFiles ? props.parsedFiles.map(parsedFile => utils.seriaziablePostToPost(parsedFile)) : null;
    const allCategories = matchingPosts ? utils.getAllCategoriesFromPosts(matchingPosts) : null;
    const allTags = matchingPosts ? utils.getAllTagsFromPosts(matchingPosts) : null;
    if(!posts){
        setPosts(matchingPosts)
    }

    return (
        <Fragment>
            <Header />
            <div className={classes.MainContentArea}>
                <div className={classes.SectionWrapper}>
                    <section className={classes.ContentSection}>
                        <PostsList posts={posts}/>
                    </section>
                    <section className={classes.SideBarSection}>
                        <PostsAggregates tags={allTags} categories={allCategories}/>
                    </section>
                </div>
            </div>
        </Fragment>
    );
};