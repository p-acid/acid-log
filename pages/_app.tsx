import Head from "next/head";
import { ThemeProvider } from "@emotion/react";

import theme from "../styles/Theme";
import globalStyle from "../styles/GlobalStyle";

import Layout from "../components/container/layout/LayoutMain/LayoutMain";

const myApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;700&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {globalStyle}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default myApp;
