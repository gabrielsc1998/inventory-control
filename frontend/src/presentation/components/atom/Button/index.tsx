interface ButtonProps extends ButtonUiLibProps {
  id: string;
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
}

import { ButtonProps as ButtonUiLibProps } from "@chakra-ui/react";

import * as S from "./styles";

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <S.Button
      size={"lg"}
      isLoading={props.isLoading}
      onClick={props.onClick}
      {...props}
    >
      {props.label}
    </S.Button>
  );
};

export default Button;
