import styled from "@emotion/styled";

export const ArchiveMainWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.figure * 5}px;
  padding: ${({ theme }) => theme.figure * 5}px;
  width: ${({ theme }) => theme.figure * 120}px;
`;
