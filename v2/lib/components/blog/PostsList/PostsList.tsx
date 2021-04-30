import Post from "../../../models/Post";
import classes from "./PostsList.module.css";
import PostPreview from "../PostPreview/PostPreview";
import * as utils from "../../../utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface PostsListProps{
    posts: Post[] | null
}
export default function PostsList(props: PostsListProps){

    const router = useRouter();
    const maxPostsPerPage = 5;
    const posts = props.posts || [];
    let listButtons = null;
    let [allPosts, setAllPosts] = useState([] as Post[]);
    let [pagination, setPagination] = useState({postsOnScreen: [] as Post[], currentPage: 0});

    const getPostsOnScreen = (currentPage: number, maxPostsPerPage: number) => {
        const startingIndex = currentPage * maxPostsPerPage;
        return allPosts.slice(startingIndex, startingIndex+maxPostsPerPage);
    };

    const getMaxPages = (maxPostsPerPage: number) => {
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
        const pagesNumber = getMaxPages(maxPostsPerPage);
        const currentPage = pagination.currentPage + 1 > pagesNumber ? pagesNumber : pagination.currentPage + 1;
        router.push({
            pathname: router.pathname,
            query: {...router.query, currentPage: currentPage}
        });
    };

    if(allPosts.length === 0){
        const sortedAllPosts = utils.getPostsByDate(posts, false);
        setAllPosts(sortedAllPosts);
    }else{
        if(pagination.postsOnScreen.length === 0){
            setPagination({
                postsOnScreen: getPostsOnScreen(0, maxPostsPerPage),
                currentPage: 0
            });
        }
    }

    useEffect(() => {
        if (router.asPath !== router.route) {
            const currentPageQuery = router.query.currentPage ? parseInt(router.query.currentPage as string) : pagination.currentPage;
            if(currentPageQuery > -1 && allPosts.length > 0){
                if(maxPostsPerPage > -1 && currentPageQuery !== pagination.currentPage){
                    setPagination({
                        postsOnScreen: getPostsOnScreen(currentPageQuery, maxPostsPerPage),
                        currentPage: currentPageQuery
                    });
                }else{
                    setPagination({
                        postsOnScreen: allPosts,
                        currentPage: currentPageQuery
                    });
                }
            }
        }
    }, [router]);

    if(pagination.postsOnScreen.length > 0){
        listButtons = (
            <div className={classes.ListButtons}>
                <button onClick={onPrevClick}>Prev Page</button>
                <div>Page {pagination.currentPage+1}/{getMaxPages(maxPostsPerPage)+1}</div>
                <button onClick={onNextClick}>Next Page</button>
            </div>
        );
    }

    return (
        <div>
            {listButtons}
            <div className={classes.PostsList}>
                {pagination.postsOnScreen.map(post => (
                    <PostPreview key={post.slug} post={post}/>
                ))}
            </div>
            {listButtons}
        </div>
    );
}