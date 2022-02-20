import Link from "next/link";
import styled from "styled-components";

const Nav = ({ title }) => {
  return (
    <Wrapper>
      <Link href="/">
        <NavItem>{title}</NavItem>
      </Link>
      <SubWrapper>
        <Link href="/log">
          <NavItem>log</NavItem>
        </Link>
        <Link href="/about">
          <NavItem>about</NavItem>
        </Link>
      </SubWrapper>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 0.8rem 1.4rem;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.92);
`;

const SubWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled.span`
  font-size: 1.4rem;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    color: #375687;
  }
`;
