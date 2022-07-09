import { useEffect } from "react";
import { ROUTES } from "../../../lib/config/routeConfig";
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
        <em>🌊 애시드.</em>로그
      </NavigationLogo>
      <NavigationSubWrapper>
        <NavigationAnchor href={ROUTES.LOG}>짧은 기록</NavigationAnchor>
        <NavigationAnchor href={ROUTES.ABOUT}>소개</NavigationAnchor>
      </NavigationSubWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
