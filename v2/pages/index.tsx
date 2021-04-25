import Head from 'next/head'
import Home from '../components/home/Home';
import {promises as fs} from 'fs';

interface HomePageProps{
  aboutText: string;
}

export async function getStaticProps<HomePageProps>(){
  const aboutFile = './_content/about_text/about.html';
  const aboutBuffer = await fs.readFile(aboutFile);
  return {
    props: {
      aboutText: aboutBuffer.toString()
    }
  };
};

export default function HomePage(props: HomePageProps) {
  let description = props.aboutText.replace(/(<([^>]+)>)/gi, "");

  return (
    <div>
      <Head>
        <title>Filip Szulczewski - Software Engineer</title>
        <link rel="icon" href="/assets/favicon.png" />
        <meta name="description" content={description} />
      </Head>
      <Home aboutText={props.aboutText}/>
    </div>
  )
}
