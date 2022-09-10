import styled from "@emotion/styled";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const OptionsWrapper = styled.ul`
  position: absolute;
  top: ${({ theme }) => theme.figure * 5}px;
  border: 1px solid ${({ theme }) => theme.colors.black_20};
  border-radius: ${({ theme }) => theme.figure / 2}px;
  width: max-content;
  min-width: ${({ theme }) => theme.figure * 20}px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.gray_blue_10_30b};
  z-index: 10;
`;

export const OptionsItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black_10};

  &:last-of-type {
    border: none;
  }
`;
