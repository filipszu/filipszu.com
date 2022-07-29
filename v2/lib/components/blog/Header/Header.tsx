import React from "react";
import Link from "next/link";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <nav className={classes.NavBar}>
      <div className={classes.Logo}>
        <Link href="/">
          <div className={classes.LogoHit}>
            <h1>Filip Szu</h1>
            <h4>Software Engineer</h4>
          </div>
        </Link>
      </div>
      <div className={classes.SiteTitle}>
        <a href="/blog">Rambles From The Cut</a>
      </div>
    </nav>
  );
}
