import styled from "styled-components";

const Bio = (props) => {
  return (
    <Wrapper>
      <Text>
        Hello, Welcome to{" "}
        <strong>
          <Link href="https://acid-log.vercel.app">Acid's blog</Link>
        </strong>
        <br />
        Frontend Developer
        <br />
        <Link href="https://github.com/p-acid" target="_blank">
          @Github
        </Link>{" "}
        <Link href="https://twitter.com/Ac_idi_ty" target="_blank">
          @Twitter
        </Link>
      </Text>
    </Wrapper>
  );
};

export default Bio;

const Wrapper = styled.div`
  padding-top: 2rem;
`;

const Text = styled.span`
  strong {
    font-weight: bold;
  }
`;

const Link = styled.a`
  &:hover {
    color: ${({ theme }) => theme.navy};
    transition: 0.3s;
  }
`;
