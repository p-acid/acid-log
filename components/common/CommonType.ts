import { ReactNode } from "react";

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
