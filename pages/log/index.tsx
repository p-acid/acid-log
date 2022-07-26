import Head from "next/head";
import LogMain from "../../container/pages/LogMain/LogMain";

import { getAllLogs } from "../../utils/log";

const Log = (props: any) => (
  <>
    <Head>
      <title>Acidlog | Log</title>
      <link rel="icon" href="/favicon.png" />
      <meta property="og:title" content="Acidlog | Log" />
      <meta property="og:description" content="짧은 기록 모음" />
      <meta property="og:image" content="/images/og_image.png" />
    </Head>
    <LogMain {...props} />
  </>
);

export default Log;

export async function getStaticProps() {
  const allLogs = await getAllLogs();

  return {
    props: {
      allLogs,
    },
  };
}
