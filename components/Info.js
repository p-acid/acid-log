import styled from "styled-components";

export const Info = ({ info }) => {
  const { title, discription } = info;

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Discription>{discription}</Discription>
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: bold;
`;

const Discription = styled.p`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-left: 5px solid ${({ theme }) => theme.navy};
  background-color: #fcfcfc;
  color: ${({ theme }) => theme.lightgray};

  strong {
    font-weight: bold;
    color: ${({ theme }) => theme.navy};
  }
`;
