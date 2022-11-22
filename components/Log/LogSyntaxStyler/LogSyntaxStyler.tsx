import styled from "@emotion/styled";

export const LogSyntaxStyler = {
  p: ({ children, className, props }) => (
    <Paragraph className={className} {...props}>
      {children}
    </Paragraph>
  ),
};

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.figure}px;
  color: ${({ theme }) => theme.colors.black_80};
  font-weight: ${({ theme }) => theme.typography.weight.light};
  word-break: keep-all;

  ${({ theme }) => theme.typography.text_md}

  &:first-of-type {
    text-indent: ${({ theme }) => theme.figure}px;
  }

  &:last-of-type {
    margin: 0;
  }
`;
