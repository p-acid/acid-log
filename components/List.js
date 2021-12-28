import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Date from "./Date";

const List = ({ list, root }) => {
  return (
    <Wrapper>
      {list.map((post) => {
        const { id, title, description, date, tags } = post;
        return (
          <Link href={`${root}/${id}`}>
            <Post>
              <Title date>{title}</Title>
              <Date dateString={date} />
              <Text>{description}</Text>
              <TagWrapper>
                {tags.map((tag) => (
                  <Tag>{`#${tag}`}</Tag>
                ))}
              </TagWrapper>
            </Post>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.ul``;

const Post = styled.li`
  margin-bottom: 3rem;
  cursor: pointer;

  &:hover > h2 {
    transition: 0.3s;
    background: linear-gradient(to bottom, white 45%, #5482cc 30%);
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Title = styled.h2`
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
`;

const Text = styled.p``;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span``;
