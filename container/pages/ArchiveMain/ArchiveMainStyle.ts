import styled from "@emotion/styled";
import { MAIN_RESPONSIVE } from "~/lib/config/responsiveConfig";

export const ArchiveMainWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.figure * 5}px;
  padding: ${({ theme }) => theme.figure * 5}px;

  @media screen and (max-width: ${MAIN_RESPONSIVE.LG}px) {
    flex-direction: column;
  }

  @media screen and (max-width: ${MAIN_RESPONSIVE.MD}px) {
    width: ${({ theme }) => theme.figure * 60}px;
  }
`;
