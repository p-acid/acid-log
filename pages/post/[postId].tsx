import Head from "next/head";
import dynamic from "next/dynamic";

import { getPostData } from "../../utils/post";
import { getAllPostPaths } from "../../utils/post";

import { URL } from "../../lib/config/urlConfig";

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
        <meta
          property="og:title"
          content={`Acidlog | ${props.postData.title}`}
        />
        <meta property="og:description" content={props.postData.description} />
        <meta
          property="og:image"
          content={`${URL.IMAGE.POSTS}/${props.postData.thumbnail}`}
        />
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
