import styled from "@emotion/styled";

export const PostListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
  padding-top: ${({ theme }) => theme.figure * 20}px;
  max-width: ${({ theme }) => theme.figure * 40}px;
`;

export const PostListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black_60};
  font-weight: 400;

  ${({ theme }) => theme.typography.text_md}
`;

export const PostListBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
`;
