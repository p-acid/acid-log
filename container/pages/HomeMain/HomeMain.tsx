import { Post } from "../../../interface/CommonTypes";

import { StickyWrapper } from "./HomeMainStyle";

import PostList from "../../../components/Post/PostList/PostList";
import useHomeMain from "./useHomeMain";
import CategoryList from "../../../components/Category/CategoryList/CategoryList";
import CategoryCard from "../../../components/Category/CategoryCard/CategoryCard";

import { HomeMainProps } from "../../containerType";
import { HOME } from "../../../lib/config/blogConfig";

const HomeMain = ({ posts }: HomeMainProps) => {
  const { recommendPosts, categoryList } = useHomeMain(posts);

  return (
    <>
      <StickyWrapper $type="category">
        <CategoryList
          title={HOME.CATEGORY}
          list={categoryList}
          ItemComponent={CategoryCard}
        />
      </StickyWrapper>
      <PostList posts={posts} title={HOME.ALL_POST} />
      <StickyWrapper $type="recommend">
        <PostList posts={recommendPosts} title={HOME.RECOMMEND_POST} />
      </StickyWrapper>
    </>
  );
};

export default HomeMain;
