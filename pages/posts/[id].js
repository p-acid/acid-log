import Head from "next/head";

import Layout from "../../components/Layout";
import Date from "../../components/date";
import GlobalStyle from "../../styles/GlobalStyle";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>All Posts | {postData.title}</title>
      </Head>
      <GlobalStyle />
      <Date dateString={postData.date} />
      <Layout>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
