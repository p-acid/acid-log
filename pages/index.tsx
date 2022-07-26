import Head from "next/head";

import { getAllPosts } from "../utils/post";

import HomeMain from "../container/pages/HomeMain/HomeMain";

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Acidlog | Main</title>
        <meta property="og:title" content="Acidlog | Main" />
        <meta property="og:description" content="개발자 성장 일기" />
        <meta property="og:image" content="/images/og_image.png" />
      </Head>
      <HomeMain posts={allPostsData} />
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}
