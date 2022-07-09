import styled from "@emotion/styled";

export const StickyWrapper = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
  width: ${({ theme }) => theme.figure * 35}px;
`;
