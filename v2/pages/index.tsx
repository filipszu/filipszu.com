import Head from 'next/head'
import Home from '../components/home/Home';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Filip Szulczewski - Software Engineer</title>
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <Home />
    </div>
  )
}
