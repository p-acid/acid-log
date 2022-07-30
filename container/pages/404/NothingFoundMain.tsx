import Image from "next/image";

import { URL } from "../../../lib/config/urlConfig";
import {
  NothingFoundDescription,
  NothingFoundMainWrapper,
} from "./NothingFoundMainStyle.";

const NothingFoundMain = () => {
  return (
    <NothingFoundMainWrapper>
      <Image src={`${URL.IMAGE.BASE}/404.png`} width={400} height={400} />
      <NothingFoundDescription>
        페이지를 찾을 수 없습니다
      </NothingFoundDescription>
    </NothingFoundMainWrapper>
  );
};

export default NothingFoundMain;
