import styled from "@emotion/styled";

import { SlideUp } from "../../../lib/animation";

export const LogMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.figure * 7}px;
  padding: 0 ${({ theme }) => theme.figure * 5}px;
  width: ${({ theme }) => theme.figure * 100}px;
  max-width: ${({ theme }) => theme.figure * 100}px;
  animation: ${SlideUp} 2s;
`;

export const LogMainDescription = styled.h1`
  margin-bottom: ${({ theme }) => theme.figure / 2}px;
  font-weight: ${({ theme }) => theme.typography.weight.light};
  color: ${({ theme }) => theme.colors.black_70};

  ${({ theme }) => theme.typography.text_xl};
`;

export const LogItemWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 5}px;
  width: 100%;

  word-break: keep-all;
`;
