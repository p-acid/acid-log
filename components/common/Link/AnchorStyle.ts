import styled from "@emotion/styled";

export const StyledAnchor = styled.a`
  padding: ${({ theme }) => (theme.figure / 2) * 3}px
    ${({ theme }) => (theme.figure / 2) * 3}px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black_70};

  ${({ theme }) => theme.typography.text_md};
`;
