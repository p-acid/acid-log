import { ReactNode } from "react";
import { Option } from "../../interface/CommonTypes";

export interface TagProps {
  children: ReactNode;
  /**
   * 선택된 태그인지 여부
   */
  isSelected?: boolean;
  /**
   * 태그를 선택할 때의 이벤트 핸들러
   */
  onSelect?: () => void;
  /**
   * 태그를 제거할 때의 이벤트 핸들러
   */
  onRemove?: () => void;
}

export interface SelectProps {
  /**
   * 트리거 버튼 내 텍스트
   */
  triggerLabel: string;
  /**
   * 선택된 옵션들의 value 리스트
   */
  selectedList: (string | number)[];
  /**
   * 옵션을 선택할 때의 이벤트 핸들러
   */
  onSelect?: (option: Option) => void;
  /**
   * 선택할 수 있는 옵션 리스트 배열
   */
  options: ({ label: ReactNode; value: Option[] } | Option)[];
}

export interface OptionProps
  extends Pick<SelectProps, "onSelect" | "selectedList"> {
  label: ReactNode;
  value: Option[] | Option["value"];
}
