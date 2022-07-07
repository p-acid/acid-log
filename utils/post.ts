import { Category, Post } from "../interface/CommonTypes";

import { CATEGORY_LIST } from "../lib/config/postConfig";

export const getRecommendedPosts = (posts: Post[], filterList: string[]) => {
  return posts.filter(({ id }) => filterList.includes(id));
};

export const getCategoryPosts = (posts: Post[]): Category[] => {
  return Object.values(CATEGORY_LIST).map(
    ({ tag, title, thumbnail, infoBackground }) => ({
      tag,
      title,
      thumbnail,
      infoBackground: infoBackground as Category["infoBackground"],
      postIdList: posts
        .filter(({ tags }) => tags.includes(tag))
        .map((post) => post.id),
    })
  );
};
