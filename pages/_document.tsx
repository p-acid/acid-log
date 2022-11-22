import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta name="description" content="example" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
        />
      </Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
