import classes from './Home.module.css';
import MainCard from './components/MainCard/MainCard';
import WordCloud from './components/WordCloud/WordCloud';
import {isDesktop, isTablet} from 'react-device-detect';

export interface HomeProps {
  aboutText?: string;
}

function Home(props: HomeProps) {
  let wordCloud = null;
  if(isTablet){
    wordCloud = <WordCloud delay={500} interval={30} wordMultiplier={5}/>;
  } else if(isDesktop){
    wordCloud = <WordCloud delay={500} interval={30} wordMultiplier={15}/>;
  }
  return (
    <div className={classes.Home}>
      {wordCloud}
      <MainCard aboutText={props.aboutText}/>
    </div>
  );
}

export default Home;
