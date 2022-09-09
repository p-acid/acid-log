import { ReactNode, useCallback, useState } from "react";

import { Option } from "../../../interface/CommonTypes";
import Button from "../Button/Button";

interface SelectProps {
  /**
   * 선택할 수 있는 옵션 리스트 배열
   */
  options: ({ label: ReactNode; value: Option[] } | Option)[];
}

const Select = ({ options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div>
      <Button>추가</Button>
    </div>
  );
};

export default Select;
