import { IconButtonProps } from "../../commonType";
import { IconButtonWrapper } from "./IconButtonStyle";

const IconButton = ({ size, ...restProps }: IconButtonProps) => {
  return (
    <IconButtonWrapper
      $size={size}
      className="material-symbols-outlined"
      {...restProps}
    />
  );
};

export default IconButton;
