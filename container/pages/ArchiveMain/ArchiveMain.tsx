import ReactMarkdown from "react-markdown";
import ArchiveFilter from "../../../components/Archive/ArchiveFilter/ArchiveFilter";
import ArchiveSyntaxStyler from "../../../components/Archive/ArchiveFilter/ArchiveSyntaxStyler/ArchiveSyntaxStyler";
import {
  ArchiveContent,
  ArchiveContentWrapper,
} from "../../../components/Archive/ArchiveStyle";

import { ArchiveMainWrapper } from "./ArchiveMainStyle";

const ArchiveMain = ({ allArchives }) => {
  return (
    <ArchiveMainWrapper>
      <ArchiveFilter />
      <ArchiveContentWrapper>
        {allArchives.map(({ title, contentHtml }) => (
          <ArchiveContent>
            <ReactMarkdown
              children={contentHtml}
              components={ArchiveSyntaxStyler as any}
            />
          </ArchiveContent>
        ))}
      </ArchiveContentWrapper>
    </ArchiveMainWrapper>
  );
};

export default ArchiveMain;
