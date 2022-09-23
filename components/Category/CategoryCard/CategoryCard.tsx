import {
  CategoryCount,
  CategoryInfo,
  CategoryTitle,
  CategoryCardWrapper,
} from "./CatergoryCardStyle";

import useCategoryCard from "./useCategoryCard";

import { Category } from "../../../interface/CommonTypes";

import { URL } from "../../../lib/config/urlConfig";
import Thumbnail from "../../common/Thumbnail/Thumbnail";

const CategoryCard = ({
  tag,
  title,
  thumbnail,
  postIdList,
  infoBackground,
  ...restProps
}: Category) => {
  const { goCategory } = useCategoryCard(tag);

  return (
    <CategoryCardWrapper onClick={goCategory} {...restProps}>
      <Thumbnail src={`${URL.IMAGE.CATEGORY}/${thumbnail}`} alt={thumbnail} />
      <CategoryInfo $infoBackground={infoBackground}>
        <CategoryTitle>{title}</CategoryTitle>
        {postIdList && (
          <CategoryCount>포스팅 {postIdList.length}개</CategoryCount>
        )}
      </CategoryInfo>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
