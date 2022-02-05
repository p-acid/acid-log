import React from "react";

import { ListItem } from "./ListItem";

const List = ({ list, root }) => {
  return (
    <div>
      {list.map((post) => (
        <ListItem key={post.id} post={post} root={root} />
      ))}
    </div>
  );
};

export default List;
