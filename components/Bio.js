import styled from "styled-components";

const Bio = (props) => {
  return (
    <Wrapper>
      <Text>
        Hello, Welcome to <strong>Acid's blog</strong>
        <br />
        Frontend Developer
        <br />
        <Link href="https://twitter.com/Ac_idi_ty">@Twitter</Link>
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

const Link = styled.a``;
