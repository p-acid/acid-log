import { css, Global } from "@emotion/react";

const globalStyle = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        color: #303030;
      }

      body {
        font-family: "Roboto", sans-serif;
        font-size: 1.05rem;
      }

      span,
      p,
      ul,
      li {
        line-height: 2rem;
      }

      input,
      button {
        border: none;
      }
      input:focus,
      input:active,
      button:focus,
      button:active {
        outline: none;
      }
    `}
  />
);

export default globalStyle;
