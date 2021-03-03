import { Component } from 'react';
import classes from './MainCard.module.css';
import { useState } from 'react';

import Footer from '../Footer/Footer';
import TypedText from '../TypedText/TypedText';

const MainCard = (props) => {
    const [aboutText, setAboutText] = useState(`Hi,<br />
        my name is <span class="textWhite">Filip Szulczewski</span>.<br />
        I’m an <span class="textGreen">autodidact programmer</span>, with <span class="textWhite">more than a decade of experience</span>.<br /><br />  
        I’ve <span class="textGreen">architected</span>, <span class="textGreen">built</span> and <span class="textGreen">delivered</span> an array of <span class="textPurple">video applications</span> using <span class="textPurple">web technologies</span>. 
        I have a <span class="textWhite">track record</span> of <span class="textWhite">succesfully augmenting teams</span> in <span class="textWhite">Professional Services</span> capacity.  
        I have experience in working both on the <span class="textPurple">frontend</span> and the <span class="textPurple">backend</span>.  
        I’m a <span class="textPurple">FOSS</span> enthusiast with a <span class="textPurple">DIY</span> spirit.`);

    return (
        <div className={classes.MainCard}>
            <div className={classes.Logo}>
                <h1>FiliPSZU</h1>
                <h4>Software Engineer</h4>
			</div>
            <section className={classes.Content}>
                <TypedText className={classes.AboutText}>{aboutText}</TypedText>
            </section>
            <Footer />
        </div>
    );
};

export default MainCard;