import { useState } from "react";

import Head from "next/head";
import List from "../components/List";
import Bio from "../components/Bio";
import Info from "../components/Info";
import TagFilter from "../components/TagFilter";

import { getSortedPostsData } from "../lib/posts";
import { LIST_INFO } from "../public/const/constants";

import useTag from "../utils/useTag";

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
      <Info info={LIST_INFO.POSTS} />
      <TagFilter
        list={useTag(allPostsData)}
        selectedTag={selectedTag}
        handlePostList={handlePostList}
        setAllPost={() => setPostList(allPostsData)}
      />
      <List list={postList} root="posts" />
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
