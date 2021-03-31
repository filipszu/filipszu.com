import classes from './App.module.css';
import MainCard from './components/MainCard/MainCard';
import WordCloud from './components/WordCloud/WordCloud';

import {BrowserView, TabletView} from 'react-device-detect';

function App() {
  return (
    <div className={classes.App}>
      <BrowserView>
        <WordCloud delay={500} interval={30} wordMultiplier={15}/>
      </BrowserView>
      <TabletView>
        <WordCloud delay={500} interval={30} wordMultiplier={15}/>
      </TabletView>
      <MainCard />
    </div>
  );
}

export default App;
