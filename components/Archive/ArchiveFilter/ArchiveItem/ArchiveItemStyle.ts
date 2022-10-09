import styled from "@emotion/styled";

export const ArchiveItemWrapper = styled.li<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.figure}px;
  padding: ${({ theme }) => theme.figure}px;
  border-radius: ${({ theme }) => theme.figure}px;
  list-style: none;

  ${({ $selected, theme }) =>
    $selected &&
    `
    background-color: ${theme.colors.gray_blue_95};
  `}
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.black_60};
  cursor: pointer;

  ${({ theme }) => theme.typography.text_sm}
`;
