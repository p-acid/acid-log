import {
  CategoryCount,
  CategoryInfo,
  CategoryTitle,
  CatergoryCardWrapper,
} from "./CatergoryCardStyle";

import useCategoryItem from "./useCategoryItem";

import { Category } from "../../../interface/CommonTypes";

import { URL } from "../../../lib/config/urlConfig";

const CategoryItem = ({
  tag,
  title,
  thumbnail,
  postIdList,
  infoBackground,
}: Category) => {
  const { goCategory } = useCategoryItem(tag);

  return (
    <CatergoryCardWrapper onClick={goCategory}>
      <img src={`${URL.IMAGE.CATEGORY}/${thumbnail}`} alt={thumbnail} />
      <CategoryInfo $infoBackground={infoBackground}>
        <CategoryTitle>{title}</CategoryTitle>
        <CategoryCount>포스팅 {postIdList.length}개</CategoryCount>
      </CategoryInfo>
    </CatergoryCardWrapper>
  );
};

export default CategoryItem;
