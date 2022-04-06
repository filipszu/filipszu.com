import Head from 'next/head'
import Home from '../lib/components/home/Home';
import {promises as fs} from 'fs';
import * as utils from "../lib/utils";

interface HomePageProps{
  isHome: true;
  aboutText: string;
}

export async function getStaticProps(){
  const aboutFile = './_content/about_text/about.html';
  const aboutBuffer = await fs.readFile(aboutFile);

  return {
    props: {
      isHome: true,
      aboutText: aboutBuffer.toString(),
    }
  };
};

export default function HomePage(props: HomePageProps) {
  let description = utils.stripHTMLFromString(props.aboutText);

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
