import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.css';

function SZUBlog({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default SZUBlog;
