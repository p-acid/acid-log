import Head from "next/head";

import { getSortedPostsData } from "../lib/posts";

import HomeMain from "../components/container/pages/HomeMain/HomeMain";

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Acidlog | Main</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <HomeMain posts={allPostsData} />
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
