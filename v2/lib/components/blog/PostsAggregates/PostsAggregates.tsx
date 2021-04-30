import Link from "next/link";
import { Fragment } from "react";
import classes from "./PostsAggregates.module.css";
export interface PostsAggregatesProps{
    tags?: string[] | null,
    categories?: string[] | null
}
export default function PostsAggregates(props: PostsAggregatesProps){
    let tagsParagraph = null;
    let categoriesParagraph = null;
    if(props.categories){
        categoriesParagraph = (
            <Fragment>
                <div>CATEGORIES:</div>
                <ul>
                    {props.categories.map(category => (
                        <li><Link href="/">{category}</Link></li>
                    ))}
                </ul>
            </Fragment>
        );
    }

    if(props.tags){
        tagsParagraph = (
            <Fragment>
                <div>Tags:</div>
                <ul>
                    {props.tags.map(tag => (
                        <li><Link href="/">{tag}</Link></li>
                    ))}
                </ul>
            </Fragment>
        );
    }
    return (
        <div className={classes.PostsAggregates}>
            {categoriesParagraph}
            {tagsParagraph}
        </div>
    );
}