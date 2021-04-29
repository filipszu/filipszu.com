import { Fragment } from "react";
import Post from "../../../models/Post";
import IParams from "../../../types/IParams";
import * as utils from "../../../utils";
import _ from "lodash";

export interface SlugDebuggerProps{
    query?: IParams;
    allFileNames?: string[];
    matchingFileNames?: string[];
    posts?: Post[] | null;
}

export default function SlugDebugger(props:SlugDebuggerProps){
    const query = props.query ? props.query : {query: {slug: []}};
    const slug = (props.query && _.isArray(props.query.slug)) ? props.query.slug : [];
    const allFileNames = _.isArray(props.allFileNames) ? props.allFileNames : [];
    const matchingFileNames = _.isArray(props.matchingFileNames) ? props.matchingFileNames : []; 
    const posts = props.posts ? props.posts : []; 
    const slugMatchParagraph = (
        <div>
            {(matchingFileNames.length > 0 ? <h3 className="TextGreen">Slug did match a Post</h3> : <h3 className="TextRed">Slug did not match a Post</h3>)}
            <p>The provided slug(s):</p>
            <ul>
                {
                    (_.isArray(slug)) ? slug.map(slugItem => {
                        return <li>{slugItem}</li>
                    }) : null
                }
            </ul>
        </div>
    );

    const matchingPostParagraph = (posts && posts.length) ?  (
        <div style={{padding: "50px"}}>
            <h3>Title: {posts[0].title}</h3>
            <h4>Category: <strong>{posts[0].category}</strong></h4>
            <h4>Tags: {posts[0].tags.map(tag => (
                <span>{tag}&nbsp;</span>
            ))}</h4>
            <h4>Publish date: {utils.dateToDateString(posts[0].date)}</h4>
            <div dangerouslySetInnerHTML={{__html: posts[0].body}}/>
        </div>
    ) : <p className="TextRed">No Posts Matched</p>;

    const slugDebugger = (<Fragment>
            <h1>Posts Page</h1>
            <h2>Slug:</h2>
            {slugMatchParagraph}
            <h2>Posts:</h2>
            {(matchingFileNames.length > 0) ? <h3>Matching Posts:</h3> : <h3 className="TextRed">No Matching </h3>}
            <ul>
                {
                    (matchingFileNames.length > 0) ? matchingFileNames.map(slug => {
                        return <li>{slug}</li>
                    }) : null
                }
            </ul>
            {matchingPostParagraph}
            <h3>All Posts:</h3>
            <ul>
                {
                    (allFileNames.length > 0) ? allFileNames.map(postName => {
                        return <li>{postName}</li>
                    }) : null
                }
            </ul>
        </Fragment>);    

    return slugDebugger;
}