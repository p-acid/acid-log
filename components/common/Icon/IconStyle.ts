import styled from "@emotion/styled";

export const IconWrapper = styled.span<{ $size: number }>`
  font-size: ${({ $size }) => $size}px;
  height: fit-content;
`;
