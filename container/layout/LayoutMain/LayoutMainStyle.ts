import styled from "@emotion/styled";

import { ROUTES } from "../../../lib/config/routeConfig";

const NOT_MARGIN_ROUTES = [ROUTES.MAIN, ROUTES.ARCHIVE];

export const MainContent = styled.div<{ path: string }>`
  margin-top: ${({ theme }) => theme.figure * 10}px;

  ${({ theme, path }) =>
    !path.includes(ROUTES.POSTS) &&
    `
    display: flex;
    justify-content: center;
    gap: ${theme.figure * 8}px;
  `}

  ${({ path }) =>
    NOT_MARGIN_ROUTES.includes(path) &&
    `
      margin: 0;
  `}
`;
