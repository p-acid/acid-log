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
        <em>π μ μλ.</em>λ‘κ·Έ
      </NavigationLogo>
      <NavigationSubWrapper>
        <NavigationAnchor href={ROUTES.LOG}>μ§§μ κΈ°λ‘</NavigationAnchor>
        <NavigationAnchor href={ROUTES.ABOUT}>μκ°</NavigationAnchor>
      </NavigationSubWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
