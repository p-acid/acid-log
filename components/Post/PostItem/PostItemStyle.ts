import styled from "@emotion/styled";

export const PostItemWrapper = styled.li`
  display: flex;
  padding-bottom: ${({ theme }) => theme.figure * 2}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black_20};

  &:last-of-type {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const PostThumbnail = styled.img`
  max-width: ${({ theme }) => theme.figure * 12}px;
  border-radius: ${({ theme }) => theme.figure}px;
  aspect-ratio: 1/1;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure / 2}px;
  padding: ${({ theme }) => theme.figure / 2}px
    ${({ theme }) => theme.figure * 2}px;
`;

export const PostTitle = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;

  ${({ theme }) => theme.typography.text_xl}
`;

export const PostDescription = styled.p`
  color: ${({ theme }) => theme.colors.black_60};
  font-weight: 400;

  ${({ theme }) => theme.typography.text_sm}
`;
