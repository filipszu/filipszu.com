import classes from "./MainCard.module.css";
import { useState } from "react";

import Footer from "../Footer/Footer";
import TypedText from "../TypedText/TypedText";
import Header from "../Header/Header";

export interface MainCardProps {
  aboutText?: string;
}

const MainCard = (props: MainCardProps) => {
  const aboutText = props.aboutText || "Welcome to the main card!";
  return (
    <div className={classes.MainCard}>
      <Header />
      <section className={classes.Content}>
        <TypedText
          className={classes.AboutText}
          delay={500}
          interval={10}
          text={aboutText}
        />
      </section>
      <Footer />
    </div>
  );
};

export default MainCard;
