import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";

export interface PostsPageProps{
    query: string[]
};

export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(){
    return {
        props:{}
    };
}

export default function PostsPage(props: PostsPageProps){
    const router = useRouter();
    const slug = router.query.slug;
    return (
        <Fragment>
            <h1>Posts Page</h1>
            <ul>
                {
                    (_.isArray(slug)) ? slug.map(slugItem => {
                        return <li>{slugItem}</li>
                    }) : null
                }
            </ul>
        </Fragment>
    );
};