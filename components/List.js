import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Date from "./Date";

const List = ({ list, root }) => {
  return (
    <Wrapper>
      {list.map((post) => {
        const { id, title, description, date, tags, thumbnail } = post;
        return (
          <Link href={`${root}/${id}`}>
            <SubWrapper>
              <Thumbnail
                src={`/images/posts/${id}/${thumbnail}`}
                alt={`${thumbnail}`}
              />
              <div>
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
              </div>
            </SubWrapper>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.ul``;

const SubWrapper = styled.li`
  display: flex;
  gap: 3rem;
  margin-bottom: 5rem;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  max-width: 12rem;
  object-fit: cover;
`;

const Post = styled.div`
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

const Text = styled.p`
  margin: 0.1rem 0;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.8rem;
`;
