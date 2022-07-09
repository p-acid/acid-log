import styled from "@emotion/styled";

import Anchor from "../../../common/Link/Anchor";

export const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  padding: ${({ theme }) => theme.figure / 2}px
    ${({ theme }) => theme.figure * 2}px;
  width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const NavigationSubWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.figure}px;
`;

export const NavigationLogo = styled(Anchor)`
  em {
    font-weight: 900;
    color: ${({ theme }) => theme.colors.gray_blue_50};
    font-style: normal;
  }

  ${({ theme }) => theme.typography.display_sm}
`;

export const NavigationAnchor = styled(Anchor)`
  ${({ theme }) => theme.typography.text_xl}
`;
