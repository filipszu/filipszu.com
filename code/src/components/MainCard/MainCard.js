import { Component } from 'react';
import classes from './MainCard.module.css';

const mainCard = (props) => {
    return (
        <div className={classes.MainCard}>
            <div className={classes.Logo}>
					<h1>FiliPSZU</h1>
					<h4>Software Engineer</h4>
			</div>
            <footer>
                |&nbsp;<a target="_blank" href="https://twitter.com/filipszu">@filipszu</a>&nbsp;
                |&nbsp;<a target="_blank" href="https://github.com/filipszu">GitHub</a>&nbsp;
                |&nbsp;<a target="_blank" href="http://www.linkedin.com/in/filipszu">LinkedIn</a>&nbsp;|
            </footer>
        </div>
    );
};

export default mainCard;