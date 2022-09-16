import styled from "@emotion/styled";

export const IconButtonWrapper = styled.button<{ $size: string }>`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.black_90};
  cursor: pointer;

  ${({ theme, $size }) => theme.typography[`text_${$size}`]}

  &:hover {
    color: ${({ theme }) => theme.colors.black_60};
  }

  &:active {
    color: ${({ theme }) => theme.colors.black_70};
  }
`;
