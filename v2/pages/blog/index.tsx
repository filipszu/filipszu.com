import { Fragment, useState } from 'react';
import * as serverUtils from '../../lib/utils/server';
import Post from "../../lib/models/Post";
import * as utils from "../../lib/utils";
import Link from "next/link";
import Header from '../../lib/components/blog/Header/Header';
import ISerializablePost from '../../lib/models/ISerializablePost';
import PostPreview from '../../lib/components/blog/PostPreview/PostPreview';

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
    if(!posts){
        setPosts(matchingPosts)
    }
    return (
        <Fragment>
            <Header />
            <div>
                {posts ? posts.map(post => {
                    return (
                        <PostPreview post={post} />
                    )
                }) : null}
            </div>
        </Fragment>
    );
};