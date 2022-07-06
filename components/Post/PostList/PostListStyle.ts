import styled from "@emotion/styled";

export const PostListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
  max-width: ${({ theme }) => theme.figure * 40}px;
`;

export const PostListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;

  ${({ theme }) => theme.typography.display_xs}
`;

export const PostListBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
`;
