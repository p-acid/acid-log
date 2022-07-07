import PostList from "../../../components/Post/PostList/PostList";
import { Post } from "../../../interface/CommonTypes";
import { StickyWrapper } from "./HomeMainStlye";

interface HomeMainProps {
  posts: Post[];
}

const HomeMain = ({ posts }: HomeMainProps) => (
  <>
    <StickyWrapper>
      <PostList posts={posts} title="카테고리 별" />
    </StickyWrapper>
    <PostList posts={posts} />
    <StickyWrapper>
      <PostList posts={posts} title="추천 포스팅" />
    </StickyWrapper>
  </>
);

export default HomeMain;
