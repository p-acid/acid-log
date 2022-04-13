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
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: -2.7px;
  word-spacing: -2px;
  word-break: keep-all;

  time {
    padding-top: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -1px;
  }

  div {
    padding-top: 0.3rem;

    span {
      font-size: 0.9rem;
      font-weight: 100;
      letter-spacing: 0;
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
    font-size: 2.4rem;
    font-weight: bold;

    code {
      font-size: inherit;
    }
  }

  h2 {
    padding: 2rem 0 0;
    font-size: 2rem;
    font-weight: bold;

    code {
      font-size: inherit;
    }
  }

  h3 {
    padding: 2rem 0 0;
    font-size: 1.8rem;
    font-weight: bold;

    code {
      font-size: inherit;
    }
  }

  h4 {
    padding: 2rem 0 0;
    font-size: 1.6rem;
    font-weight: bold;
  }

  hr {
    margin: 1.3rem 0;
  }

  p {
    word-break: keep-all;

    & + p {
      padding-top: 1.5rem;
    }
  }

  & > ul {
    padding: 1rem 0;
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
      font-weight: 600;
    }
  }

  pre {
    display: grid;
    margin: 1rem 0;

    code {
      padding: 1.6rem 1.7rem 1.6rem;
      line-height: 1.4rem;
      border-radius: 0.8rem;
      font-size: 0.8rem;
      background-color: ${({ theme }) => theme.darkgrey};
      overflow: scroll;
    }
  }

  blockquote {
    padding: 0.5rem 1.2rem;
    margin: 1.5rem 0 1.5rem 1rem;
    border-left: 0.2rem solid #525252;

    * {
      color: #545454;
    }

    p:last-child {
      padding: 0;
    }
  }

  code {
    padding: 0.2rem 0.3rem;
    border-radius: 0.3rem;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.7rem;
    font-weight: 100;
    color: white;
    background-color: ${({ theme }) => theme.navy};
    opacity: 0.95;
  }

  img {
    margin: 0.5rem 0 0;
    width: 100%;
  }

  em {
    background-color: #dce6f7;
  }
`;
