import styled from "@emotion/styled";

export const OptionCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme.figure / 2) * 3}px;
  padding: ${({ theme }) => theme.figure * 2}px;
  color: ${({ theme }) => theme.colors.black_60};
`;

export const OptionCategoryTitle = styled.p`
  font-weight: ${({ theme }) => theme.typography.weight.regular};

  ${({ theme }) => theme.typography.text_md}
`;

export const OptionCategoryList = styled.ul`
  li {
    padding: ${({ theme }) => theme.figure / 2}px 0;

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

export const OptionCategoryItem = styled.li`
  padding: ${({ theme }) => theme.figure * 2}px;
  list-style: none;
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.figure}px;
  font-weight: ${({ theme }) => theme.typography.weight.light};
  cursor: pointer;

  ${({ theme }) => theme.typography.text_sm}
`;

export const OptionValue = styled.input`
  accent-color: ${({ theme }) => theme.colors.gray_blue_50};
`;
