import styled from "@emotion/styled";

export const ListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
  padding: ${({ theme }) => theme.figure * 20}px 0;
  max-width: ${({ theme }) => theme.figure * 50}px;
`;

export const ListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black_60};
  font-weight: 400;

  ${({ theme }) => theme.typography.text_md}
`;

export const ListBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
`;
