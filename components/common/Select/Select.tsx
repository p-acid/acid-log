import { useCallback, useState } from "react";

import Button from "../Button/Button";
import Option from "./Option/Option";

import { OptionsItem, OptionsWrapper, SelectWrapper } from "./SelectStyle";

import { SelectProps } from "../tommonType";

const Select = ({
  options,
  selectedList,
  triggerLabel,
  onSelect,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SelectWrapper className="select-wrapper">
      <Button className="trigger" onClick={handleIsOpen}>
        {triggerLabel}
      </Button>
      {isOpen && (
        <OptionsWrapper className="options-wrapper">
          {options.map((option) => (
            <OptionsItem key={`select-option-${option.value}-${option.label}`}>
              <Option
                {...option}
                selectedList={selectedList}
                onSelect={onSelect}
              />
            </OptionsItem>
          ))}
        </OptionsWrapper>
      )}
    </SelectWrapper>
  );
};

export default Select;
