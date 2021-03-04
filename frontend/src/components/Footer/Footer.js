import classes from "./Footer.module.css";

const footer = (props) => {
    return (
        <footer className={classes.Footer}>
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://twitter.com/filipszu">@filipszu</a>&nbsp;
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/filipszu">GitHub</a>&nbsp;
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="http://www.linkedin.com/in/filipszu">LinkedIn</a>&nbsp;|
        </footer>
    );
};

export default footer;