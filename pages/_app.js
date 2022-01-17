import Head from "next/head";
import { ThemeProvider } from "styled-components";

import Theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";

import Layout from "../components/Layout";

const myApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default myApp;
