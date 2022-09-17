import styled from "@emotion/styled";

export const IconButtonWrapper = styled.button<{
  $size: string;
  $color: string;
}>`
  border: none;
  background: none;
  color: ${({ theme, $color }) => theme.colors[`${$color}_90`]};
  cursor: pointer;

  ${({ theme, $size }) => theme.typography[`text_${$size}`]}

  &:hover {
    color: ${({ theme, $color }) => theme.colors[`${$color}_60`]};
  }

  &:active {
    color: ${({ theme, $color }) => theme.colors[`${$color}_70`]};
  }
`;
