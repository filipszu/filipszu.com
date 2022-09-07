import classes from "./MainCard.module.css";

import Footer from "../Footer/Footer";
import TypedText from "../TypedText/TypedText";
import Header from "../Header/Header";

export interface MainCardProps {
  aboutText?: string;
}

export const TestID = "szu-maincard";

const MainCard = (props: MainCardProps) => {
  const aboutText = props.aboutText || "Welcome to the main card!";
  return (
    <div className={classes.MainCard} data-testid={TestID}>
      <Header data-testid="main-card-header" />
      <section className={classes.Content}>
        <TypedText
          data-testid="main-card-typedtext"
          className={classes.AboutText}
          delay={500}
          interval={10}
          text={aboutText}
        />
      </section>
      <Footer data-testid="main-card-footer" />
    </div>
  );
};

export default MainCard;
