import type { AppProps } from 'next/app';
import Script from 'next/script';

import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

import { BaseLayout } from 'layouts';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>B3K3N App</title>
      </Head>
      <Script
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        type="module"
      />
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" noModule />
      <Toaster />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default MyApp;
