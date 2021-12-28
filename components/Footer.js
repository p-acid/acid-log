import React from "react";
import styled from "styled-components";

const Footer = (props) => {
  return (
    <Wrapper>
      Built with <Link href="https://nextjs.org/">Next.js</Link> +{" "}
      <Link href="https://vercel.com/">Vercel</Link>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  padding-top: 3rem;
`;

const Link = styled.a`
  transition: 0.5s;

  &:hover {
    color: #375687;
  }
`;
