import Image from "next/image";

import { ROUTES } from "../../../lib/config/routeConfig";
import { URL } from "../../../lib/config/urlConfig";

import {
  NavigationSubWrapper,
  NavigationWrapper,
  NavigationAnchor,
  NavigationLogo,
} from "./NavigationStyle";

const Navigation = () => {
  return (
    <NavigationWrapper>
      <NavigationLogo href={ROUTES.MAIN}>
        <Image src={`${URL.IMAGE.BASE}/main_logo.png`} width={25} height={25} />
        <span>
          <em>ACID</em>LOG
        </span>
      </NavigationLogo>
      <NavigationSubWrapper>
        <NavigationAnchor href={ROUTES.LOG}>짧은 기록</NavigationAnchor>
        <NavigationAnchor href={ROUTES.ABOUT}>소개</NavigationAnchor>
      </NavigationSubWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
