import styled from "styled-components";

import Layout from "./Layout";
import Date from "./Date";

export default function Post({ postData }) {
  const { title, date, contentHtml } = postData;

  return (
    <>
      <Layout>
        <Header>
          {title}
          <Date dateString={date} />
        </Header>
        <Contents dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </Layout>
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
`;

const Contents = styled.div`
  h1 {
    padding-top: 3rem;
    font-size: 1.8rem;
    font-weight: bold;
  }

  h2 {
    padding-top: 2rem;
    font-size: 1.4rem;
    font-weight: bold;
  }

  h3 {
    padding-top: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    padding-bottom: 1rem;
  }

  & > ul {
    padding-bottom: 1rem;
    list-style: inside;

    ul {
      padding-left: 1rem;
      list-style: inside;
    }
  }

  strong {
    font-weight: bold;
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
    margin: 1rem 0;
    border-left: 0.2rem solid black;
    background-color: ${({ theme }) => theme.lightgrey};

    p {
      padding: 0.8rem 1.2rem 0.7rem;

      strong {
        color: #545454;
      }
    }
  }

  code {
    padding: 0.1rem 0.3rem 0.2rem;
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
