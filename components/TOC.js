import React from "react";
import styled from "styled-components";

const TableOfContents = ({ tocData }) => {
  console.log(tocData);

  return (
    <></>
    // <List>
    //   {TOCData.map((item) => (
    //     <Item tag={Number(item[0])}>{item[1]}</Item>
    //   ))}
    // </List>
  );
};

export default TableOfContents;

const List = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
`;

const Item = styled.li`
  padding-left: ${({ tag }) => `${tag - 1}rem`};
`;
