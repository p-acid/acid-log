import styled from "@emotion/styled";

export const NothingFoundMainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
  height: 100vh;
`;

export const NothingFoundDescription = styled.p`
  color: ${({ theme }) => theme.colors.black_70};

  ${({ theme }) => theme.typography.display_md}
`;
