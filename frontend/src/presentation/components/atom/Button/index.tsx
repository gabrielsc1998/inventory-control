interface ButtonProps {
  id: string;
  label: string;
  loading?: boolean;
  onClick?: () => void;
}

import * as S from "./styles";

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <S.Button size={"lg"} isLoading={props.loading} onClick={props.onClick}>
      {props.label}
    </S.Button>
  );
};

export default Button;
