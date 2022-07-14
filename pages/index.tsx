import Head from "next/head";

import { getAllPosts } from "../utils/post";

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

export async function getServerSideProps() {
  const allPostsData = getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}
