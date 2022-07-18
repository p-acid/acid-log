import styled from "@emotion/styled";

import { SlideUp } from "../../../lib/animation";

export const LogItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 2}px;
  animation: ${SlideUp} 2s;
`;

export const LogItemTitle = styled.span`
  color: ${({ theme }) => theme.colors.gray_blue_20};

  ${({ theme }) => theme.typography.display_sm}
`;

export const LogItemDate = styled.span`
  color: ${({ theme }) => theme.colors.black_70};
  font-weight: ${({ theme }) => theme.typography.weight.light};

  ${({ theme }) => theme.typography.text_sm}
`;
