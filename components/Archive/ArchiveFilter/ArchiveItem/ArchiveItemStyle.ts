import styled from "@emotion/styled";

export const ArchiveItemWrapper = styled.li<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.figure}px;
  padding: ${({ theme }) => theme.figure}px;
  border: 1px solid ${({ theme }) => theme.colors.black_20};
  border-radius: ${({ theme }) => theme.figure / 2}px;
  list-style: none;

  ${({ $selected, theme }) =>
    $selected &&
    `
    border-color: ${theme.colors.gray_blue_95};
    background-color: ${theme.colors.gray_blue_95};
  `}
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.black_60};
  cursor: pointer;

  ${({ theme }) => theme.typography.text_sm}
`;
