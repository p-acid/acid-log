import { HTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import { InputWrapper, StyledInput } from "./InputStyle";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  iconName?: string;
}

const Input = ({ iconName, ...restProps }: InputProps) => {
  return (
    <InputWrapper>
      {iconName && <Icon size={16} color="black_50" iconName={iconName} />}
      <StyledInput {...restProps} />
    </InputWrapper>
  );
};

export default Input;
