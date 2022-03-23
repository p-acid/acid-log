import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * { 
    box-sizing: border-box;
    color: #303030;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.05rem;
  }
  
  span, p, ul, li {
    line-height: 1.7rem;
  }

  input,
  button{
	border:none;
  }
  input:focus,
  input:active,
  button:focus,
  button:active {
    outline: none;
  }
`;

export default GlobalStyle;
