import styled from "@emotion/styled";

export const ButtonWrapper = styled.button`
  display: flex;
  gap: ${({ theme }) => theme.figure / 2}px;
  align-items: center;
  padding: ${({ theme }) => `${theme.figure / 2}px ${theme.figure}px`};
  border: 1px solid ${({ theme }) => theme.colors.black_20};
  border-radius: ${({ theme }) => theme.figure / 2}px;
  background-color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.weight.light};
  cursor: pointer;

  ${({ theme }) => theme.typography.text_sm}

  &:hover {
    background-color: ${({ theme }) => theme.colors.black_10};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.black_5};
  }
`;
