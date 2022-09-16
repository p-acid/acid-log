import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import IconButton from "../../../components/common/Button/IconButton/IconButton";
import { NAVIGATION } from "../../../lib/config/blogConfig";
import { MAIN_RESPONSIVE } from "../../../lib/config/responsiveConfig";

import { ROUTES } from "../../../lib/config/routeConfig";
import { URL } from "../../../lib/config/urlConfig";

import {
  NavigationSubWrapper,
  NavigationWrapper,
  NavigationAnchor,
  NavigationLogo,
} from "./NavigationStyle";

const Navigation = () => {
  const matchDownMd = useMediaQuery({
    query: `(max-width: ${MAIN_RESPONSIVE.MD}px)`,
  });

  return (
    <NavigationWrapper>
      <NavigationLogo href={ROUTES.MAIN}>
        <span>{NAVIGATION.TITLE.TEXT}</span>
        <Image
          src={`${URL.IMAGE.BASE}/${NAVIGATION.TITLE.IMAGE}`}
          width={32}
          height={32}
        />
      </NavigationLogo>
      {!matchDownMd && (
        <NavigationSubWrapper>
          {NAVIGATION.MENU_LIST.map(({ label, url }) => (
            <NavigationAnchor href={url}>{label}</NavigationAnchor>
          ))}
        </NavigationSubWrapper>
      )}
      {matchDownMd && <IconButton size="xl">menu</IconButton>}
    </NavigationWrapper>
  );
};

export default Navigation;
