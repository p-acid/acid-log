import styled from "@emotion/styled";

export const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 0 ${({ theme }) => theme.figure}px;
  width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const NavigationSubWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.figure}px;
`;
