import classes from './MainCard.module.css';
import { useState } from 'react';

import Footer from '../Footer/Footer';
import TypedText from '../TypedText/TypedText';

const MainCard = (props) => {
    const [aboutText, setAboutText] = useState(`Hi,<br />
        my name is <span class="${classes.TextWhite}">Filip Szulczewski</span>.<br />
        I’m an <span class="${classes.TextGreen}">autodidact programmer</span>, with <span class="${classes.TextWhite}">more than a decade of experience</span>.<br /><br />  
        I’ve <span class="${classes.TextGreen}">architected</span>, <span class="${classes.TextGreen}">built</span>, and <span class="${classes.TextGreen}">delivered</span> an array of <span class="${classes.TextPurple}">video applications</span> using <span class="${classes.TextPurple}">web technologies</span>. 
        I have a <span class="${classes.TextWhite}">track record</span> of <span class="${classes.TextWhite}">succesfully augmenting teams</span> in <span class="${classes.TextWhite}">Professional Services</span> capacity.  
        I've worked both on <span class="${classes.TextPurple}">frontend</span> and <span class="${classes.TextPurple}">backend</span> projects.  
        I’m a <span class="${classes.TextPurple}">FOSS</span> enthusiast with a <span class="${classes.TextPurple}">DIY</span> spirit.`);

    return (
        <div className={classes.MainCard}>
            <div className={classes.Logo}>
                <h1>FiliPSZU</h1>
                <h4>Software Engineer</h4>
			</div>
            <section className={classes.Content}>
                <TypedText className={classes.AboutText} delay={500} interval={10}>{aboutText}</TypedText>
            </section>
            <Footer />
        </div>
    );
};

export default MainCard;