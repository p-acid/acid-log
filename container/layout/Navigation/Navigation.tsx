import Link from "next/link";

import Anchor from "../../../components/common/Link/Anchor";

import { ROUTES } from "../../../lib/config/routeConfig";
import { NavigationSubWrapper, NavigationWrapper } from "./NavigationStyle";

const Navigation = () => (
  <NavigationWrapper>
    <Anchor href={ROUTES.MAIN}>Acidlog</Anchor>
    <NavigationSubWrapper>
      <Anchor href={ROUTES.LOG}>Log</Anchor>
      <Anchor href={ROUTES.ABOUT}>About</Anchor>
    </NavigationSubWrapper>
  </NavigationWrapper>
);

export default Navigation;
