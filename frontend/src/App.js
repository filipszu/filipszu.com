import classes from './App.module.css';
import MainCard from './components/MainCard/MainCard';
import WordCloud from './components/WordCloud/WordCloud';

import {isBrowser, isMobile, isTablet} from 'react-device-detect';

function App() {
  let wordCloud = <WordCloud delay={500} interval={30} wordMultiplier={15}/>;
  if(isTablet){
    wordCloud = <WordCloud delay={500} interval={30} wordMultiplier={5}/>;
  } else if(isMobile){
    wordCloud = null;
  }
  return (
    <div className={classes.App}>
      {wordCloud}
      <MainCard />
    </div>
  );
}

export default App;
