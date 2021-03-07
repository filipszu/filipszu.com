import classes from './App.module.css';
import MainCard from './components/MainCard/MainCard';
import WordCloud from './components/WordCloud/WordCloud';

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.BackDrop}></div>
      <WordCloud delay={100} interval={30} wordMultiplier={30}/>
      <MainCard />
    </div>
  );
}

export default App;
