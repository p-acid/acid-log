import { IconButtonProps } from "../../commonType";
import { IconButtonWrapper } from "./IconButtonStyle";

const IconButton = ({ size, color, ...restProps }: IconButtonProps) => {
  return (
    <IconButtonWrapper
      $size={size}
      $color={color}
      className="material-symbols-outlined"
      {...restProps}
    />
  );
};

export default IconButton;
