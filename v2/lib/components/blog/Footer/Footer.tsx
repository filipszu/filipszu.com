import React from "react";
import classes from "./Footer.module.css";
import Link from "next/link";
export default function Footer() {
  const links = (
    <div>
      |&nbsp;<Link href="/">Home</Link>&nbsp; |&nbsp;
      <Link href="/blog">Blog</Link>&nbsp; |&nbsp;
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://twitter.com/filipszu"
      >
        @filipszu
      </a>
      &nbsp; |&nbsp;
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://github.com/filipszu"
      >
        GitHub
      </a>
      &nbsp; |&nbsp;
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://stackoverflow.com/users/9680496/filip-szulczewski"
      >
        StackOverflow
      </a>
      &nbsp; |&nbsp;
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://www.linkedin.com/in/filipszu"
      >
        LinkedIn
      </a>
      &nbsp;|
    </div>
  );

  return <div className={classes.Footer}>{links}</div>;
}
