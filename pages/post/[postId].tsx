import PostMain from "../../container/pages/PostMain/PostMain";
import { getPostData } from "../../utils/post";
import { getAllPostPaths } from "../../utils/post";

const Post = (props: any) => {
  return <PostMain {...props} />;
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
