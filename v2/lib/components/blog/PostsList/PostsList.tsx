import Post from "../../../models/Post";
import classes from "./PostsList.module.css";
import PostPreview from "../PostPreview/PostPreview";
import * as utils from "../../../utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import ListButtons from "./ListButtons/ListButtons";

export interface IPostsListProps{
    posts: Post[] | null
}

export interface IPagination{
    allPosts: Post[],
    postsOnScreen: Post[], 
    currentPage: number,
    maxPostsPerPage: number,
}

export default function PostsList(props: IPostsListProps){

    const router = useRouter();
    const posts = props.posts || [];
    let [pagination, setPagination] = useState<IPagination>({
        allPosts: posts,
        postsOnScreen: [] as Post[], 
        currentPage: 0,
        maxPostsPerPage: 5
    });

    const getPostsOnScreen = (currentPage: number, maxPostsPerPage: number, allPosts: Post[]) => {
        const startingIndex = currentPage * maxPostsPerPage;
        return allPosts.slice(startingIndex, startingIndex+maxPostsPerPage);
    };

    if(posts.length > 0){
        if(!_.isEqual(pagination.allPosts, posts)){
            const sortedAllPosts = utils.getPostsByDate(posts, false);
            setPagination({
                allPosts: [...sortedAllPosts],
                postsOnScreen: [
                    ...getPostsOnScreen(0, pagination.maxPostsPerPage, sortedAllPosts)
                ],
                currentPage: 0,
                maxPostsPerPage: pagination.maxPostsPerPage
            });
        }else{
            if(pagination.postsOnScreen.length === 0 && pagination.allPosts){
                setPagination(lastPagination => ({
                    allPosts: [...lastPagination.allPosts],
                    postsOnScreen: [
                        ...getPostsOnScreen(0, lastPagination.maxPostsPerPage, lastPagination.allPosts)
                    ],
                    currentPage: 0,
                    maxPostsPerPage: lastPagination.maxPostsPerPage
                }));
            }
        }
    }
    
    useEffect(() => {
        if (router.asPath !== router.route) {
            const currentPageQuery = router.query.currentPage ? parseInt(router.query.currentPage as string) : pagination.currentPage;
            if(currentPageQuery > -1 && pagination.allPosts.length > 0){
                if(pagination.maxPostsPerPage > -1 && currentPageQuery !== pagination.currentPage){
                    setPagination(lastPagination => ({
                        ...lastPagination,
                        postsOnScreen: [
                            ...getPostsOnScreen(currentPageQuery, lastPagination.maxPostsPerPage, lastPagination.allPosts)
                        ],
                        currentPage: currentPageQuery,
                    }));
                }else{
                    setPagination(lastPagination => ({
                        ...lastPagination,
                        postsOnScreen: [
                            ...lastPagination.allPosts
                        ]
                    }));
                }
            }
        }
    }, [router]);

    return (
        <div>
            <div className={classes.PostsList}>
                {pagination.postsOnScreen.map(post => (
                    <PostPreview key={post.slug} post={post}/>
                ))}

            </div>
            <ListButtons currentPage={pagination.currentPage} 
                maxPostsPerPage={pagination.maxPostsPerPage} 
                allPostsLength={pagination.allPosts.length}/>
        </div>
    );
}