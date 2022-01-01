import Head from "next/head";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../../styles/GlobalStyle";
import Theme from "../../styles/Theme";
import { getAllPostIds, getPostData } from "../../lib/posts";

import Posts from "../../components/Posts";

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>Logs | {postData.title}</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Posts postData={postData} />
      </ThemeProvider>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds("log");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, "log");
  return {
    props: {
      postData,
    },
  };
}
