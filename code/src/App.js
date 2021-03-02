import classes from './App.module.css';
import MainCard from './components/MainCard/MainCard';

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.BackDrop}></div>
      <MainCard />
    </div>
  );
}

export default App;
