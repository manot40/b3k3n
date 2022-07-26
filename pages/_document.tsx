import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class NextDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="application-name" content="B3K3N App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="B3K3N App" />
          <meta name="description" content="B3K3N App Frontend" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="B3K3N App" />
          <meta name="twitter:description" content="B3K3N App Frontend" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="B3K3N App" />
          <meta property="og:description" content="B3K3N App Frontend" />
          <meta property="og:site_name" content="B3K3N App" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NextDocument;
