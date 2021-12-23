import React from "react";
import Link from "next/link";

const firstPost = (props) => {
  return (
    <>
      <div>First Post</div>
      <Link href="/">Go to Main</Link>
    </>
  );
};

export default firstPost;
