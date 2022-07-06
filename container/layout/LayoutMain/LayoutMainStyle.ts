import styled from "@emotion/styled";

export const LayoutMainWrapper = styled.div<{ path: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.figure * 20}px;
`;
