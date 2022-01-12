import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * { 
    box-sizing: border-box;
    color: #303030;
    font-family: Roboto,sans-serif;
  }

  body {
    -ms-overflow-style: none; 
  } 
    
  ::-webkit-scrollbar { 
    display: none;
  }
  
  span, p, ul, li {
    line-height: 1.5rem;
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
