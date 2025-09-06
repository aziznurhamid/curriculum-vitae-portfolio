import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable} font-sans`}>
      <ThemeProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </main>
  );
}

export default MyApp;