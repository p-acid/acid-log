import Head from "next/head";
import List from "../components/List";
import Bio from "../components/Bio";
import Info from "../components/Info";

import { LIST_INFO } from "../public/const/constants";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Acidlog | Logs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Info info={LIST_INFO.LOGS} />
      <List list={allPostsData} root="log" />
      <Bio />
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData("log");
  return {
    props: {
      allPostsData,
    },
  };
}
