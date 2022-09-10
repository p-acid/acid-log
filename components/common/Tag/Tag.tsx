import { MouseEvent, useCallback, useMemo } from "react";
import { TagProps } from "../tommonType";
import { TagRemoveButton, TagText, TagWrapper } from "./TagStyle";

const Tag = ({
  children,
  isSelected,
  onSelect,
  onRemove,
  ...restProps
}: TagProps) => {
  const canSelect = useMemo(() => !!onSelect, [onSelect]);
  const canDelete = useMemo(() => !!onRemove, [onRemove]);

  const clickRemove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      onRemove();
    },
    [onRemove]
  );

  return (
    <TagWrapper
      onClick={onSelect}
      $isSelected={isSelected}
      $canSelect={canSelect}
      {...restProps}
    >
      <TagText>{children}</TagText>
      {canDelete && (
        <TagRemoveButton
          className="material-symbols-outlined"
          onClick={clickRemove}
        >
          close
        </TagRemoveButton>
      )}
    </TagWrapper>
  );
};

export default Tag;
