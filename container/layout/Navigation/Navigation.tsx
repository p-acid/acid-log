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
        <span>
          <em>애시드.</em>로그
        </span>
        <Image src={`${URL.IMAGE.BASE}/main_logo.png`} width={32} height={32} />
      </NavigationLogo>
      <NavigationSubWrapper>
        <NavigationAnchor href={ROUTES.LOG}>짧은 기록</NavigationAnchor>
        <NavigationAnchor href={ROUTES.ABOUT}>소개</NavigationAnchor>
      </NavigationSubWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
