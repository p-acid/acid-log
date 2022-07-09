import { FC } from "react";
import { useRouter } from "next/router";

import Navigation from "../Navigation/Navigation";

import { MainContent } from "./LayoutMainStyle";

import { LayoutMainProps } from "../../containerType";

const LayoutMain: FC<LayoutMainProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <MainContent path={router.pathname}>{children}</MainContent>
    </>
  );
};

export default LayoutMain;
