import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
