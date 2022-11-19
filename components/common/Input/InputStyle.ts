import styled from "@emotion/styled";

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.figure}px;
  padding: ${({ theme }) => `${theme.figure / 2}px ${theme.figure}px`};
  border: 1px solid ${({ theme }) => theme.colors.black_20};
  border-radius: ${({ theme }) => theme.figure / 2}px;
  background-color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.weight.light};

  :focus-within {
    outline: 3px solid ${({ theme }) => theme.colors.black_5};
  }
`;

export const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.black_60};

  ${({ theme }) => theme.typography.text_sm}
`;
