import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@emotion/react";

import theme from "../styles/Theme";
import globalStyle from "../styles/GlobalStyle";

import Layout from "../container/layout/LayoutMain/LayoutMain";
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
