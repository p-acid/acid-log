import Head from "next/head";
import Layout from "../components/Layout";
import List from "../components/List";
import Bio from "../components/Bio";

import GlobalStyle from "../styles/GlobalStyle";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>All posts| Acidlog</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <GlobalStyle />
      <Layout>
        <Bio />
        <List list={allPostsData} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
