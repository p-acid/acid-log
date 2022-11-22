import { ButtonHTMLAttributes } from "react";
import { ButtonWrapper } from "./ButtonStyle";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <ButtonWrapper {...props} />;
};

export default Button;
