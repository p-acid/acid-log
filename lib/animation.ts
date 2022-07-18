import { keyframes } from "@emotion/react";

export const SlideUp = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  } to {
    transform: translateY(0px);
    opacity: 1;
  }
`;
