import { FC, HTMLAttributes } from "react";
import { v4 as uuidv4 } from "uuid";

import { ListWrapper, ListTitle, ListBox } from "../../common/commonStyle";

interface CategoryListProps extends HTMLAttributes<HTMLSelectElement> {
  title: string;
  list: any[];
  ItemComponent: FC<any>;
}

const CategoryList = ({
  title,
  list,
  ItemComponent,
  ...restProps
}: CategoryListProps) => {
  return (
    <ListWrapper {...restProps}>
      <ListTitle>{title}</ListTitle>
      <ListBox style={{ gap: "40px" }}>
        {list.map((itemProps) => (
          <ItemComponent key={uuidv4()} {...itemProps} />
        ))}
      </ListBox>
    </ListWrapper>
  );
};

export default CategoryList;
