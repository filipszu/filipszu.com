import classes from "./Footer.module.css";
import { isMobile, isTablet } from 'react-device-detect';

const footer = (props) => {
    let links = (
        <div>
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://twitter.com/filipszu">@filipszu</a>&nbsp;
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/filipszu">GitHub</a>&nbsp;
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://stackoverflow.com/users/9680496/filip-szulczewski">StackOverflow</a>&nbsp;
            |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://www.linkedin.com/in/filipszu">LinkedIn</a>&nbsp;|
        </div>
    );

    if(isMobile || isTablet){
        links = (
            <div>
                |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://twitter.com/filipszu">@filipszu</a>&nbsp;
                |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/filipszu">GitHub</a>&nbsp;|
                <br />
                |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://stackoverflow.com/users/9680496/filip-szulczewski">StackOverflow</a>&nbsp;
                |&nbsp;<a target="_blank" rel="nofollow noopener noreferrer" href="https://www.linkedin.com/in/filipszu">LinkedIn</a>&nbsp;|
            </div>
        );
    }

    return (
        <footer className={classes.Footer}>
            {links}
        </footer>
    );
};

export default footer;