import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { getPostData } from "../../utils/post";
import { getAllPostPaths } from "../../utils/post";
import { checkGif } from "../../utils/image";

import Helmet from "../../components/Helmet/Helmet";

import { DOMAIN, URL } from "../../lib/config/urlConfig";

const DynamicPostMain = dynamic(
  () => import("../../container/pages/PostMain/PostMain"),
  {
    ssr: false,
  }
);

const Post = (props: any) => {
  const { query, asPath } = useRouter();

  return (
    <>
      <Helmet
        title={`Acidlog | ${props.postData.title}`}
        description={props.postData.description}
        image={
          checkGif(props.postData.thumbnail)
            ? `${URL.IMAGE.BASE}/og_image.png`
            : `${URL.IMAGE.POSTS}/${query.postId}/${props.postData.thumbnail}`
        }
        url={asPath ? `${DOMAIN}${asPath}` : DOMAIN}
      />
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
