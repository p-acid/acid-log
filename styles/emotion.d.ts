import { ThemeType } from "./types";
import "@emotion/react";

declare module "@emotion/react" {
  interface Theme extends ThemeType {}
}
