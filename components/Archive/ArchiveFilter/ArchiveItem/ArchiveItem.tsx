import Icon from "../../../common/Icon/Icon";
import { ArchiveItemWrapper, Title } from "./ArchiveItemStyle";

interface ArchiveItemProps {
  selected?: boolean;
  category?: string;
}

const ArchiveItem = ({ category, selected }: ArchiveItemProps) => {
  return (
    <ArchiveItemWrapper $selected={selected}>
      <Icon size={16} color="black_50" iconName={category ?? "description"} />
      <Title>이게 이게 이게</Title>
    </ArchiveItemWrapper>
  );
};

export default ArchiveItem;
