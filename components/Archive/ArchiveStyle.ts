import styled from "@emotion/styled";

export const ArchiveContentWrapper = styled.article`
  width: 100%;
`;

export const ArchiveContent = styled.li`
  padding: ${({ theme }) => theme.figure * 3}px;
  border-radius: ${({ theme }) => theme.figure * 2}px;
  box-shadow: ${({ theme }) => theme.shadow.gray_blue_10_15b};
  list-style: none;
`;
