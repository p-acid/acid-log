import LogItem from "../../../components/Log/LogItem/LogItem";

import {
  LogItemWrapper,
  LogMainDescription,
  LogMainWrapper,
} from "./LogMainStyle";

import { LogMainProps } from "../../containerType";

const LogMain = ({ allLogs }: LogMainProps) => {
  console.log(allLogs);

  return (
    <LogMainWrapper>
      <LogMainDescription>말 그대로 짧은 기록들을 담습니다</LogMainDescription>
      <LogItemWrapper>
        {allLogs?.map((log) => (
          <LogItem {...log} />
        ))}
      </LogItemWrapper>
    </LogMainWrapper>
  );
};

export default LogMain;
