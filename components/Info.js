import styled from "styled-components";

export const Info = ({ info }) => {
  const { title, discription } = info;

  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bold;
`;
