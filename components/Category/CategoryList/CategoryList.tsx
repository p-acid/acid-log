import { ListWrapper, ListTitle, ListBox } from "../../common/commonStyle";

import { Category } from "../../../interface/CommonTypes";

import CategoryItem from "../CategoryCard/CategoryCard";

interface CategoryListProps {
  categoryList: Category[];
}

const CategoryList = ({ categoryList }: CategoryListProps) => {
  return (
    <ListWrapper>
      <ListTitle>카테고리 별</ListTitle>
      <ListBox style={{ gap: "40px" }}>
        {categoryList.map((category) => (
          <CategoryItem {...category} />
        ))}
      </ListBox>
    </ListWrapper>
  );
};

export default CategoryList;
