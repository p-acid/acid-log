import Input from "../../common/Input/Input";
import ArchiveItem from "./ArchiveItem/ArchiveItem";

import { ArchiveFilterWrapper } from "./ArchiveFilterStyle";

const ArchiveFilter = () => {
  return (
    <ArchiveFilterWrapper>
      <Input iconName="search" />
      <ArchiveItem selected={true} />
    </ArchiveFilterWrapper>
  );
};

export default ArchiveFilter;
