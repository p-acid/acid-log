import ReactMarkdown from "react-markdown";

import { Log } from "../../../interface/CommonTypes";

import { getEachDate } from "../../../utils/date";
import { LogSyntaxStyler } from "../LogSyntaxStyler/LogSyntaxStyler";

import { LogItemWrapper, LogItemTitle, LogItemDate } from "./LogItemStyle";

const LogItem = ({ id, title, date, contentHtml }: Log) => {
  const [year, month, day] = getEachDate(new Date(date));

  return (
    <LogItemWrapper>
      <LogItemTitle>{title}</LogItemTitle>
      <div>
        <ReactMarkdown
          children={contentHtml}
          components={LogSyntaxStyler as any}
        />
      </div>
      <LogItemDate>{`${year}년 ${month}월 ${day}일`}</LogItemDate>
    </LogItemWrapper>
  );
};

export default LogItem;
