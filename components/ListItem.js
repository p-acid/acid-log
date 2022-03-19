import styled from "styled-components";
import Link from "next/link";

import Date from "./Date";

export const ListItem = ({ post, root }) => {
  const { id, title, description, date, tags, thumbnail } = post;

  return (
    <Link href={`${root}/${id}`}>
      <Wrapper>
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
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.li`
  display: flex;
  gap: 3rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover > img {
    transition: 0.3s;
    transform: translateY(-2px);
    box-shadow: 0 5px 5px #d9d9d9;
  }

  &:hover > div > div > h2 {
    transition: 0.3s;
    color: ${({ theme }) => theme.navy};
  }
`;

const Thumbnail = styled.img`
  padding: 0.7rem 0;
  width: 10rem;
  height: 10rem;
  object-fit: scale-down;
  border-radius: 5px;
`;

const Post = styled.div`
  &:last-child {
    padding-bottom: 0;
  }
`;

const Title = styled.h2`
  display: inline-block;
  margin-bottom: 1.5rem;
  width: 30rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.5rem;
  word-break: keep-all;
`;

const Text = styled.p`
  margin: 0.1rem 0;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.85rem;
  font-weight: 100;
  color: #454545;
`;
