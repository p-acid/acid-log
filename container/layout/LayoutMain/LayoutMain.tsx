import { FC } from "react";
import { useRouter } from "next/router";

import Navigation from "../Navigation/Navigation";
import Footer from "../../../components/Footer";

import { LayoutMainWrapper } from "./LayoutMainStyle";

import { LayoutMainProps } from "../../containerType";

const LayoutMain: FC<LayoutMainProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <LayoutMainWrapper path={router.pathname}>
        {children}
        <Footer />
      </LayoutMainWrapper>
    </>
  );
};

export default LayoutMain;
