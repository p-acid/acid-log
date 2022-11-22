import Head from "next/head";

interface HelmetProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const Helmet = ({ title, description, image, url }: HelmetProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.png" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default Helmet;
