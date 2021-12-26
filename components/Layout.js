import React from "react";
import styled from "styled-components";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Nav title="Acidlog" />
      <Wrapper>
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 4rem 0;
  width: fit-content;
`;
