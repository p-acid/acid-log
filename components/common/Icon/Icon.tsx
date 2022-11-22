import { IconProps } from "../commonType";
import { IconWrapper } from "./IconStyle";

const Icon = ({ size, color, iconName, ...restProps }: IconProps) => {
  return (
    <IconWrapper
      $size={size}
      $color={color}
      className="material-symbols-outlined"
      {...restProps}
    >
      {iconName}
    </IconWrapper>
  );
};

export default Icon;
