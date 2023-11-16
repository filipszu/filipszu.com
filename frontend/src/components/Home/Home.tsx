import classes from './Home.module.css';
import MainCard from './components/MainCard/MainCard';
import {isDesktop, isTablet} from 'react-device-detect';
import WordCloud2 from './components/WordCloud/WordCloud2';
import { useEffect, useState } from 'react';

const wordCount = 10;
export interface HomeProps {
  aboutText?: string;
}

function Home(props: HomeProps) {
  
  // let wordCloud = null;
  // if(isTablet){
  //   wordCloud = <WordCloud delay={500} interval={30} wordMultiplier={5}/>;
  // } else if(isDesktop){
  //   wordCloud = <WordCloud delay={500} interval={30} wordMultiplier={15}/>;
  // }
  const [words, setWords] = useState<string[]>([]);
  const wordCloud = <WordCloud2 words={words}/>;

  useEffect(() => {
    if(words.length === 0){
      const words: string[] = [];
      for(let i = 0; i < wordCount; i++){
        words.push(`Word_${i}`);
      }
      setWords(words);
    }
  }, [words, setWords]);

  return (
    <div className={classes.Home}>
      {wordCloud}
      <MainCard aboutText={props.aboutText}/>
    </div>
  );
}

export default Home;
