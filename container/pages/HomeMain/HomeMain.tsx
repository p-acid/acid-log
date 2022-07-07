import { Post } from "../../../interface/CommonTypes";

import { StickyWrapper } from "./HomeMainStyle";

import PostList from "../../../components/Post/PostList/PostList";
import useHomeMain from "./useHomeMain";

export interface HomeMainProps {
  posts: Post[];
}

const HomeMain = ({ posts }: HomeMainProps) => {
  const { recommendPosts } = useHomeMain(posts);

  return (
    <>
      <StickyWrapper>
        <PostList posts={posts} title="카테고리 별" />
      </StickyWrapper>
      <PostList posts={posts} />
      <StickyWrapper>
        <PostList posts={recommendPosts} title="추천 포스팅" />
      </StickyWrapper>
    </>
  );
};

export default HomeMain;
