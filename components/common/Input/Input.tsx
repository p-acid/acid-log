import { forwardRef, HTMLAttributes, RefObject } from "react";
import Icon from "../Icon/Icon";
import { InputWrapper, StyledInput } from "./InputStyle";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  iconName?: string;
}

const Input = forwardRef(
  (
    { iconName, ...restProps }: InputProps,
    ref: RefObject<HTMLInputElement>
  ) => {
    return (
      <InputWrapper>
        {iconName && <Icon size={16} color="black_50" iconName={iconName} />}
        <StyledInput ref={ref} {...restProps} />
      </InputWrapper>
    );
  }
);

export default Input;
