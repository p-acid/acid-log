import styled from "@emotion/styled";

export const LogCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.figure * 2}px;
  width: 100%;
`;

export const LogCategoryList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.figure / 2}px;
  padding: ${({ theme }) => (theme.figure / 4) * 3}px;
`;
