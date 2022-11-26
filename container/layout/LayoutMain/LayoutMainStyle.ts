import styled from "@emotion/styled";

import { ROUTES } from "../../../lib/config/routeConfig";

const MARGIN_ROUTES = [ROUTES.CATEGORY, ROUTES.LOG];

export const MainContent = styled.div<{ path: string }>`
  ${({ theme, path }) =>
    !path.includes(ROUTES.POSTS) &&
    `
    display: flex;
    justify-content: center;
    gap: ${theme.figure * 8}px;
  `}

  ${({ theme, path }) =>
    MARGIN_ROUTES.find((route) => path.includes(route)) &&
    `
      margin-top: ${theme.figure * 10}px;
  `}
`;
