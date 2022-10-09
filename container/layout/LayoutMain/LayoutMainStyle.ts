import styled from "@emotion/styled";

import { ROUTES } from "../../../lib/config/routeConfig";

export const MainContent = styled.div<{ path: string }>`
  ${({ theme, path }) =>
    !path.includes(ROUTES.POSTS) &&
    `
    display: flex;
    justify-content: center;
    gap: ${theme.figure * 8}px;
  `}

  ${({ theme, path }) =>
    path !== ROUTES.MAIN &&
    `
    margin-top: ${theme.figure * 15}px;
  `}
`;
