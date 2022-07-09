import styled from "@emotion/styled";

export const MainContent = styled.div<{ path: string }>`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.figure * 10}px;
`;
