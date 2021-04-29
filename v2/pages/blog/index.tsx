import { Fragment, useState } from 'react';
import * as serverUtils from '../../lib/utils/server';
import Post from "../../lib/models/Post";
import * as utils from "../../lib/utils";

export interface BlogPageProps{
    files: string[],
    parsedFiles: IParsedFile[]
}

export async function getStaticProps(){
    const files = await serverUtils.getFilePaths("./_content/_posts");
    const parsedFiles = await serverUtils.getParsedFiles(files);

    return {
        props: {
            files: files,
            parsedFiles: parsedFiles
        }
    };
}

export default function BlogPage(props: BlogPageProps){
    const [posts, setPosts] = useState<Post[] | null>(null);
    const matchingPosts = props.parsedFiles ? props.parsedFiles.map(parsedFile => utils.parsedFileToPost(parsedFile)) : null;
    if(!posts){
        setPosts(matchingPosts)
    }
    return (
        <Fragment>
            <h1>Blog Page</h1>
            <ul>
                {posts ? posts.map(post => {
                    return <li>{post.title}</li>
                }) : null}
            </ul>
        </Fragment>
    );
};