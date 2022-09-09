import Select from "../../common/Select/Select";
import Tag from "../../common/Tag/Tag";
import { LogCategoryList, LogCategoryWrapper } from "./LogCategoryStyle";

const LogCategory = () => {
  return (
    <LogCategoryWrapper>
      <span>기간</span>
      <LogCategoryList>
        <Select options={OPTIONS} />
        <Tag
          onSelect={() => console.log("select")}
          onRemove={() => console.log("remove")}
        >
          태그
        </Tag>
      </LogCategoryList>
    </LogCategoryWrapper>
  );
};

export default LogCategory;

const OPTIONS = [
  {
    label: "2021년",
    value: [
      {
        label: "9월",
        value: "21/09",
      },
      {
        label: "10월",
        value: "21/10",
      },
    ],
  },
  {
    label: "2022년",
    value: [
      {
        label: "9월",
        value: "22/09",
      },
      {
        label: "10월",
        value: "22/10",
      },
    ],
  },
];
