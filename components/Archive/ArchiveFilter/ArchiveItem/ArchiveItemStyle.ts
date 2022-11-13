import styled from "@emotion/styled";

export const ArchiveItemWrapper = styled.li<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.figure}px;
  padding: ${({ theme }) => theme.figure / 2}px ${({ theme }) => theme.figure}px;
  border: 1px solid ${({ theme }) => theme.colors.black_20};
  border-radius: ${({ theme }) => theme.figure / 2}px;
  list-style: none;
  transition: 0.3s;
  cursor: pointer;

  ${({ $selected, theme }) =>
    $selected &&
    `
    border-color: ${theme.colors.gray_blue_95};
    background-color: ${theme.colors.gray_blue_95};
  `}
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.black_60};

  ${({ theme }) => theme.typography.text_xs}
`;
