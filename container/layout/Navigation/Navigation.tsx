import Image from "next/image";
import { NAVIGATION } from "../../../lib/config/blogConfig";

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
        {NAVIGATION.TITLE.TEXT}
        <Image
          src={`${URL.IMAGE.BASE}/${NAVIGATION.TITLE.IMAGE}`}
          width={32}
          height={32}
        />
      </NavigationLogo>
      <NavigationSubWrapper>
        <NavigationAnchor href={ROUTES.LOG}>{NAVIGATION.LOG}</NavigationAnchor>
        <NavigationAnchor href={ROUTES.ABOUT}>
          {NAVIGATION.ABOUT}
        </NavigationAnchor>
      </NavigationSubWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
