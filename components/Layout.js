import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Nav title="Acidlog" />
      <Wrapper path={router.pathname}>
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5.5rem 1.5rem;
  width: ${({ path }) => (path === "/" || path === "/log") && "fit-content"};
  min-width: ${({ path }) => (path === "/" || path === "/log") && "40rem"};
  max-width: ${({ path }) =>
    (path.includes("posts") || path === "/log/[id]") && "50rem"};
`;
