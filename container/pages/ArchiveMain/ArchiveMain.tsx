import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import ArchiveFilter from "../../../components/Archive/ArchiveFilter/ArchiveFilter";
import ArchiveSyntaxStyler from "../../../components/Archive/ArchiveFilter/ArchiveSyntaxStyler/ArchiveSyntaxStyler";
import {
  ArchiveContent,
  ArchiveContentWrapper,
} from "../../../components/Archive/ArchiveStyle";

import { ArchiveMainWrapper } from "./ArchiveMainStyle";

const ArchiveMain = ({ allArchives, archiveFilters }) => {
  const [selected, setSelected] = useState([]);

  const archives = useMemo(() => {
    if (selected.length > 0) {
      return allArchives.filter(({ id }) => selected.includes(id));
    }

    return allArchives;
  }, [selected]);

  const componentProps = {
    filter: {
      archiveFilters,
      selected,
      setSelected,
    },
  };

  return (
    <ArchiveMainWrapper>
      <ArchiveFilter {...componentProps.filter} />
      <ArchiveContentWrapper>
        {archives.map(({ id, title, contentHtml }) => (
          <ArchiveContent key={id}>
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
