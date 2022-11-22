import styled from "@emotion/styled";
import Thumbnail from "../../common/Thumbnail/Thumbnail";

import { CategoryInfo } from "../CategoryCard/CatergoryCardStyle";

export const CategoryBannerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.figure * 3}px;
  overflow: hidden;
  max-width: ${({ theme }) => theme.figure * 120}px;
  aspect-ratio: 2 / 1;
`;

export const CategoryBannerSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 2}px;
`;

export const CategoryBannerThumbnail = styled(Thumbnail)`
  text-align: center;
`;

export const CategoryBannerInfo = styled(CategoryInfo)`
  justify-content: space-between;
  padding: ${({ theme }) => theme.figure * 5}px
    ${({ theme }) => theme.figure * 6}px;
  width: 100%;
  border-top-right-radius: ${({ theme }) => theme.figure * 3}px;
  border-bottom-right-radius: ${({ theme }) => theme.figure * 3}px;
`;

export const CategoryBannerTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typography.display_md};
`;

export const CategoryBannerDescription = styled.p`
  color: ${({ theme }) => theme.colors.white_90};
  white-space: pre-wrap;
  word-break: keep-all;

  ${({ theme }) => theme.typography.text_lg};
`;
