import classes from "./ListButtons.module.css";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler } from "react";

export interface IListButtonsProps{
    allPostsLength: number,
    currentPage: number,
    maxPostsPerPage: number,
}

export default function ListButtons(props: IListButtonsProps){
    const router = useRouter();

    const getMaxPages = (maxPostsPerPage: number, allPostsLength: number) => {
        return Math.floor(allPostsLength / maxPostsPerPage);
    };

    const onPaginationButtonClick = (pageNumber: number, e?:MouseEvent<HTMLAnchorElement>) => {
        if(e && e.target){
            e.preventDefault();
        }
        router.push({
            pathname: router.pathname,
            query: {...router.query, currentPage: pageNumber}
        });
    };

    const onPrevClick:MouseEventHandler = (e) => {
        e.preventDefault();
        const currentPage = props.currentPage - 1 < 0 ? 0 : props.currentPage - 1;
        router.push({
            pathname: router.pathname,
            query: {...router.query, currentPage: currentPage}
        });
    };

    const onNextClick: MouseEventHandler = (e) => {
        e.preventDefault();
        const pagesNumber = getMaxPages(props.maxPostsPerPage, props.allPostsLength);
        const currentPage = props.currentPage + 1 > pagesNumber ? pagesNumber : props.currentPage + 1;
        router.push({
            pathname: router.pathname,
            query: {...router.query, currentPage: currentPage}
        });
    };

    let listButtons = null;

    const firstPage = props.currentPage === 0;
    const lastPage = props.currentPage === getMaxPages(props.maxPostsPerPage, props.allPostsLength);

    if(!(firstPage && lastPage)){
        const pagesArray = new Array(getMaxPages(props.maxPostsPerPage, props.allPostsLength) + 1).fill(null)
            .map((nullValue: null, index) => {
                return index + 1;
            });
        const prevPageLabel = `<< Prev Page`;
        const nextPageLabel = `Next Page >>`;
        listButtons = (
            <div className={classes.ListButtons}>
                {firstPage ? <span className={classes.DisabledPagination}>{prevPageLabel}</span> : <a onClick={onPrevClick}>{prevPageLabel}</a>}
                <div>
                    {pagesArray.map((pageNumber, index) => {
                        let pageLink = (
                            <a href="/" key={index} onClick={(e) => {onPaginationButtonClick(index, e)}}>
                                {pageNumber}
                            </a>
                        );

                        if(index === props.currentPage){
                            pageLink = <span key={index} className={classes.DisabledPagination}>{pageNumber}</span>;
                        }

                        return pageLink;
                    })}
                </div>
                {lastPage ? <span className={classes.DisabledPagination}>{nextPageLabel}</span> : <a onClick={onNextClick}>{nextPageLabel}</a>}
            </div>
        );
    }

    return listButtons;
}