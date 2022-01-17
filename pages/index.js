import Head from "next/head";
import List from "../components/List";
import Bio from "../components/Bio";
import Info from "../components/Info";

import { getSortedPostsData } from "../lib/posts";
import { LIST_INFO } from "../public/const/constants";

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Acidlog | Main</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Info info={LIST_INFO.POSTS} />
      <List list={allPostsData} root="posts" />
      <Bio />
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
