import Head from "next/head";
import { ThemeProvider } from "@emotion/react";

import theme from "../styles/Theme";
import globalStyle from "../styles/GlobalStyle";

import Layout from "../container/layout/LayoutMain/LayoutMain";
import { RecoilRoot } from "recoil";
import NavMenu from "../components/common/Menu/NavMenu/NavMenu";

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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          {globalStyle}
          <Layout>
            <Component {...pageProps} />
            <NavMenu />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default myApp;
