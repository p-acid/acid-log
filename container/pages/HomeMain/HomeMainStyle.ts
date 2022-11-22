import styled from "@emotion/styled";
import { MAIN_RESPONSIVE } from "../../../lib/config/responsiveConfig";

export const StickyWrapper = styled.aside<{ $type: string }>`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
  width: ${({ theme }) => theme.figure * 35}px;

  @media screen and (max-width: ${MAIN_RESPONSIVE.LG}px) {
    ${({ $type }) => $type === "category" && "display: none;"}
  }

  @media screen and (max-width: ${MAIN_RESPONSIVE.MD}px) {
    display: none;
  }
`;
