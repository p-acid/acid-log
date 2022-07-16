import LogMain from "../../container/pages/LogMain/LogMain";

import { getAllLogs } from "../../utils/log";

const Log = (props: any) => <LogMain {...props} />;

export default Log;

export async function getStaticProps() {
  const allLogs = await getAllLogs();

  return {
    props: {
      allLogs,
    },
  };
}
