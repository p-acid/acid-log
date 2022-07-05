import { useState } from "react";

import Head from "next/head";
import Info from "../components/Info";

import { getSortedPostsData } from "../lib/posts";
import { LIST_INFO } from "../public/const/constants";

import HomeMain from "../container/pages/HomeMain/HomeMain";

export default function Home({ allPostsData }) {
  const [postList, setPostList] = useState(allPostsData);
  const [selectedTag, setSelectedTag] = useState("");

  const handlePostList = (tagName) => {
    setSelectedTag(tagName);
    setPostList(allPostsData.filter((item) => item.tags.includes(tagName)));
  };

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
