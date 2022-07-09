import { Post } from "../../../../interface/CommonTypes";

import { StickyWrapper } from "./HomeMainStyle";

import PostList from "../../../Post/PostList/PostList";
import useHomeMain from "./useHomeMain";
import CategoryList from "../../../Category/CategoryList/CategoryList";

export interface HomeMainProps {
  posts: Post[];
}

const HomeMain = ({ posts }: HomeMainProps) => {
  const { recommendPosts, categoryList } = useHomeMain(posts);

  return (
    <>
      <StickyWrapper>
        <CategoryList categoryList={categoryList} />
      </StickyWrapper>
      <PostList posts={posts} />
      <StickyWrapper>
        <PostList posts={recommendPosts} title="추천 포스팅" />
      </StickyWrapper>
    </>
  );
};

export default HomeMain;
