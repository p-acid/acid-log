import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

import { StyledAnchor } from "./AnchorStyle";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Anchor = ({ href, children, ...restProps }: AnchorProps) => {
  return (
    <Link passHref href={href}>
      <StyledAnchor {...restProps}>{children}</StyledAnchor>
    </Link>
  );
};

export default Anchor;
