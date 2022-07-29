import React from "react";
import { AppProps } from "next/app";
import { Fragment } from "react";
import Footer from "../lib/components/blog/Footer/Footer";
import Header from "../lib/components/blog/Header/Header";
import "../styles/globals.css";
import classes from "../styles/Blog.module.css";
import PostsAggregates from "../lib/components/blog/PostsAggregates/PostsAggregates";
import * as utils from "../lib/utils";
import Post from "../lib/models/Post";
import ISerializablePost from "../lib/models/ISerializablePost";

function SZU({ Component, pageProps }: AppProps) {
  let allTags = [] as string[];
  let allCategories = [] as string[];

  if (
    pageProps.allSeriaziablePosts &&
    pageProps.allSeriaziablePosts.length > 0
  ) {
    const posts: Post[] = pageProps.allSeriaziablePosts.map(
      (seriaziablePost: ISerializablePost) =>
        utils.seriaziablePostToPost(seriaziablePost)
    );
    allTags = posts.length > 0 ? utils.getAllTagsFromPosts(posts) : [];
    allCategories =
      posts.length > 0 ? utils.getAllCategoriesFromPosts(posts) : [];
  }

  let appBody = (
    <Fragment>
      <Header />
      <div className={classes.MainContentArea}>
        <div className={classes.SectionWrapper}>
          <section className={classes.ContentSection}>
            <Component {...pageProps} />
          </section>
          <section className={classes.SideBarSection}>
            <PostsAggregates tags={allTags} categories={allCategories} />
          </section>
        </div>
      </div>

      <Footer />
    </Fragment>
  );

  if (pageProps.isHome) {
    appBody = <Component {...pageProps} />;
  }

  return appBody;
}

export default SZU;
