import styled from "@emotion/styled";
import { MAIN_RESPONSIVE } from "~/lib/config/responsiveConfig";

export const ArchiveFilterWrapper = styled.section`
  position: sticky;
  top: ${({ theme }) => theme.figure * 14}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 2}px;
  padding: ${({ theme }) => theme.figure * 3}px;
  height: fit-content;
  border-radius: ${({ theme }) => theme.figure * 2}px;
  box-shadow: ${({ theme }) => theme.shadow.gray_blue_10_15b};

  @media screen and (max-width: ${MAIN_RESPONSIVE.LG}px) {
    position: static;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.figure / 2}px;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
`;

export const FilterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 2}px;
`;
