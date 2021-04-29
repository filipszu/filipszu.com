import { Fragment } from 'react';
import * as serverUtils from '../../lib/utils/server';

export interface BlogPageProps{
    files: string[]
}

export async function getStaticProps(){
    const files = await serverUtils.getFilePaths("./_content/_posts");
    return {
        props: {
            files: files
        }
    };
}

export default function BlogPage(props: BlogPageProps){
    return (
        <Fragment>
            <h1>Blog Page</h1>
            <ul>
                {props.files.map(file => {
                    return <li>{file}</li>
                })}
            </ul>
        </Fragment>
    );
};