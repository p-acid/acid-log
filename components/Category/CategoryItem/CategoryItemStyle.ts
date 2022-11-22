import styled from "@emotion/styled";
import Thumbnail from "../../common/Thumbnail/Thumbnail";

export const CategoryItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover > img {
    transform: translateY(-3px);
    box-shadow: 0 10px 8px ${({ theme }) => theme.colors.black_10};
  }
`;

export const CategoryItemThumbnail = styled(Thumbnail)`
  max-width: ${({ theme }) => theme.figure * 20}px;
  border-radius: ${({ theme }) => theme.figure * 2}px;
`;

export const CategoryItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure}px;
  padding: ${({ theme }) => theme.figure * 2}px 0;
  font-weight: 300;
`;

export const CategoryInfoTitle = styled.p`
  color: ${({ theme }) => theme.colors.black_70};

  ${({ theme }) => theme.typography.text_xl}
`;

export const CategoryInfoDescription = styled.p`
  color: ${({ theme }) => theme.colors.black_60};

  ${({ theme }) => theme.typography.text_lg}
`;

export const CategoryInfoDate = styled.p`
  color: ${({ theme }) => theme.colors.black_40};

  ${({ theme }) => theme.typography.text_sm}
`;
