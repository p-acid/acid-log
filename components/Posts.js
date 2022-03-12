import styled from "styled-components";

import Date from "./Date";
import Tags from "./Tags";
import Bio from "./Bio";

export default function Post({ postData }) {
  const { id, title, date, contentHtml, tags, thumbnail } = postData;

  return (
    <>
      <Header>
        {title}
        <Date dateString={date} />
        <Tags tags={tags} />
      </Header>
      <Thumbnail
        src={`/images/posts/${id}/${thumbnail}`}
        alt={`${thumbnail}`}
      />
      <Contents dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <Bio />
    </>
  );
}

const Header = styled.header`
  padding-bottom: 1.5rem;
  font-size: 2.2rem;
  font-weight: bold;

  time {
    padding-top: 0.4rem;
    font-size: 60%;
    font-weight: 400;
  }

  div {
    padding-top: 0.2rem;

    span {
      font-size: 0.9rem;
      font-weight: 100;
    }
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  max-height: 30rem;
  object-fit: contain;
  margin: 2rem 0;
`;

const Contents = styled.div`
  h1 {
    padding: 3rem 0 0;
    font-size: 2rem;
    font-weight: bold;
  }

  h2 {
    padding: 2rem 0 0;
    font-size: 1.6rem;
    font-weight: bold;
  }

  h3 {
    padding: 2rem 0 0;
    font-size: 1.4rem;
    font-weight: bold;
  }

  h4 {
    padding: 2rem 0 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  hr {
    margin: 1.3rem 0;
  }

  p {
    padding-bottom: 1rem;
    word-break: keep-all;
  }

  & > ul {
    padding: 0.3rem 0 1rem;
    list-style: inside;

    & li::marker {
      font-size: 1.2rem;
    }

    ul {
      padding-left: 1rem;
      list-style: inside;
    }

    li {
      padding-bottom: 0.35rem;

      &::marker {
        content: "📁 ";
      }

      ul {
        padding-top: 0.5rem;

        & li::marker {
          content: "📑 ";
        }

        ul li::marker {
          content: "📄 ";
        }
      }
    }
  }

  a {
    font-weight: bold;
    text-decoration: none;
    color: ${({ theme }) => theme.navy};

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    font-weight: bold;

    code {
      padding: 0.1rem 0.4rem 0.3rem;
    }
  }

  em {
    font-style: italic;
  }

  pre {
    display: grid;
    padding: 0.8rem 0px 1.1rem;

    code {
      padding: 0.8rem 0.9rem 0.9rem;
      line-height: 1rem;
      background-color: ${({ theme }) => theme.darkgrey};
      overflow: scroll;
    }
  }

  blockquote {
    padding: 0.8rem 1.2rem;
    margin: 1rem 0;
    border-left: 0.2rem solid black;
    background-color: ${({ theme }) => theme.lightgrey};

    p:last-child {
      padding: 0;
    }

    strong {
      color: #545454;
    }
  }

  code {
    padding: 0.05rem 0.3rem 0.3rem;
    border-radius: 0.2rem;
    font-family: monospace;
    color: white;
    background-color: ${({ theme }) => theme.navy};
    opacity: 0.95;
  }

  img {
    width: 100%;
  }
`;
