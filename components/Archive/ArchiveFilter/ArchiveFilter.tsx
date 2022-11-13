import Input from "../../common/Input/Input";
import ArchiveItem from "./ArchiveItem/ArchiveItem";

import {
  ArchiveFilterWrapper,
  FilterList,
  FormWrapper,
} from "./ArchiveFilterStyle";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import Button from "../../common/Button/Button";
import Icon from "../../common/Icon/Icon";

const ArchiveFilter = ({ archiveFilters, selected, setSelected }) => {
  const [keyword, setKeyword] = useState("");

  const inputRef = useRef<HTMLInputElement>();

  const keywordList = useMemo(() => {
    if (keyword) {
      return archiveFilters.filter(
        ({ id, title }) => id.includes(keyword) || title.includes(keyword)
      );
    }

    return archiveFilters;
  }, [keyword]);

  const submitKeyword = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { value: newKeyword } = inputRef.current;

    setKeyword(newKeyword);
  }, []);

  const resetKeyword = useCallback(() => {
    setKeyword("");
    inputRef.current.value = "";
  }, []);

  const handleSelected = useCallback((selectedId: string) => {
    setSelected((prev) => {
      if (prev.includes(selectedId)) {
        const filteredList = prev.filter((id) => id !== selectedId);
        return filteredList;
      }

      return [...prev, selectedId];
    });
  }, []);

  return (
    <ArchiveFilterWrapper>
      <FormWrapper>
        <form onSubmit={submitKeyword}>
          <Input ref={inputRef} iconName="search" />
        </form>
        <Button onClick={resetKeyword}>
          <Icon size={16} color="black_50" iconName="restart_alt" />
        </Button>
      </FormWrapper>
      <FilterList>
        {keywordList.map(({ id, title }) => (
          <ArchiveItem
            key={`archive-filter-${id}`}
            selected={selected.includes(id)}
            onClick={() => handleSelected(id)}
          >
            {title}
          </ArchiveItem>
        ))}
      </FilterList>
    </ArchiveFilterWrapper>
  );
};

export default ArchiveFilter;
