import styled from "@emotion/styled";

export const IconWrapper = styled.span<{ $size: number; $color: string }>`
  height: fit-content;
  font-size: ${({ $size }) => $size}px;
  color: ${({ theme, $color }) => theme.colors[$color]};
`;
