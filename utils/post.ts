import { Post } from "../interface/CommonTypes";
import { CATEGORY_LIST } from "../lib/config/postConfig";

export const getRecommendedPosts = (posts: Post[], filterList: string[]) => {
  return posts.filter(({ id }) => filterList.includes(id));
};

export const getCategoryPosts = (posts: Post[]) => {
  return CATEGORY_LIST.map(({ tag, title, thumbnail, infoBackground }) => ({
    title,
    thumbnail,
    infoBackground,
    postIdList: posts
      .filter(({ tags }) => tags.includes(tag))
      .map((post) => post.id),
  }));
};
