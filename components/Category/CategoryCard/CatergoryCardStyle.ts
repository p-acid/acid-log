import styled from "@emotion/styled";

export const CategoryCardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.figure * 4}px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 8px ${({ theme }) => theme.colors.black_10};
  }
`;

export const CategoryThumbnail = styled.img`
  aspect-ratio: 2 / 1;
`;

export const CategoryInfo = styled.div<{ $infoBackground: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure}px;
  padding: ${({ theme }) => theme.figure * 2}px
    ${({ theme }) => theme.figure * 3}px ${({ theme }) => theme.figure * 3}px;
  background-color: ${({ theme, $infoBackground }) =>
    theme.colors[`${$infoBackground}_90`]};
`;

export const CategoryTitle = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typography.text_xl}
`;

export const CategoryCount = styled.p`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.white_70};

  ${({ theme }) => theme.typography.text_sm}
`;
