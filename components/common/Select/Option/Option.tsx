import { Option as OptionType } from "../../../../interface/CommonTypes";
import { OptionProps } from "../../commonType";
import {
  OptionCategory,
  OptionCategoryItem,
  OptionCategoryList,
  OptionCategoryTitle,
  OptionLabel,
  OptionValue,
} from "./OptionStyle";

const Option = ({ label, value, selectedList, onSelect }: OptionProps) => {
  if (typeof value === "object")
    return (
      <OptionCategory>
        <OptionCategoryTitle>{label}</OptionCategoryTitle>
        <OptionCategoryList>
          {(value as OptionType[]).map((option) => {
            const link = `select-catgory-option-${option.label}-${option.value}`;
            return (
              <OptionCategoryItem key={link}>
                <OptionLabel htmlFor={link}>
                  <OptionValue
                    id={link}
                    type="checkbox"
                    checked={selectedList.includes(option.value)}
                    onChange={() => onSelect(option)}
                  />
                  {option.label}
                </OptionLabel>
              </OptionCategoryItem>
            );
          })}
        </OptionCategoryList>
      </OptionCategory>
    );

  const link = `select-option-${label}-${value}`;

  return (
    <OptionCategoryItem>
      <OptionLabel htmlFor={link}>
        <OptionValue
          id={link}
          type="checkbox"
          checked={selectedList.includes(value)}
          onChange={() => onSelect({ label, value })}
        />
        {label}
      </OptionLabel>
    </OptionCategoryItem>
  );
};

export default Option;
