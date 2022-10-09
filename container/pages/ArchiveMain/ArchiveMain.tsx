import ArchiveContent from "../../../components/Archive/ArchiveContent/ArchiveContent";
import ArchiveFilter from "../../../components/Archive/ArchiveFilter/ArchiveFilter";
import { ArchiveMainWrapper } from "./ArchiveMainStyle";

const ArchiveMain = () => {
  return (
    <ArchiveMainWrapper>
      <ArchiveFilter />
      <ArchiveContent />
    </ArchiveMainWrapper>
  );
};

export default ArchiveMain;
