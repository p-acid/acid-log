import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { ATOM_KEY } from "../lib/config/atomConfig";

export const navMenu = atom({
  key: `${ATOM_KEY.NAV_MENU_STATE}${uuidv4()}`,
  default: {
    isOpen: false,
    props: null,
  },
});
