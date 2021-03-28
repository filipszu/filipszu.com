import classes from './App.module.css';
import MainCard from './components/MainCard/MainCard';
import WordCloud from './components/WordCloud/WordCloud';

import {MobileView, BrowserView} from 'react-device-detect';

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.BackDrop}></div>
      <BrowserView>
        <WordCloud delay={500} interval={30} wordMultiplier={15}/>
      </BrowserView>
      <MainCard />
    </div>
  );
}

export default App;
