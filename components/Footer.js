import React from "react";
import styled from "styled-components";

const Footer = (props) => {
  return (
    <Wrapper>
      Built with <Link href="https://www.gatsbyjs.com">Next.js</Link> +{" "}
      <Link href="https://www.netlify.com">Netlify</Link>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer``;

const Link = styled.a`
  transition: 0.5s;

  &:hover {
    color: #375687;
  }
`;
