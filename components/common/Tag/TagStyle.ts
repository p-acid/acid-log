import styled from "@emotion/styled";
import Button from "../Button/Button";

export const TagWrapper = styled(Button)<{
  $isSelected: boolean;
  $canSelect: boolean;
}>`
  word-break: keep-all;

  ${({ $canSelect, theme }) =>
    !$canSelect &&
    `
      cursor: default;

      &:hover {
        background-color: ${theme.colors.white};
      }

      &:active {
        background-color: ${theme.colors.white};
      }
    `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
      border-color: ${theme.colors.gray_blue_80};
      background-color: ${theme.colors.gray_blue_90};

      &:hover {
        background-color: ${theme.colors.gray_blue_80};
      }

      &:active {
        background-color: ${theme.colors.gray_blue_85};
      }
    `}

  ${({ $canSelect }) =>
    $canSelect &&
    `
      cursor: pointer;
    `}
`;

export const TagText = styled.span`
  color: ${({ theme }) => theme.colors.black_60};
`;

export const TagRemoveButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.figure * 2}px;
  color: ${({ theme }) => theme.colors.black_60};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black_70};
  }

  &:active {
    color: ${({ theme }) => theme.colors.black_80};
  }
`;
