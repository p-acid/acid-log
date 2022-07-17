import Head from "next/head";
import dynamic from "next/dynamic";

import { getPostData } from "../../utils/post";
import { getAllPostPaths } from "../../utils/post";

const DynamicPostMain = dynamic(
  () => import("../../container/pages/PostMain/PostMain"),
  {
    ssr: false,
  }
);

const Post = (props: any) => {
  return (
    <>
      <Head>
        <title>Acidlog | {props.postData.title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <DynamicPostMain {...props} />
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const allPostsList = getAllPostPaths();

  return {
    paths: allPostsList,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.postId);

  return {
    props: {
      postData,
    },
  };
}
