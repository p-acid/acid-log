import styled from "@emotion/styled";

export const StyledAnchor = styled.a`
  padding: ${({ theme }) => (theme.figure / 2) * 3}px
    ${({ theme }) => (theme.figure / 2) * 3}px;

  ${({ theme }) => theme.typography.text_md};
`;
