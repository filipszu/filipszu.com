import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Filip Szulczewski - Software Engineer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>SZU with Next JS</h1>
    </div>
  )
}
