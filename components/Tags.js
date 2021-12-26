import React from "react";
import styled from "styled-components";

const Tags = ({ tags }) => {
  return (
    <Wrapper>
      {tags?.map((tag) => (
        <Tag>#{tag}</Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  color: black;
`;
