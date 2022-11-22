import { Post } from "../../../interface/CommonTypes";
import { getCategoryPosts, getRecommendedPosts } from "../../../utils/post";
import { RECOMMEND_POST_LIST } from "../../../lib/config/blogConfig";

const useHomeMain = (posts: Post[]) => {
  const recommendPosts = getRecommendedPosts(posts, RECOMMEND_POST_LIST);
  const categoryList = getCategoryPosts(posts);

  return { recommendPosts, categoryList };
};

export default useHomeMain;
