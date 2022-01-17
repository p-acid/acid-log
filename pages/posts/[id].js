import Head from "next/head";

import { getAllPostIds, getPostData } from "../../lib/posts";

import Posts from "../../components/Posts";

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>All posts | {postData.title}</title>
      </Head>
      <Posts postData={postData} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds("til");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, "til");
  return {
    props: {
      postData,
    },
  };
}
