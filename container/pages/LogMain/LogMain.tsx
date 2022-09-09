import LogItem from "../../../components/Log/LogItem/LogItem";

import {
  LogItemWrapper,
  LogMainDescription,
  LogMainWrapper,
} from "./LogMainStyle";

import { LogMainProps } from "../../containerType";
import LogCategory from "../../../components/Log/LogCategory/LogCategory";
import useLogMain from "./useLogMain";

const LogMain = ({ allLogs }: LogMainProps) => {
  const { category } = useLogMain({ allLogs });

  return (
    <LogMainWrapper>
      <LogMainDescription>말 그대로 짧은 기록들을 담습니다</LogMainDescription>
      <LogCategory />
      <LogItemWrapper>
        {allLogs?.map((log) => (
          <LogItem key={log.id} {...log} />
        ))}
      </LogItemWrapper>
    </LogMainWrapper>
  );
};

export default LogMain;
