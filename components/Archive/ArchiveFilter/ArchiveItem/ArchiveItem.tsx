import { ReactNode } from "react";
import Icon from "../../../common/Icon/Icon";
import { ArchiveItemWrapper, Title } from "./ArchiveItemStyle";

interface ArchiveItemProps {
  children: ReactNode;
  selected?: boolean;
  category?: string;
  onClick: () => void;
}

const ArchiveItem = ({
  children,
  category,
  selected,
  onClick,
}: ArchiveItemProps) => {
  return (
    <ArchiveItemWrapper $selected={selected} onClick={onClick}>
      <Icon size={16} color="black_50" iconName={category ?? "description"} />
      <Title>{children}</Title>
    </ArchiveItemWrapper>
  );
};

export default ArchiveItem;
