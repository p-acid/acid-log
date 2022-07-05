import Head from "next/head";
import { ThemeProvider } from "@emotion/react";

import Theme from "../styles/Theme";
import globalStyle from "../styles/GlobalStyle";

import Layout from "../components/Layout";

const myApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;700&family=Arimo:wght@400;500;600&family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={Theme}>
        {globalStyle}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default myApp;
