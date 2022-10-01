import {
  CategoryBannerDescription,
  CategoryBannerInfo,
  CategoryBannerSubWrapper,
  CategoryBannerThumbnail,
  CategoryBannerTitle,
  CategoryBannerWrapper,
} from "./CategoryBannerStyle";
import { CategoryCount } from "../CategoryCard/CatergoryCardStyle";

import { Category } from "../../../interface/CommonTypes";
import { URL } from "../../../lib/config/urlConfig";

type CategoryBannerProps = Category & { postCount: number };

const CategoryBanner = ({
  title,
  thumbnail,
  description,
  infoBackground,
  postCount,
}: CategoryBannerProps) => {
  return (
    <CategoryBannerWrapper>
      <CategoryBannerThumbnail
        src={`${URL.IMAGE.CATEGORY}/${thumbnail}`}
        alt={thumbnail}
        loading="eager"
      />
      <CategoryBannerInfo $infoBackground={infoBackground}>
        <CategoryBannerTitle>{title}</CategoryBannerTitle>
        <CategoryBannerSubWrapper>
          <CategoryBannerDescription>{description}</CategoryBannerDescription>
          <CategoryCount>포스팅 {postCount}개</CategoryCount>
        </CategoryBannerSubWrapper>
      </CategoryBannerInfo>
    </CategoryBannerWrapper>
  );
};

export default CategoryBanner;
