import { ThemeProvider } from "styled-components";

import Theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";

import Layout from "../components/Layout";

const myApp = ({ Component, pageProps }) => {
  return (
    <>
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
