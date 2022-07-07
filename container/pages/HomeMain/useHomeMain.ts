import { Post } from "../../../interface/CommonTypes";
import { getFilterdPosts } from "../../../utils/post";
import { RECOMMEND_POST_LIST } from "../../../lib/config/postConfig";

const useHomeMain = (posts: Post[]) => {
  const recommendPosts = getFilterdPosts(posts, RECOMMEND_POST_LIST);

  return { recommendPosts };
};

export default useHomeMain;
