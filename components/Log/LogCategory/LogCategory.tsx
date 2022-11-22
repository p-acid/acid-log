import { parseTerm } from "../../../utils/date";
import Select from "../../common/Select/Select";
import Tag from "../../common/Tag/Tag";
import { LogCategoryList, LogCategoryWrapper } from "./LogCategoryStyle";

const LogCategory = ({
  options,
  terms,
  filter,
  handleTerms,
  removeTerms,
  handleFilter,
}) => {
  return (
    <LogCategoryWrapper>
      <span>기간</span>
      <LogCategoryList>
        <Select
          triggerLabel="추가"
          selectedList={terms}
          options={options}
          onSelect={handleTerms}
        />
        {terms.map((term: string) => (
          <Tag
            key={`term-tag-${term}`}
            onSelect={() => handleFilter(term)}
            onRemove={() => removeTerms(term)}
            isSelected={filter.includes(term)}
          >
            {parseTerm(term)}
          </Tag>
        ))}
      </LogCategoryList>
    </LogCategoryWrapper>
  );
};

export default LogCategory;
