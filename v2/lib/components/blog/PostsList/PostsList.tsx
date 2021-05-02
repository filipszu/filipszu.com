import Post from "../../../models/Post";
import classes from "./PostsList.module.css";
import PostPreview from "../PostPreview/PostPreview";
import * as utils from "../../../utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";

export interface PostsListProps{
    posts: Post[] | null
}
export default function PostsList(props: PostsListProps){

    const router = useRouter();
    const maxPostsPerPage = 5;
    const posts = props.posts || [];
    let listButtons = null;
    let [pagination, setPagination] = useState({
        allPosts: posts,
        postsOnScreen: [] as Post[], 
        currentPage: 0
    });

    const getPostsOnScreen = (currentPage: number, maxPostsPerPage: number, allPosts: Post[]) => {
        const startingIndex = currentPage * maxPostsPerPage;
        return allPosts.slice(startingIndex, startingIndex+maxPostsPerPage);
    };

    const getMaxPages = (maxPostsPerPage: number, allPosts: Post[]) => {
        return Math.floor(allPosts.length / maxPostsPerPage);
    };

    const onPrevClick = () => {
        const currentPage = pagination.currentPage - 1 < 0 ? 0 : pagination.currentPage - 1;
        router.push({
            pathname: router.pathname,
            query: {...router.query, currentPage: currentPage}
        });
    };

    const onNextClick = () => {
        const pagesNumber = getMaxPages(maxPostsPerPage, pagination.allPosts);
        const currentPage = pagination.currentPage + 1 > pagesNumber ? pagesNumber : pagination.currentPage + 1;
        router.push({
            pathname: router.pathname,
            query: {...router.query, currentPage: currentPage}
        });
    };

    if(posts.length > 0){
        if(!_.isEqual(pagination.allPosts, posts)){
            const sortedAllPosts = utils.getPostsByDate(posts, false);
            setPagination({
                allPosts: [...sortedAllPosts],
                postsOnScreen: [
                    ...getPostsOnScreen(0, maxPostsPerPage, sortedAllPosts)
                ],
                currentPage: 0
            });
        }else{
            if(pagination.postsOnScreen.length === 0 && pagination.allPosts){
                setPagination(lastPagination => ({
                    allPosts: [...lastPagination.allPosts],
                    postsOnScreen: [
                        ...getPostsOnScreen(0, maxPostsPerPage, lastPagination.allPosts)
                    ],
                    currentPage: 0
                }));
            }
        }
    }
    
    useEffect(() => {
        if (router.asPath !== router.route) {
            const currentPageQuery = router.query.currentPage ? parseInt(router.query.currentPage as string) : pagination.currentPage;
            if(currentPageQuery > -1 && pagination.allPosts.length > 0){
                if(maxPostsPerPage > -1 && currentPageQuery !== pagination.currentPage){
                    setPagination(lastPagination => ({
                        allPosts: lastPagination.allPosts,
                        postsOnScreen: [
                            ...getPostsOnScreen(currentPageQuery, maxPostsPerPage, lastPagination.allPosts)
                        ],
                        currentPage: currentPageQuery
                    }));
                }else{
                    setPagination(lastPagination => ({
                        allPosts: lastPagination.allPosts,
                        postsOnScreen: [
                            ...lastPagination.allPosts
                        ],
                        currentPage: currentPageQuery
                    }));
                }
            }
        }
    }, [router]);

    if(pagination.postsOnScreen.length > 0){
        listButtons = (
            <div className={classes.ListButtons}>
                <button onClick={onPrevClick}>Prev Page</button>
                <div>Page {pagination.currentPage+1}/{getMaxPages(maxPostsPerPage, pagination.allPosts)+1}</div>
                <button onClick={onNextClick}>Next Page</button>
            </div>
        );
    }

    return (
        <div>
            <div className={classes.PostsList}>
                {pagination.postsOnScreen.map(post => (
                    <PostPreview key={post.slug} post={post}/>
                ))}
            </div>
            {listButtons}
        </div>
    );
}