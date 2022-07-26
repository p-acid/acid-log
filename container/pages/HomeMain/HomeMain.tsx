import { Post } from "../../../interface/CommonTypes";

import { StickyWrapper } from "./HomeMainStyle";

import PostList from "../../../components/Post/PostList/PostList";
import useHomeMain from "./useHomeMain";
import CategoryList from "../../../components/Category/CategoryList/CategoryList";
import CategoryCard from "../../../components/Category/CategoryCard/CategoryCard";

import { HomeMainProps } from "../../containerType";

const HomeMain = ({ posts }: HomeMainProps) => {
  const { recommendPosts, categoryList } = useHomeMain(posts);

  return (
    <>
      <StickyWrapper $type="category">
        <CategoryList
          title="카테고리 별"
          list={categoryList}
          ItemComponent={CategoryCard}
        />
      </StickyWrapper>
      <PostList posts={posts} title="전체 포스팅" />
      <StickyWrapper $type="recommend">
        <PostList posts={recommendPosts} title="추천 포스팅" />
      </StickyWrapper>
    </>
  );
};

export default HomeMain;
