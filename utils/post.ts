import { Post } from "../interface/CommonTypes";

export const getFilterdPosts = (posts: Post[], filteredBy: string[]) => {
  return posts.filter(({ id }) => filteredBy.includes(id));
};
