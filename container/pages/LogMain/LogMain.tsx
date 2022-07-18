import LogItem from "../../../components/Log/LogItem/LogItem";

import {
  LogItemWrapper,
  LogMainDescription,
  LogMainWrapper,
} from "./LogMainStyle";

import { LogMainProps } from "../../containerType";

const LogMain = ({ allLogs }: LogMainProps) => {
  return (
    <LogMainWrapper>
      <LogMainDescription>말 그대로 짧은 기록들을 담습니다</LogMainDescription>
      <LogItemWrapper>
        {allLogs?.map((log) => (
          <LogItem key={log.id} {...log} />
        ))}
      </LogItemWrapper>
    </LogMainWrapper>
  );
};

export default LogMain;
