import CategoryBanner from "../../../components/Category/CategoryBanner/CategoryBanner";
import CategoryItem from "../../../components/Category/CategoryItem/CategoryItem";
import CategoryList from "../../../components/Category/CategoryList/CategoryList";

import { Category, Post } from "../../../interface/CommonTypes";
import { CategoryMainWrapper } from "./CategoryMainStyle";

interface CategoryMainProps {
  filteredPostList: Post[];
  categoryData: Category;
}

const CategoryMain = ({
  filteredPostList,
  categoryData,
}: CategoryMainProps) => {
  return (
    <CategoryMainWrapper>
      <CategoryBanner {...categoryData} postCount={filteredPostList.length} />
      <CategoryList
        title="포스팅 목록"
        list={filteredPostList}
        ItemComponent={CategoryItem}
        style={{ maxWidth: "100%" }}
      />
    </CategoryMainWrapper>
  );
};

export default CategoryMain;
