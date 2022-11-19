import styled from "@emotion/styled";
import Thumbnail from "../../../components/common/Thumbnail/Thumbnail";

export const PostThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PostThumbnailMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const PostThumbnail = styled(Thumbnail)`
  width: 100%;
  max-height: ${({ theme }) => theme.figure * 80}px;
  object-fit: cover;
`;

export const PostInfoWrapper = styled.div`
  position: absolute;
  bottom: 7%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.figure / 2}px;
  padding: ${({ theme }) => theme.figure * 3}px;
  transform: translateX(-50%);
  width: fit-content;
  z-index: 2;
  word-break: keep-all;
  text-align: center;
`;

export const PostTitle = styled.h1`
  padding-bottom: ${({ theme }) => theme.figure * 3}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  text-align: center;

  ${({ theme }) => theme.typography.display_md}
`;

export const PostDescription = styled.p`
  color: ${({ theme }) => theme.colors.white_90};
  font-weight: ${({ theme }) => theme.typography.weight.regular};

  ${({ theme }) => theme.typography.text_md}
`;

export const PostDate = styled.p`
  color: ${({ theme }) => theme.colors.white_80};
  font-weight: ${({ theme }) => theme.typography.weight.regular};

  ${({ theme }) => theme.typography.text_xs}
`;

export const PostMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.figure * 10}px
    ${({ theme }) => theme.figure * 4}px;
`;

export const PostMainContent = styled.article`
  max-width: ${({ theme }) => theme.figure * 100}px;
  width: 100%;
  word-break: keep-all;
`;
