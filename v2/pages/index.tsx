import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Home from '../home/Home';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Filip Szulczewski - Software Engineer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Home />
    </div>
  )
}
