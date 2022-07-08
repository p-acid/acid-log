import CategoryBanner from "../../../components/Category/CategoryBanner/CategoryBanner";

import { Category, Post } from "../../../interface/CommonTypes";

interface CategoryMainProps {
  filteredPostList: Post[];
  categoryData: Category;
}

const CategoryMain = ({
  filteredPostList,
  categoryData,
}: CategoryMainProps) => {
  return <CategoryBanner {...categoryData} />;
};

export default CategoryMain;
