import { useRouter } from "next/router";
import Helmet from "../../components/Helmet/Helmet";
import ArchiveMain from "../../container/pages/ArchiveMain/ArchiveMain";
import { DOMAIN, URL } from "../../lib/config/urlConfig";
import { getAllArchives } from "../../utils/archive";

const Archive = ({ allArchives }) => {
  const { asPath } = useRouter();

  return (
    <>
      <Helmet
        title="Acidlog | Archive"
        description="아카이브"
        image={`${URL.IMAGE.BASE}/og_image.png`}
        url={asPath ? `${DOMAIN}${asPath}` : DOMAIN}
      />
      <ArchiveMain allArchives={allArchives} />
    </>
  );
};

export default Archive;

export async function getStaticProps() {
  const allArchives = await getAllArchives();

  return {
    props: {
      allArchives,
    },
  };
}
