import CategoryBanner from "../../../components/Category/CategoryBanner/CategoryBanner";

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
    </CategoryMainWrapper>
  );
};

export default CategoryMain;
