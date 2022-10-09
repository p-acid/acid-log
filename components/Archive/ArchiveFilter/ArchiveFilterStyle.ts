import styled from "@emotion/styled";

export const ArchiveFilterWrapper = styled.section`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 2}px;
  padding: ${({ theme }) => theme.figure * 3}px;
  height: fit-content;
  border-radius: ${({ theme }) => theme.figure * 2}px;
  box-shadow: ${({ theme }) => theme.shadow.gray_blue_10_15b};
`;
