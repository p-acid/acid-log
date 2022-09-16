import { IconProps } from "../commonType";
import { IconWrapper } from "./IconStyle";

const Icon = ({ size, iconName, ...restProps }: IconProps) => {
  return (
    <IconWrapper
      $size={size}
      className="material-symbols-outlined"
      {...restProps}
    >
      {iconName}
    </IconWrapper>
  );
};

export default Icon;
