import Head from "next/head";
import { useRouter } from "next/router";
import Helmet from "../../components/Helmet/Helmet";
import LogMain from "../../container/pages/LogMain/LogMain";

import { getAllLogs } from "../../utils/log";

import { DOMAIN, URL } from "../../lib/config/urlConfig";

const Log = (props: any) => {
  const { asPath } = useRouter();

  return (
    <>
      <Helmet
        title="Acidlog | Log"
        description="짧은 기록 모음"
        image={`${URL.IMAGE.BASE}/og_image.png`}
        url={asPath ? `${DOMAIN}${asPath}` : DOMAIN}
      />
      <LogMain {...props} />
    </>
  );
};

export default Log;

export async function getStaticProps() {
  const allLogs = await getAllLogs();

  return {
    props: {
      allLogs,
    },
  };
}
