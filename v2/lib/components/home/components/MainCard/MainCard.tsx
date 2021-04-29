import classes from './MainCard.module.css';
import { useState } from 'react';

import Footer from '../Footer/Footer';
import TypedText from '../TypedText/TypedText';

export interface MainCardProps {
    aboutText?: string;
};

const MainCard = (props: MainCardProps) => {
    const aboutText = props.aboutText || "Welcome to the main card!"
    return (
        <div className={classes.MainCard}>
            <div className={classes.Logo}>
                <h1>FiliPSZU</h1>
                <h4>Software Engineer</h4>
			</div>
            <section className={classes.Content}>
                <TypedText className={classes.AboutText} delay={500} interval={10} text={aboutText}/>
            </section>
            <Footer />
        </div>
    );
};

export default MainCard;