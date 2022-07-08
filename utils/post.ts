import { Category, Post } from "../interface/CommonTypes";

import { CATEGORIES } from "../lib/config/postConfig";

export const getRecommendedPosts = (posts: Post[], filterList: string[]) => {
  return posts.filter(({ id }) => filterList.includes(id));
};

export const getCategoryPosts = (posts: Post[]): Category[] => {
  return Object.values(CATEGORIES).map(
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

export const getCategoryData = () => {};

// export const getPostIdList = (route: string) => {
//   const fileNames = fs.readdirSync(getPath(route));

//   return fileNames.map((fileName) => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, ""),
//       },
//     };
//   });
// };

export const getCategoryList = () => {
  return Object.keys(CATEGORIES).map((category) => ({
    params: {
      category,
    },
  }));
};
