import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const NavMenuContainer = styled.main`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure * 4}px;
  padding-right: ${({ theme }) => theme.figure * 10}px;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black_90};
  z-index: 9999;
  animation: ${fadeIn} 0.15s ease-out;
`;

export const NavMenuButton = styled.button`
  padding: 0;
  border: none;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  letter-spacing: -${({ theme }) => theme.figure / 4}px;
  color: ${({ theme }) => theme.colors.white};
  background: none;
  cursor: pointer;
  animation: ${slideFromLeft} 0.5s ease-out;
  transition: 0.2s;

  ${({ theme }) => theme.typography.display_md}

  &:hover {
    transform: translateX(4px);
    color: ${({ theme }) => theme.colors.white_60};
  }

  &:active {
    color: ${({ theme }) => theme.colors.white_70};
  }
`;
