import { Component } from 'react';
import classes from './MainCard.module.css';
import Footer from './Footer/Footer';

const mainCard = (props) => {
    return (
        <div className={classes.MainCard}>
            <div className={classes.Logo}>
                <h1>FiliPSZU</h1>
                <h4>Software Engineer</h4>
			</div>
            <Footer />
        </div>
    );
};

export default mainCard;