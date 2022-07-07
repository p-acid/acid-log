import Head from "next/head";

import { getSortedPostsData } from "../lib/posts";

import HomeMain from "../container/pages/HomeMain/HomeMain";

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
  const allPostsData = getSortedPostsData("til");
  return {
    props: {
      allPostsData,
    },
  };
}
