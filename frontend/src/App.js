import classes from './App.module.css';
import MainCard from './components/MainCard/MainCard';
import WordCloud from './components/WordCloud/WordCloud';

import {isBrowser, isTablet} from 'react-device-detect';

function App() {
  const wordCloud = (isBrowser || isTablet) ? <WordCloud delay={500} interval={30} wordMultiplier={15}/> : null;
  return (
    <div className={classes.App}>
      {wordCloud}
      <MainCard />
    </div>
  );
}

export default App;
