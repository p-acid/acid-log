import styled from "@emotion/styled";

export const LogMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.figure * 7}px;
  margin-top: ${({ theme }) => theme.figure * 15}px;
  padding: 0 ${({ theme }) => theme.figure * 10}px;
  width: ${({ theme }) => theme.figure * 100}px;
  max-width: ${({ theme }) => theme.figure * 100}px;
`;

export const LogMainDescription = styled.h1`
  margin-bottom: ${({ theme }) => theme.figure / 2}px;
  font-weight: ${({ theme }) => theme.typography.weight.light};
  color: ${({ theme }) => theme.colors.black_70};

  ${({ theme }) => theme.typography.text_xl};
`;

export const LogItemWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 3}px;
  width: 100%;
`;