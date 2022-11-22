import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

import { navMenu } from "../../../../state/navMenu";
import { NavMenuButton, NavMenuContainer } from "./NavMenuStyle";
import { NAVIGATION } from "../../../../lib/config/blogConfig";

const NavMenu = () => {
  const [{ isOpen }, setNavMenu] = useRecoilState(navMenu);
  const { push } = useRouter();

  const element =
    typeof window !== "undefined" && document.querySelector("#portal");

  const closeNavMenu = useCallback(() => {
    setNavMenu((prev) => ({ ...prev, isOpen: false }));
  }, [setNavMenu]);

  const goPage = useCallback(
    (url: string) => {
      push(url);

      closeNavMenu();
    },
    [closeNavMenu, push]
  );

  return element && isOpen
    ? createPortal(
        <NavMenuContainer>
          {NAVIGATION.MENU_LIST.map(({ url, label }) => (
            <NavMenuButton
              key={`nav-menu-${label}`}
              onClick={() => goPage(url)}
            >
              {label}
            </NavMenuButton>
          ))}
          <NavMenuButton onClick={closeNavMenu}>나가기</NavMenuButton>
        </NavMenuContainer>,
        element
      )
    : null;
};

export default NavMenu;
